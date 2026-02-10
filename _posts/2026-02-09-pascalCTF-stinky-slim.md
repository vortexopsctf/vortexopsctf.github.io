---
layout: writeup
title: "Stinky Slim"
ctf: "pascalCTF 2025"
category: misc
tags: [steganography, misc, audio, spectrogram, wav, discord, osint]
difficulty: Easy
date: 2025-01-13
description: "Audio steganography challenge requiring spectrogram analysis and Discord interaction to retrieve the flag"
---

## Challenge Description

I don't trust Patapim; I think he is hiding something from me.

**Challenge files:** `pieno-di-slim.wav`

## Solution

### Initial Analysis

The challenge provides a `.wav` audio file (15.4 MB). The description hints that something is hidden within the file by Patapim.

### Step 1: Spectrogram Analysis

I used an online spectrogram tool to analyze the audio file. A spectrogram visualizes audio frequencies over time and can reveal hidden visual data embedded in sound files.

![Spectrogram showing hidden message]({{ '/assets/images/stinky-slim-spectrogram.png' | relative_url }})

The spectrogram clearly reveals a hidden message in the frequency range between 18.9 KHz and 23.6 KHz.

### Step 2: Decoding the Message

The text visible in the spectrogram reads:

**"Make a ticket and say I love Blaise Pascal in order to get the flag"**

This gives us clear instructions on how to proceed!

### Step 3: Discord Interaction

Following the instructions from the spectrogram:

1. I joined the pascal CTF Discord server
2. Created a support ticket
3. Sent the message: "I love Pascal"
4. The CTF organizers responded with the flag

![Discord ticket interaction]({{ '/assets/images/stinky-slim-discord.png' | relative_url }})

## Flag

<div class="flag-box">
<strong>Flag:</strong><br>
<code>pascalCTF{th3_k1ng_0f_th3_f0r3st_w1th_s0m3_d1rty_f3et}</code>
</div>

## Key Techniques

- **Audio Steganography:** Hidden visual data embedded in audio frequencies
- **Spectrogram Analysis:** Converting audio to visual frequency representation
- **OSINT/Social Engineering:** Following instructions to interact with CTF organizers
- **Multi-step Challenge:** Combining technical analysis with human interaction

## Tools Used

- Online Spectrogram Tool (e.g., [Sonic Visualiser](https://www.sonicvisualiser.org/), [convert.ing-now.com](https://convert.ing-now.com/audio-spectrogram-creator/))
- Discord

## Lessons Learned

This challenge demonstrates that not all CTF challenges are purely technical. Sometimes you need to:
- Read hidden messages carefully
- Follow instructions exactly as given
- Be willing to interact with organizers or community members
- Combine multiple skills (forensics + communication)

The reference to "Blaise Pascal" is a nice touch, connecting to the CTF name "pascalCTF"!
