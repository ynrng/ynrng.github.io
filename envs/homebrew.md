---
layout: page
title: Migrate HOMEBREW from intel to m1 chip
---



> If you are using migrating assistant and basically copied everything from old macbook to the new m1 chip macbook. You'll probably run into this problem when you try to install sth new using homebrew.

## FAIR WARNING ❗️
The best solution would be to reinstall the system and not chose migrating from an old macOS. :)
That would solve half of the problems and the `brew docor` output would be so clean and tidy.


...Since you are still reading... Well ...

Run
```bash
brew up && brew doctor
```

if you have errors from brew like:

```bash
Warning: Your Homebrew's prefix is not /opt/homebrew.
```
or
```bash
Error: Cannot install in Homebrew on ARM processor in Intel default prefix (/usr/local)!
Please create a new installation in /opt/homebrew using one of the
"Alternative Installs" from:
  https://docs.brew.sh/Installation
You can migrate your previously installed formula list with:
  brew bundle dump
```
Don't panic.

**First** run the following line as it tells you.
```
brew bundle dump
```

The next step is a bit confusing. As at least I wasn’t expecting to reinstall homebrew. But don’t try to make the directory in /opt/homebrew yourself as some of you may attempt. Instead, go to https://brew.sh/ and run the first command, sth like:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Notice when it completes, the command line will give instructions. DO follow those instructions to add new brew to PATH.
```bash
==> Next steps:
- Run these two commands in your terminal to add Homebrew to your PATH:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/Wendy/.bash_profile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```
Then migrating the old files to new position:
```
brew bundle --file Brewfile  # this takes a while
```

You're all set!