---
layout: writeup
title: "Ice Cramer"
ctf: "Pascal CTF 2026"
category: crypto
tags: [Math, Programming]
difficulty: easy
date: 2026-02-09
description: "Solve a system of linear equations provided by a remote server to recover the flag."
---

# Challenge Overview

*Category*: Misc/Math/Programming

*Objective*: Solve a system of linear equations provided by a remote server to recover the flag.

## Analysis

The challenge provided a [`main.py`] which generates a system of linear equations.

- The flag characters are the variables $x_0, x_1, \dots, x_n$
- The server generates n random linear equations of the form:
    
    $k_0 x_0 + k_1 x_1 + \dots + k_n x_n = \text{solution}$ 
    
- We need to collect enough equations (at least , where  is the length of the flag) to form a solvable system.

# Solution Strategy

This is a classic linear algebra problem. We have a system $Ax = B$ , where:

- $A$ is the matrix of coefficients ($k$).
- $x$ is the vector of unknown flag characters.
- B $$is the vector of results.

We can solve for x by computing$x = A^{-1}B$ or using a linear solver. Since the number of variables matches the number of equations provided (based on the server logic), the system is determined.

## **Steps**

1. Connect to the server and read the equations.
2. Parse each equation to extract coefficients and the result.
3. Construct Matrix $A$ and Vector $B$.
4. Use `numpy.linalg.solve(A,B)` to find $x$.
5. Convert the values of $x$ (which are ASCII codes) back to characters.

## Solution Script

The following script (`solve.py`) implements the solution using `pwntools` and `numpy`:

```python
from pwn import *
import numpy as np

# ... (connection and parsing logic)

# Solve system
matrix_a = np.array(A)
vector_b = np.array(B)

solution = np.linalg.solve(matrix_a, vector_b)

# Convert to chars
flag_chars = ""
for x in solution:
    flag_chars += chr(int(round(x)))

print("Flag: pascalCTF{" + flag_chars + "}")

```

## Flag

`pascalCTF{0h_My_G0DD0_too_much_m4th_:O}`