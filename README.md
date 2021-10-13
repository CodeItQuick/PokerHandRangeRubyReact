Note: use Node v12.16.2. I ran into some issues going back to this codebase on Sept 27th, 2021 with the node version.

# Poker Range Application

Not currently hosted. Note: There's a docker-compose in the root of this project. You can type 
```docker-compose up``` 
to run the application on port 3000. Word of warning: the application takes forever to build, and the dockerfile is 
relatively messy.

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
  90 passing (165ms)
  5 pending
```

# Running the Application

After forking and downloading the repo, go into the "backend/frontend" folder and you should be able to run the front end through npm install and then npm run.

## Hosting situation 

The site in the future will be listed online. However, currently my terraform uses fargate containers, which are expensive to run (approx. $15 USD per day). When I get time in a week or two I'll host the site using EC2 instead of containers and it should be available (it'll still be expensive but $15 USD is prohibitively so for me.).

# Interview

There is an interview on the process of creating the site available on twitch video at: https://www.youtube.com/watch?v=J_HB1XG8dwE
The video was a project feature done by streamer "tbdgamer" on my react project.

# Thanks
Thanks to mahonz for the help in developing the application from the client-perspective.

# Sample Test Printout
```
the transformHandRange function 
    ✓ should be able to transform the sample data
    ✓ should be able to transform the sample data
    ✓ should be able to assignDeadcards to an array of one deadcards when given a single deadcards
    ✓ should be able to assignDeadcards to an array of two deadcards when given two deadcards
    ✓ should be able to assignDeadcards to an array of three deadcards when given three deadcards
    ✓ should be able to assignDeadcards to an array of four deadcards when given four deadcards
    ✓ should be able to assignDeadcards to an array of five deadcards when given five deadcards

  CardHandSuitBuilder Class
    ✓ can be constructed when two cards, and no suit entered
    ✓ can be constructed when two cards, and a suit entered
    ✓ can be constructed when two cards (reverse order), and a suit entered returns a CardHandSuitBuilder Object in normalized order
    ✓ CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and suited
    ✓ CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and suited
    ✓ CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and suit of cs
    ✓ CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Th, cardTwo of 8s, and suit of cs

  MainPage Container
    ✓ board renders with a white card-button object
    ✓ board fires onClick handler as clicked

  Table Grid Column
    ✓  the function colorCell returns the given colorCard suit for a pair
    ✓  the function colorCell returns the given colorCard suit for a suited hand
    ✓  the function colorCell returns blank when given a suited cards hand and an offsuit CardHandSuitBuilder().build
    ✓  the function colorCell returns the given colorCard suit for a offsuit hand
    ✓  the function colorCell returns the given colorCard suit for a specific offsuit hand
    ✓  the function colorCell returns the given colorCard suit for a specific suited hand
    ✓  the function colorCell returns the given colorCard suit for two specific suited hand

  Board Legend
    ✓ The board legend counts the correct number of combinations for a sutested hand
    ✓ The board legend counts the correct number of combinations for a sutested hand when the sutests match
    - The board legend counts the correct number of combinations for a offsutest hand
    ✓ The board legend counts the correct number of combtestions for a paired hand
    ✓ The board legend counts the correct number of combinations for a specific spades combo hand
    ✓ The board legend counts 1 combination for a specific hand no matching cards on board
    ✓ The board legend counts 0 combinations for a specific hand wtesth matching cards on board

  SelectedStreet 
    ✓ can be constructed
    ✓ can be filtered
    ✓ can be displayed

  CardHandSuitBuilder can 
    ✓ can return tests own value
    ✓ can return tests own value
    ✓ can return tests own value

  RangeObject Class
    ✓ can be constructed with a street, streetAction, and array of hands
    ✓ can be transformed into a data value object to be stored
    ✓ can be transformed into a data value object to be stored
    ✓ can be transformed into a data value object to be stored
    ✓ can be transformed into a data value object to be stored
    ✓ displayFriendlyRangeSuit displays a valid range for AA, AKs, AQo
    ✓ displayFriendlyRangeSuit displays a condensed valid range for AA, AKs, AKo
    ✓ displayFriendlyRangeSuit displays a condensed valid range for AA, As9s, Tc8d
    ✓ displayInfo displays a condensed valid range for AA, As9s, AK
    ✓ displayInfo displays a condensed valid range for AA, As9s, AK
    ✓ displayInfo displays a condensed valid range for AA, As9s, AK
    ✓ displayInfo displays a condensed valid range for AA, As9s, AK
    ✓ displayInfo displays a condensed valid range for AA, As9s, AK
    ✓ displayInfo displays a condensed valid range for AA, As9s, AK

  A RangeObject Collection 
    ✓ given no constructor can display 16 RangeObjects
    ✓ given a constructor can displayed for 16 RangeObjects
    ✓ given a constructor can displayed for 16 RangeObjects with hands
    ✓ given a RangeObject can provide filtered range for the Flop
    ✓ given a RangeObject can provide filtered range for the Turn
    ✓ given a RangeObject can provide filtered range for the River

  State Update Functions
    ✓  generate CardGrid generates an empty object when given an empty range
    ✓  generate CardGrid generates an AA object when given an AA range
    ✓  generate CardGrid generates an AA object when given an AA range
    ✓  generate CardGrid generates an AA object when given an AA range
    ✓  generate CardGrid generates an AA object when given an AA range
    ✓  generates a BoardOfHands when instantiated and called
    ✓  can be updated to generate a new board

  MainPage Container
    ✓ renders an element on the page
    ✓ handsInRange should return false when given an empty range
    ✓ handsInRange should return true when given a range with AA

  InputStreet Container
    ✓ The assignPositions function returns the correct values for the flop

  Integration its: 
    - The reducer when action GET_SCENARIO_SUCCESS should return the new state for the reducer
    - The reducer when action GET_ALL_SCENARIO_SUCCESS should return the new state for the reducer
    - a token gets passed to the saga correctly

  MainPage reducer
    ✓ should return the initial state
    ✓ When it is given the change IP action it changes state

  MainPage reducer
    ✓ should return the initial state
    - The reducer with action handrangeAPI/MainPage/SET_HAND_RANGE_SELECT should return the new mode
    ✓ The reducer when action SET_HAND_RANGE should return the new state for hand range
    ✓ The reducer when action SET_DEADCARDS should return the new state for deadcards

  ScenarioLoader
    ✓ the scenario object can be instantiated
    ✓ the scenario object returns valid objects
    ✓ the scenario object returns valid defender positions
    ✓ the scenario object returns valid opener positions
    ✓ the scenario object returns valid scenario name
    ✓ the scenarios object can be instantiated
Warning: Each child in a list should have a unique "key" prop.

Check the top-level render call using <TableBody>. See https://fb.me/react-warning-keys for more information.
    in ScenarioComponent (at ScenariosComponent.js:21)
    ✓ the scenarios object can render when given a scenario component
    ✓ the scenarios object can render when given multiple scenario component

  MainPage Login Selectors
    ✓ mode should return the current mode 
    ✓ select range repo should return in position 
    ✓ range repo OOP should return the empty ranges 
    ✓ select preflop ranges should return just the preflop ranges 
    ✓ make select range should return an empty range
    ✓ deadcards should return an empty array when empty 
    ✓ select position should return true as default 
    ✓ selectLoadEquities should return false for default value 
    ✓ selectOtherRange should return a full range 
    ✓ selectHandEquities should return two empty strings in an array as default.

  MainPage reducer
    ✓ should return the initial state


  90 passing (165ms)
  5 pending
```
