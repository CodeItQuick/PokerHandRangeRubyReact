# Poker Range Application

# Introduction

This is a poker application similar to many on the market. The unique offering is that it allows you to easily
share the hands you play preflop. Googling preflop hand charts gives a large variety of charts people follow when
playing poker more seriously. Ranges are commonly traded between players, or sold through training sites, to improve
peoples preflop (and sometimes postflop) play. Nose-Bleeds High stakes regular Doug Polk popularized a method to analyze
hands postflop that involve breaking your poker range down into several categories and seeing how "balanced" you are.
This app allows you to check whether your range is balanced on all streets preflop through the hand range charts, and postflop
through Doug Polks method.

Rather than using my coding skills to improve my poker player skills, the intention of this project is to learn react and web development
principles through the creation of a real-world application. I have some knowledge of this industry, although I am very out of practice
with the latest theories. This application is meant to act as a showcase of my current coding skillset.

# Technologies

The following technologies were used in creating this application:

```
(1) React
(2) Redux
(3) Sagas
(4) React Hooks
(5) Javascript/Ruby
(6) Wallaby/Mocha/Chai testing service and VS Code plugin
```
# Specific Code Examples

Example of a React Component:
https://github.com/CodeItQuick/PokerHandRangeRubyReact/blob/master/backend/frontend/src/containers/MainPage/InputForm/index.js

Example of a Test:
https://github.com/CodeItQuick/PokerHandRangeRubyReact/blob/master/backend/frontend/src/test/MainPage/EngineClasses/RangeObject.spec.js

Internal Engine Classes Folder (Detailed):
https://github.com/CodeItQuick/PokerHandRangeRubyReact/tree/master/backend/frontend/src/containers/MainPage/EngineClasses

Internal Main React Frontend Address (Very Detailed):
https://github.com/CodeItQuick/PokerHandRangeRubyReact/tree/master/backend/frontend/src/containers/MainPage

# Test Speed running 'jest test --maxWorkers=4"

```
Test Suites: 18 passed, 18 total
Tests:       108 passed, 108 total
Snapshots:   0 total
Time:        8.245s, estimated 20s
```

Note: all of these tests run in under 100ms, and generally are under 10ms. Due to file I/O speeds for the 18 testing files, it takes ~8s to run, but using Wallaby.js I basically get instant feedback.

# Contributions into Other Open Source Repositories

For reference on experience with working in other open source projects, see these two PR's into open-sauced:

1. First low-friction PR: https://github.com/open-sauced/open-sauced/pull/847
1. Second PR with feedback: https://github.com/open-sauced/open-sauced/pull/850

# Running the Application

After forking and downloading the repo, go into the "backend/frontend" folder and you should be able to run the front end through npm install and then npm run.

## Hosting situation 

The site in the future will be listed online. However, currently my terraform uses fargate containers, which are expensive to run (approx. $15 USD per day). When I get time in a week or two I'll host the site using EC2 instead of containers and it should be available (it'll still be expensive but $15 USD is prohibitively so for me.).

There is an interview on the process of creating the site available on twitch video at: https://www.twitch.tv/videos/707482634
The video was a project feature done by streamer "tbdgamer" on my react project.

# Thanks
Thanks to mahonz for the help in developing the application from the client-perspective.
