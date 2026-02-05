---
layout: writeup
title: "StrangeVM"
ctf: "Pascal CTF 2026"
category: reversing
tags: [reversing, vm, disassembly, custom-instruction-set]
difficulty: Medium
date: 2026-02-05
description: "Uncovering a hidden flag by reversing a custom Virtual Machine and its bytecode."
---

# Challenge Description

A 🧙🏻‍♂️ stranger once built a VM and hid the Forbidden Key🥀, can you uncover it? P.S.: Keep all the files in the same directory for easier debugging and execution.

# Analysis

The challenge provides a custom Virtual Machine (`vm`) that executes bytecode from `code.pascal`. The goal is to find the “Forbidden Key” (flag) that the VM accepts.

## 1. VM Analysis

We created a disassembler (`disassembler.py` ) to parser the `code.pascal` file. The VM uses a custom instruction set with opcodes for basic arithmetic (`ADD`, `SUB`, `MOD`), memory movement (`MOV`), input (`INP`), and conditional jumps (`JZ`).

The disassembly revealed a repetitive pattern which processes 40 characters of input.

## 2. Logic Reversed

The VM applies a simple transformation to the input string based on the character index:

- **Even Index:** `transformed[i] = input[i] + i`
- **Odd Index:** `transformed[i] = input[i] - 1`

After transformation, the result is compared effectively against a hardcoded byte sequence in the binary.

## 3. Finding the Target

The target byte sequence was not immediately visible as a clear string in the binary because of the transformation. However, looking at the raw hex dump of the `vm` binary near the “Congratulations” strings, we found a 40-byte sequence that looked like the target buffer.

**Target Hex:** 

`56 4C 75 5C 38 6D 39 58 6C 28 3E 57 7B 5F 3F 54 44 5B 71 20 82 1B 8B 50 80 46 7E 15 8A 57 7D 5A 50 54 81 51 8C 0C 94 44`

# Solution

We wrote a solver script (`solver.py`) to reverse the transformation:

- **Even Index:** `flag[i] = target[i] - i`
- **Odd Index:** `flag[i] = target[i] + i`

## Solver Script

```python
def solve():
    target_hex = (
        "56 4C 75 5C 38 6D 39 58 6C 28 3E 57 7B 5F 3F 54 44 5B 71 20 "
        "82 1B 8B 50 80 46 7E 15 8A 57 7D 5A 50 54 81 51 "
        "8C 0C 94 44"
    )

    target_bytes = [int(x, 16) for x in target_hex.split()]
    input_key = bytearray(len(target_bytes))

    for i in range(len(target_bytes)):
        val = target_bytes[i]
        if i % 2 == 0:
            res = (val - i) & 0xFF
        else:
            res = (val + i) & 0xFF
        input_key[i] = res

    print(input_key.decode('utf-8'))

if __name__ == '__main__':
    solve()
```

# Flag

<div class="flag-box">
<strong>Flag:</strong><br>
<code>pascalCTF{VMs_4r3_d14bol1c4l_3n0ugh_d0nt_y0u_th1nk}</code>
</div>
