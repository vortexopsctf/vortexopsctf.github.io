---
layout: writeup
title: "Very Simple Framer"
ctf: "PascalCTF 2025"
category: misc
tags: [steganography, misc, python, pil, custom-encoding, image-analysis]
difficulty: Easy
date: 2025-01-31
description: "Custom image steganography challenge hiding a message in border pixels using black/white encoding for binary data"
---

## Challenge Description

I decided to make a simple framer application, obviously with the help of my dear friend, you really think I would write that stuff?

**Category:** Steganography

![Challenge description]({{ '/assets/images/challenge-description.png' | relative_url }})

**Files provided:**
- `output.jpg` - The encoded image
- `chal.py` - The encoder script

## Analysis

Looking at `chal.py`, we can understand the encoding mechanism:

1. The script adds a **1-pixel border** around the original image
2. Each border pixel is encoded as either **black (0)** or **white (1)**
3. The binary representation: Black pixel = bit `0`, White pixel = bit `1`
4. The message is converted to binary and written around the border in a specific order:
   - **Top row** (left to right)
   - **Right column** (top to bottom)
   - **Bottom row** (right to left)
   - **Left column** (bottom to top)

This creates a continuous stream of bits around the perimeter of the image.

### The Encoded Image

Here's what the encoded image looks like. Notice the border around the image - this is where the flag is hidden!

![Encoded output image]({{ '/assets/images/output.jpg' | relative_url }})

## Solution

### Understanding the Encoding

The key insight is that we need to:
1. Read the border pixels in the exact same order as the encoder
2. Convert pixel colors to binary (black=0, white=1)
3. Group the bits into bytes (8 bits each)
4. Convert bytes back to ASCII characters

### Decoder Script

I wrote a Python script using PIL (Pillow) to reverse the encoding process:
```python
#!/usr/bin/env python3
from PIL import Image
import sys

img = Image.open(sys.argv[1])
w, h = img.size
bits = ''

# Read border pixels in same order as encoder
# Top row (left to right)
for x in range(w):
    bits += '0' if sum(img.getpixel((x, 0))) < 384 else '1'

# Right column (top to bottom)
for y in range(1, h-1):
    bits += '0' if sum(img.getpixel((w-1, y))) < 384 else '1'

# Bottom row (right to left)
for x in range(w-1, -1, -1):
    bits += '0' if sum(img.getpixel((x, h-1))) < 384 else '1'

# Left column (bottom to top)
for y in range(h-2, 0, -1):
    bits += '0' if sum(img.getpixel((0, y))) < 384 else '1'

# Convert binary to ASCII
msg = ''.join(
    chr(int(bits[i:i+8], 2)) 
    for i in range(0, len(bits), 8) 
    if 31 < int(bits[i:i+8], 2) < 127
)
print(msg[:50])
```

### Running the Decoder
```bash
python3 decode_frame.py output.jpg
```

### Execution Result

![Decoder execution showing the flag]({{ '/assets/images/execution.png' | relative_url }})

The script successfully extracts the flag from the border pixels!

## Flag

<div class="flag-box">
<strong>Flag:</strong><br>
<code>pascalCTF{Wh41t_wh0_4r3_7h0s3_9uy5???}</code>
</div>

## Key Techniques

- **Custom Steganography:** Understanding proprietary encoding schemes
- **Image Analysis:** Reading and interpreting pixel values
- **Binary Decoding:** Converting pixel colors to binary then to ASCII
- **PIL/Pillow:** Python image processing library for pixel manipulation
- **Reverse Engineering:** Analyzing encoder code to build a decoder

## Tools Used

- Python 3
- PIL/Pillow library (`pip install pillow`)
- Text editor / IDE

## Lessons Learned

This challenge demonstrates several important concepts:

1. **Custom steganography** can hide data in plain sight using simple encoding techniques
2. **Understanding the algorithm** is crucial - analyzing `chal.py` revealed exactly how to decode
3. **Order matters** - reading border pixels in the correct sequence was essential
4. **Binary encoding** using pixel colors (black/white = 0/1) is an effective hiding technique
5. **Image processing** with PIL makes it easy to read and manipulate pixel data

The challenge was straightforward once you understood the encoding mechanism from analyzing `chal.py`. The key was carefully reading the border pixels in the exact same order the encoder wrote them - starting from top-left, going clockwise around the perimeter.
```
