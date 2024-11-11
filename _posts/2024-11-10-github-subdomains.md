---
layout: post
title: "Subdomains with GitHub Pages"
---

Hey, it's possible to use subdomains with GitHub Pages.

This website `mapsam.com` is hosted at [github.com/mapsam/mapsam.github.io](https://github.com/mapsam/mapsam.github.io) but sometimes I want to put another site at `something.mapsam.com` rather than the standard `mapsam.com/something` location. This allows me to work on other sites without thinking about relative or absolute URIs and incorrectly writing a CSS or JS file path. It's great for single page applications and not buying new domains, plus you can avoid getting squatted on popular domains like Tom Macwright mentions in [this post](https://macwright.com/2024/10/16/domain-second-thoughts).

This assumes your domain A records are pointing to GitHub's IP addresses already. I use Namepcheap for my domain registration. You can find a working example at [sub.mapsam.com](https://sub.mapsam.com), the source is at [github.com/mapsam/sub](https://github.com/mapsam/sub).

### Create a CNAME file in your repository

Commit this to your repo with the full subdomain value.

```
sub.mapsam.com
```

### Create a CNAME Record on your domain

![](/images/posts/subdomain-dns.png)

The CNAME record will exist alongside your A records. The host should be your subdomain `sub` and the value should be your github pages endpoint `mapsam.github.io.`. You can dig the domain to verify the DNS has propogated and shows up in the answer section.

```sh
dig sub.mapsam.com
```

```
; <<>> DiG 9.10.6 <<>> sub.mapsam.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 2831
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;sub.mapsam.com.			IN	A

;; ANSWER SECTION:
sub.mapsam.com.		1799	IN	CNAME	mapsam.github.io.
mapsam.github.io.	3600	IN	A	185.199.111.153
mapsam.github.io.	3600	IN	A	185.199.108.153
mapsam.github.io.	3600	IN	A	185.199.109.153
mapsam.github.io.	3600	IN	A	185.199.110.153

;; Query time: 96 msec
;; SERVER: 75.75.75.75#53(75.75.75.75)
;; WHEN: Sun Nov 10 22:40:44 PST 2024
;; MSG SIZE  rcvd: 137
```

### Enable pages on your repo, check DNS

Going to `Repo >> Settings >> Pages` and select your preferred deployment settings. In [github.com/mapsam/sub](https://github.com/mapsam/sub) I'm just using the "Deploy from a branch" classic settings, which uses Jekyll directly from the `main` branch.

![](/images/posts/subdomain-github-pages.png)

On the same page verify the DNS has been set to the proper value, and that it has been verified. This took about 10 minutes for the first ever subdomain I set up, and only a minute or so for subsequent domains. Even before GitHub can verify the DNS, the propogation is enabled and will work. Verifying the DNS will then allow you to enable HTTPS and get a TLS certificate issued.

![](/images/posts/subdomain-github-domain.png)

You should be all set after this. 👍