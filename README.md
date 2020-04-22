# Poker Range Application

# Introduction

This is a poker application similar to many on the market. The unique offering is that it allows you to easily
share the hands you play preflop. Googling preflop hand charts gives a large variety of charts people follow when
playing poker more seriously. Ranges are commonly traded between players, or sold through training sites, to improve
peoples preflop (and sometimes postflop) play. Nose-Bleeds High stakes regular Doug Polk popularized a method to analyze
hands postflop that involve breaking your poker range down into several categories and seeing how "balanced" you are.
This app allows you to check whether your range is balanced on all streets preflop through the hand range charts, and postflop
through Doug Polks method.

Rather than using my coding skills to improve my poker player, the intention of this project is to learn react and web development
principles through the creation of a real-world application. I have some knowledge of this industry, although I am very out of practice
with the latest theories. This application is meant to act as a showcase of my current coding skillet.

The following technologies were used in creating this application:
(1) React
(2) Redux
(3) Sagas
(4) React Hooks
(5) Javascript/Ruby
(6) Wallaby/Jest/Enzyme testing service and VS Code plugin

After forking and downloading the repo, you should be able to run the front end through npm install and then npm run. The backend
is run through the rails server with (in my case) a debugger with the following launch.json file:
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Rails server",
            "type": "Ruby",
            "request": "launch",
            "program": "${workspaceRoot}/bin/rails",
            "args": [
                "server",
                "-p",
                "3001"
            ]
        }
    ]
}

Finally the website can be found live (usually) at the following netlify address: https://upbeat-jang-2f8339.netlify.app/

Note: PR's are deployed to netlify for previews. The PR-style is out of sync with my typical workflow, and I plan to revamp
the project management style in this project (mostly to simplify it). As always this is a bit of a work in progress.
