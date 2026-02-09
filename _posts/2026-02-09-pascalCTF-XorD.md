---
layout: writeup
title: "XorD"
ctf: "Pascal CTF 2026"
category: crypto
tags: [crypto, xor]
difficulty: Easy
date: 2026-02-09
description: "I just discovered bitwise operators, so I guess 1 XOR 1 = 1?"
---

# Description

I just discovered bitwise operators, so I guess 1 XOR 1 = 1?

Objective: Decrypt the flag from `output.txt` by reversing the provided python script `xord.py`.


# Analysis

The challenge provides a python script `xord.py` and an encrypted file `output.txt`.

```python
import random

# ...

random.seed(1337)

for i in range(len(flag)):
    random_key = random.randint(0, 255)
    encripted_flag += xor(ord(flag[i]), random_key)

```

The random number generator is initialized with a static seed: `random.seed(1337)`.

In Python (and most languages), setting a static seed ensures that the sequence of “random” numbers generated is deterministic and reproducible.

The encryption operation is a simple XOR:

Ci=Pi⊕Ki

Where:

- Ci is the encrypted byte
- Pi is the plaintext flag character
- Ki is the generated random integer

### **Solution Strategy**

Since XOR is a symmetric operation (A⊕B=C⟹C⊕B=A), and we can reproduce the exact sequence of keys (K) by using the same seed, we can decrypt the message by:

1. Reading the bytes from `output.txt`.
2. Initializing the random generator with `seed(1337)`.
3. Iterating through the encrypted bytes and XORing them with the next random integer from the sequence.

# Solution Script
The following script (`solve.py`) implements the decryption:

```python
import random

def solve():
    with open('output.txt', 'r') as f:
        hex_content = f.read().strip()

    encrypted_bytes = bytes.fromhex(hex_content)

    # Use the same seed as the challenge
    random.seed(1337)
    
    decrypted_chars = []
    for byte in encrypted_bytes:
        random_key = random.randint(0, 255)
        decrypted_chars.append(byte ^ random_key)
        
    print(bytes(decrypted_chars).decode('utf-8'))

if __name__ == "__main__":
    solve()
```


# Flag
Running the solution script yields the flag:

`pascalCTF{1ts_4lw4ys_4b0ut_x0r1ng_4nd_s33d1ng}`