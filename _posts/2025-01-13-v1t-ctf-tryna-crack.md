---
layout: writeup
title: "Tryna crack?"
ctf: "v1t CTF 2025"
category: forensics
tags: [forensics, crypto, misc, steganography, zip, png]
difficulty: Easy
date: 2025-01-13
description: "Multi-layered forensics challenge involving ZIP plaintext attacks, PNG metadata extraction, dimension manipulation, and steganography to uncover a hidden flag."
---

## Challenge Description

Easy peasy

## Challenge Content

A single encrypted ZIP file containing a PNG called `quackquackquack.png`

## Analyzing the File

![Initial file analysis]({{ '/writeups/v1t-ctf-2025/tryna-crack/img/analyze.png' | relative_url }})

The ZIP file is encrypted but not deflated, making it vulnerable to a known plaintext attack.

## Extracting the PNG

Reference: [Plaintext Attack on ZipCrypto](https://wiki.anter.dev/misc/plaintext-attack-zipcrypto/#executing-the-plaintext-attack)

Using `bkcrack` with knowledge of the PNG header and footer structure:

![PNG file header structure]({{ '/writeups/v1t-ctf-2025/tryna-crack/img/png_header.png' | relative_url }})
![Extracting the PNG using bkcrack]({{ '/writeups/v1t-ctf-2025/tryna-crack/img/extracting_the_png.png' | relative_url }})
![Initial flag attempt]({{ '/writeups/v1t-ctf-2025/tryna-crack/img/flag.png' | relative_url }})

## Analyzing the PNG

![PNG metadata analysis]({{ '/writeups/v1t-ctf-2025/tryna-crack/img/analyze_png.png' | relative_url }})

The user comment field contains what appears to be a password:

`D4mn_br0_H0n3y_p07_7yp3_5h1d`

Wrapping it as `v1t{D4mn_br0_H0n3y_p07_7yp3_5h1d}` yields an incorrect flag.

One of the organizers mentioned "breaking the limits" - suggesting we should check for out-of-bounds data.

## Finding Hidden Data

Using a Python script to check for false width/height values in the PNG:

![Fixing PNG dimensions to reveal hidden data]({{ '/writeups/v1t-ctf-2025/tryna-crack/img/fix_png.png' | relative_url }})

Morse code appears at the bottom of the corrected image, which decodes to: **SHA512**

## Solution

The flag is the SHA512 hash of the password:

<div class="flag-box">
<strong>Flag:</strong><br>
<code>v1t{7083748baa3a42dc0a93811e4f5150e7ae1a050a0929f8c304f707c8c44fc95d86c476d11c9e56709edc30eba5f2d82396f426d93870b56b1a9573eaac8d0373}</code>
</div>

## Key Techniques

- **Plaintext Attack on ZIP Encryption:** Exploiting encrypted but not deflated ZIP files using known PNG file structure
- **PNG Metadata Extraction:** Finding hidden passwords in image metadata fields
- **Image Dimension Manipulation:** Detecting and correcting falsified PNG dimensions to reveal hidden content
- **Morse Code Decoding:** Extracting and decoding steganographic morse code
- **Hash Functions:** Using SHA512 to transform the discovered password into the final flag
