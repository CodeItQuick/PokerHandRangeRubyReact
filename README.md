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
(6) Wallaby/Jest/Enzyme testing service and VS Code plugin
```
# Specific Code Examples

Example of a React Component:
https://github.com/CodeItQuick/PokerHandRangeRubyReact/blob/master/backend/frontend/src/containers/MainPage/InputForm/index.js

Example of a Test:
https://github.com/CodeItQuick/PokerHandRangeRubyReact/blob/master/backend/frontend/test/MainPage/EngineClasses/RangeObject.spec.js

Internal Engine Classes Folder (Detailed):
https://github.com/CodeItQuick/PokerHandRangeRubyReact/tree/master/backend/frontend/src/containers/MainPage/EngineClasses

Internal Main React Frontend Address (Very Detailed):
https://github.com/CodeItQuick/PokerHandRangeRubyReact/tree/master/backend/frontend/src/containers/MainPage

# Test Speed running 'jest test --maxWorkers=4"

```
  93 passing (181ms)
  2 pending
```

Note: Node 12.16.2 was used, there appears to be an error on earlier versions of Node 12.

# Contributions into Other Open Source Repositories

For reference on experience with working in other open source projects, see these two PR's into open-sauced:

1. First low-friction PR: https://github.com/open-sauced/open-sauced/pull/847
1. Second PR with feedback: https://github.com/open-sauced/open-sauced/pull/850

# Running the Application

After forking and downloading the repo, go into the "backend/frontend" folder and you should be able to run the front end through npm install and then npm run.

Finally the website can be found live at the following AWS address: http://www.poker-range-appalyzer.com

There is an interview on the process of creating the site available on twitch video at: https://www.twitch.tv/videos/707482634
The video was a project feature done by streamer "tbdgamer" on my react project.

# Thanks
Thanks to mahonz for the help in developing the application from the client-perspective.
