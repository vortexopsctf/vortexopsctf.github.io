# CTF Writeups

This directory contains all CTF writeup posts in markdown format. Jekyll will automatically process these posts and make them available on the website.

## Creating a New Writeup

1. Create a new file in this directory with the naming format: `YYYY-MM-DD-title-slug.md`
   - Example: `2025-01-13-v1t-ctf-tryna-crack.md`

2. Add YAML frontmatter at the top of the file:

```yaml
---
layout: writeup
title: "Challenge Name"
ctf: "CTF Name YYYY"
category: web|pwn|crypto|forensics|reversing|misc
tags: [tag1, tag2, tag3]
difficulty: Easy|Medium|Hard
date: YYYY-MM-DD
description: "Brief description for SEO and RSS feed"
---
```

3. Write your writeup content using markdown:

```markdown
## Challenge Description

[Description from the CTF]

## Solution

[Your solution steps]

### Subsection

[Additional details]

## Flag

<div class="flag-box">
<strong>Flag:</strong><br>
<code>flag{example_flag_here}</code>
</div>

## Key Techniques

- **Technique 1:** Description
- **Technique 2:** Description
```

## Frontmatter Fields

- **layout:** Always use `writeup` for CTF writeups
- **title:** The challenge name (in quotes if it contains special characters)
- **ctf:** The CTF name and year
- **category:** Primary category (web, pwn, crypto, forensics, reversing, misc)
- **tags:** Array of related tags for filtering
- **difficulty:** Challenge difficulty rating
- **date:** Publication date in YYYY-MM-DD format
- **description:** Brief summary for SEO and feeds (optional)

## Including Images

Images should be stored in the `writeups/` directory structure and referenced using Liquid tags:

```markdown
![Alt text]({{ '/writeups/ctf-name/challenge-name/img/screenshot.png' | relative_url }})
```

## Code Blocks

Use standard markdown code blocks with language specification:

```python
def solve():
    # Your solution code
    pass
```

## Tips

- Use descriptive headings (H2 ## for main sections, H3 ### for subsections)
- Include screenshots to illustrate key steps
- Provide context and explain your thought process
- Link to tools and resources you used
- Tag your writeup appropriately for filtering on the website
