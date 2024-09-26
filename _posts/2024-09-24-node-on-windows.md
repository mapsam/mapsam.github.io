---
layout: post
title: "Node.js on Windows"
---

I'm not much of a Windows user, but recently I needed to make a change to one of my personal GitHub repositories without access to my personal or work computers (both Macbook Pros). Instead I used my gaming computer and figured I'd give Windows PowerShell a try.

tl;dr - I set up the following

* Windows Terminal
* Git installation
* GitHub SSH Keys
* `fnm` for Node.js version management

### Windows Terminal

First was the `terminal` application on Windows. Microsoft has even put the entire [app on GitHub](https://github.com/microsoft/terminal), which is neat. This was already installed, so I just opened it up and it just started working. Nice! This loads Windows PowerShell.

### Git Installation

I installed Git using the [official installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). They first recommend using https://git-scm.com/download/win, but also suggest https://gitforwindows.org as an alternative. I can only speak the former.

### GitHub SSH Keys

Setting up SSH keys is one of those tasks that you do so irregularly that there's absolutely no way I'd remember how to do it without relying on the nice [docs from GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). Following those, I was able to connect to github.com and clone my repositories. 

The main sticky point here was _starting_ the SSH agent, which I'm fairly certain I've never done on a Mac. I restarted the terminal in Administrator mode and ran the following:

```sh
# start the ssh-agent in the background
Get-Service -Name ssh-agent | Set-Service -StartupType Manual

Start-Service ssh-agent
```

Then I was able to run `ssh-add` commands without an issue. Without this, you'll get not-so-helpful error messages like the following.

```sh
C:\repo> ssh-add ~/.ssh/id_blah
Error connecting to agent: No such file or directory
```

### `fnm`

Installing Node.js on Windows can be done using the nodejs.org prebuilt installers or recommended package managers. I'm most familiar with `nvm` on Mac/Linux, but learned that this is not available on Windows! Instead, I tried [`fnm`](https://github.com/Schniz/fnm), which is written in Rust and claims to be faster than `nvm`. It takes a _slightly similar_ approach from a UX perspective, where you can swap between node versions, set defaults, and specify your command shell start with a specific version.

Once installed, I tried running `node` but the command was not found. The installation instructions from [nodejs.org](https://nodejs.org/en/download/package-manager) and the [fnm repo](https://github.com/Schniz/fnm#powershell) both require configuring the environment using `fnm env`. This can be automated by adding to your PowerShell profile.

```
notebook $profile
```

🤔 this didn't work for me. Apparently the file doesn't exist! I printed the location by running plain `$profile` and added the following

```
fnm env --use-on-cd | Out-String | Invoke-Expression
```

Then I closed and re-opened my terminal, but got a message saying my terminal cannot execute scripts on startup due to existing policies. This was a confusing message, but ultimately I discovered you need to update your PowerShell Execution Policy to be more lenient. The Microsoft docs on [`about_Execution_Policy`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4) helped. I restarted the terminal in Administrator mode again and ran the following:

```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Restarting the terminal showed no errors! I was able to run `node` successfully.
