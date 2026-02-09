---
layout: writeup
title: "Curve Ball"
ctf: "Pascal CTF 2026"
category: Crypto
tags: [crypto, ECC]
difficulty: Medium
date: 2026-02-09
description: "We are provided with a Python script `curve.py` that implements an Elliptic Curve cryptography challenge. The server generates a random 8-byte secret, calculates a public key `Q = secret * G` on a custom curve, and asks us to guess the secret."
---

# Challenge Description

We are provided with a Python script `curve.py` that implements an Elliptic Curve cryptography challenge. The server generates a random 8-byte secret, calculates a public key `Q = secret * G` on a custom curve, and asks us to guess the secret.

# Analysis

## Curve Parameters

The curve is defined as $y^2 = x^3 + 1 \pmod p$ with the following parameters:

- **Prime (p): `1844669347765474229`**
- **Order (n):** `1844669347765474230` ($n = p + 1$)
- **Generator (G):** `(27, 728430165157041631)`

## Vulnerability: Smooth Order

The first step in analyzing any custom elliptic curve is to check the order of the curve ($n$). The security of ECC relies on the Discrete Logarithm Problem (DLP) being hard, which requires the order of the curve to have at least one large prime factor.

Let’s factor n:

```python
import sympy
n = 1844669347765474230
print(sympy.factorint(n))
# Result: {2: 1, 3: 2, 5: 1, 7: 1, 11: 1, 13: 1, 17: 1, 19: 1, 
#          23: 1, 29: 1, 31: 1, 37: 1, 41: 1, 43: 1, 47: 1}
```

The order $n$ is **extremely smooth**, meaning it is composed entirely of very small prime numbers (the largest factor is 47).

## The Attack: Pohlig-Hellman

Because of the order $n$ is sooth, we can use **Pohlig-Hellman Algorithm** to solve the Discrete Logarithm Problem efficiently.

The algorithm works by solving the DLP modulo each small prime power factor of $n$ and then combining the results using the **Chinese Remainder Theorem (CRT)**.

1. **Decomposition:** For each factor $p_i^{e_i}$, we reduce the problem to a subgroup of that order.

$Q' = \frac{n}{p_i^{e_i}} \cdot Q, \quad G' = \frac{n}{p_i^{e_i}} \cdot G$

1. **Reconstruction:** Once we have $x \pmod {p_i^{e_i}}$ for all factors, we use the CRT to find $x \pmod n$, which is the secret key.

# Solution Script

We implemented the attack in Python. The full solver script connects to the server, parses the public key, runs the attack, and sends back the secret.

```python
# Key parts of the solver
for prime, exponent in factors.items():
    modulus = prime ** exponent
    cofactor = n // modulus
    
    # Map to subgroup
    G_sub = cofactor * G
    Q_sub = cofactor * Q
    
    # Brute force DLP in small subgroup
    x_rem = solve_dlp_small_order(G_sub, Q_sub, modulus)
    remainders.append(x_rem)
    moduli.append(modulus)

# Reconstruct using CRT
secret = CRT(remainders, moduli)
```

# Flag

Running the solution against the server:

`pascalCTF{sm00th_0rd3rs_m4k3_3cc_n0t_s0_h4rd_4ft3r_4ll}`