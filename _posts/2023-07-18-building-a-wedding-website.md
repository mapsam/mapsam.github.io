---
layout: post
title: "Building a wedding website"
---

First and foremost, I'm very excited to be married. Second, I have a fundamental aversion to the wedding industry and the [wedding industrial complex](https://theweek.com/articles/463257/wedding-industrial-complex) due to the profiteering and gouging that comes with planning an hours-long party. Because of this, I've been living two parallel truths while planning our wedding:

1. The expense of a wedding is over-inflated at best and exploitative at worst
1. I deeply enjoy event planning and colliding social spheres

In large part, I've participated in this industry because it's plain impossible not to. Unless you discretely show up to a public park with 160 people, unnanounced, it's [surprisingly difficult](https://www.seattle.gov/special-events-office/handbook/general-guidelines) to find a space big enough for that large of a crowd that allows anything with noise or alcohol.

Now, you might say I could remove noise and alcohol from my wedding. That's a fair response. But I want a band and I want a bar. Period. Given both of our families are flying from out of state, they deserve a full show, not just my own anxieties projected onto their vacation.

However, I have found one perfect outlet for my rebellion against the the industry: **I've built my own wedding website.** The past year I've been building the website for my wedding at [samtaylorwedding.com](https://samtaylorwedding.com), where I've learned a thing or two about effectively communicating important information to the right audience: my friends and family. I've also avoided paying a whopping $0 for theknot.com.

## The stack

But first, a tour of the stack. Ultimately my personal goal of the website was to learn a thing or two about modern front end web frameworks and how to host a website outside of GitHub pages or AWS S3 and Cloudfront, which is where most of my web experience lives. The entire website, sans database content, is available at [github.com/mapsam/tksm](https://github.com/mapsam/tksm/).

#### Web Framework: [Next.js](https://nextjs.org/)

Next.js is extremely elegant. It fits my existing mental model of separating content from components and removes a lot of the setup cruft that comes with bare bones react applications. It feels opinionated and provides very detailed documentation on when data should be fetched [server-side vs client-side](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components) with functions like `getServerSideProps`. Next also offers API endpoint patterns which are excellent for putting together quick [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) for things like form submissions, allowing one to keep server and frontend closely intertwined.

Beyond the mechanisms of building with Next.js, the framework is loaded with optimisations such as [static rendering](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization), [runtimes](https://nextjs.org/docs/pages/building-your-application/rendering/edge-and-nodejs-runtimes), and [authentication patterns](https://nextjs.org/docs/pages/building-your-application/routing/authenticating#authentication-providers). These are features that are things I don't really want to think about when building a new site, especially on a budget.

Since building the site, Next.js v13 has been released which introduces the [App Route](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app) alongside the existing Pages model. I haven't used this yet, so can't speak to it. However, They do offer very detailed [migration documentation](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration) which speaks to the depth of docs the framework provides.

#### Hosting: [Vercel](https://vercel.com)

It's hard to avoid Vercel if you're using Next.js. [Vercel maintains](https://vercel.com/solutions/nextjs) the framework and their platform is built _with_ and _for_ Next.js applications. They have a free hobby tier to get started and this increases as your scale and traffic increases. 

What's most impressive about Vercel is the integration with GitHub and per-commit preview endpoints. I can preview changes in isolation, send them to my partner for review, and merge my changes into the primary branch to be visible at the root domain.

![](/images/posts/20230718-vercel.png)

I've [written](/posts/envercel) about Vercel in the past, so admittedly this wasn't a new learning for me. It works very well and it's free for my needs. I have no doubt it will fall down the same path as Heroku by removing their free tier in the future as they scale and need to recuperate costs. I can't speak to the company itself other than what the public internet already says: positive and negative [Glassdoor reviews](https://www.glassdoor.com/Reviews/Vercel-Reviews-E6510369.htm), they hire remote globally, and appear to pay competitive wages.

#### Database: Google Sheets

If I've learned one thing as a software engineer, it's that the ultimate litmus test for any product is this: **_Is it better than a spreadsheet?_**

Here's the thing, I tried [Airtable](https://www.airtable.com/), [MongoDB Atlas](https://www.mongodb.com/atlas), and [DynamoDB](https://aws.amazon.com/dynamodb/). All very capable services and database for hosting RSVP information. But they all lacked one thing: the ability to easily let my partner view and make edits.

Spreadsheets transcend software engineering. The RSVP and registry forms are built using the [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) and append rows to an existing sheet. It's simple, does the job, and sits alongside every other spreadsheet we've created while planning the wedding.

## What's important for a wedding website?

Most sites I've made over time have been static and serve a single purpose. They do not evolve over time or require significant contextual changes. A wedding website on the other hand is important to different people at different times, which means the site needs to adapt to the phase in which it exists. Those phases, as I've seen them:

#### Phase 1: Introduction

The first time someone lands on your wedding website they're going to have two questions: 

* Where is the wedding?
* When is the wedding?

In most cases, your guest is on the website _because_ your save the date already answers these two questions. If you can help them answer their next questions, you'll increase the chance of them locking that date down and preparing any necessary travel plans early. They're going to come in hot with questions like:

* Do I need to travel?
* Where do I stay?
* When do I need to commit?

If you can answer these quickly for your guest they will be empowered to make decisions for themselves given their current context. They can book airfare, reserve any hotel blocks, and get out.

Beyond that, your site may have all sorts of gushy things like "how did we meet?" and "who is in the wedding party?". This is all nice, but let people explore if they want this information. Humans are goldfish and we need the important information quickly and early. We will not read below the fold.

You don't need to build your RSVP form at this point either. You can start working on this in preparation for Phase 2.

#### Phase 2: Commitment

Welcome to the most important phase of the website's lifetime: committment. Your guest wants to commit their time to your wedding by filling out an RSVP form. And you really want them to fill that form out quickly and early so you can get a sense of how much you need to commit to the wedding industrial complex. Bottom line, make the form as simple as possible and ensure any cruft is optional. Make it extremly obvious when someone hits your website landing page that RSVPs are open. Previous information from the "Introduction" phase can be moved into separate pages.

Here's the information we asked our guests:

* How many guests are you RSVPing for? This field controls the entire form, allowing for multiple RSVPs in a single submission. This way you don't need to enforce page refreshes or hope that your aunt remembered her child.
* For each guest: first name, last name, attendance. This way if some guests can attend and others cant, they can still all be part of the same form submission.
* Primary contact phone and email. No need to enter an email for each person. The guest filling out the form is the responsible one in the group already.
* (optional) Dietary restrictions. Just a single field, let them optionally specify who and what.
* (optional) Accomodations. So you can keep track of your friends are bad planners.
* (optional) Words of wisdom. So your funny friends can write funny things.

In the end, if a single person was submitting the form and attending, they had to fill out five fields: first name, last name, attendance, email, phone. They could choose to add more information but on their own time.

I didn't allow people to edit their submissions after pressing the button. I could have, but I wasn't interested in updating values in the spreadsheet backend. I figured I could manage texts or emails from guests if they needed to make updates or ask questions about their. This only happened a couple times, and the manual effort of making changes was much lower than building an elegant and private search-and-update page.

You may notice we didn't really ask about food choices. That's because we just have a food truck at the wedding and they take orders on demand. The meal choice is up to the guest at dinner time. This was an intentional decision to simplify the dinner and reception.

#### Phase 3: Attendance

Flights are landing, hotels are filling, people are in town and planning to come to the wedding. They have so much on their mind travel-wise that it's hard to remember the event schedule. Slap the main schedule right on the landing page to make it easy for your guests to remind themselves where they need to be and when. Arrival and start times are the most important. Micro-details can be discovered as needed.

#### Phase 4: Reflection

Lastly, your website will remain an artifact for a weekend well spent with friends and family. It's also a good place to share any photos once they become available. This is likely the final state of your wedding website. Heck you might even let that domain name expire.

## In summary

The wedding industry is filled with an overwhelming number of emails, details about center pieces and table numbers, and questions with answers that beg more questions. Our wedding website is a refuge from that industry, which allows me to channel any anxieties into creativity in attempt to make the weekend and events clear for our guests.

❤️