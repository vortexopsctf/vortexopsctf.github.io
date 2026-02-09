---
layout: writeup
title: "Linux Penguin"
ctf: "Pascal CTF 2026"
category: crypto
tags: [Math, AES]
difficulty: easy
date: 2026-02-09
description: "Solve an oracle padding"
---

**Name***:* Linux Penguin

**Category:** Cryptography

**Goal:** Recover the flag by guessing 5 secret encrypted words.

# Analysis

The challenge provides a Python script [`main.py`] that implements a guessing game.

- It selects 5 random words from a hardcoded list of 28 words.
- It encrypts them using **AES-ECB** with a random 16-byte key.
- It displays the ciphertext of these 5 words.
- It provides an Oracle service: You can send up to 7 rounds of 4 words each to be encrypted.
- After the Oracle phase, you must guess the 5 secret words.

## Vulnerability

The key vulnerability is the use of **AES-ECB mode**. ECB (Electronic Codebook) is deterministic, meaning the same plaintext encrypted with the same key always produces the exact same ciphertext.

Since the total number of possible word is small (28) and the Oracle allows us to encrypt exactly 7 * 4 = 28 words, we can perform a **Chosen Plaintext Attack** to build a complete dictionary mapping.

# Solution

1. **Extract Words:** Copy the list of 28 words from `main.py`
2. **Oracle Queries:** Connect to the remote server and send all 28 words to be encrypted.
3. **Build Dictionary:**  Store the mapping of `ciphertext -> plaintext`.
4. **Decrypt Target:** Search for the challenge’s ciphertexts in our dictionary to reveal the original words.
5. **Submit Guesses:** Send the decrypted words back to the server to pass the check.
6. **Get Flag:** The server prints the flag upon success.

# Flag

`pascalCTF{why_4r3_th3_bl0ck_4lw4ys_th3_s4m3???}`