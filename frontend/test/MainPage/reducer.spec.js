import React from "react";
import MainPage from "../../src/containers/MainPage/";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer from "../../src/containers/MainPage/reducer";
import * as types from "../../src/containers/MainPage/constants";

const defaultReducerState = {
    mode: {
      street: "Preflop",
      streetAction: "Raise4BetCall"
    },
    rangeColors: {
      "#8BDDBE": [],
      "#ED87A7": [],
      "#6B6C7C": [],
      "#D3D3D3": []
    },
    ranges: {
      Preflop: {
        disabled: false,
        Raise4BetCall: {
          color: "#8BDDBE",
          active: "red",
          prHandString: [],
          colorCard: "#D3D3D3 card-button"
        },
        Raise4BetFold: {
          color: "#ED87A7",
          active: false,
          prHandString: [],
          colorCard: "#6B6C7C card-button"
        },
        RaiseCall: {
          color: "#6B6C7C",
          active: false,
          prHandString: [],
          colorCard: "#ED87A7 card-button"
        },
        RaiseFold: {
          color: "#D3D3D3",
          active: false,
          prHandString: [],
          colorCard: "#8BDDBE card-button"
        }
      },
      Flop: {
        disabled: true,
        Valuebet: {
          color: "#8BDDBE",
          prHandString: [],
          colorCard: "#D3D3D3 card-button"
        },
        Bluff: {
          color: "#ED87A7",
          prHandString: [],
          colorCard: "#6B6C7C card-button"
        },
        CheckCall: {
          color: "#6B6C7C",
          prHandString: [],
          colorCard: "#ED87A7 card-button"
        },
        CheckFold: {
          color: "#D3D3D3",
          prHandString: [],
          colorCard: "#8BDDBE card-button"
        }
      },
      Turn: {
        disabled: true,
        Valuebet: {
          color: "#8BDDBE",
          prHandString: [],
          colorCard: "#D3D3D3 card-button"
        },
        Bluff: {
          color: "#ED87A7",
          prHandString: [],
          colorCard: "#6B6C7C card-button"
        },
        CheckCall: {
          color: "#6B6C7C",
          prHandString: [],
          colorCard: "#ED87A7 card-button"
        },
        CheckFold: {
          color: "#D3D3D3",
          prHandString: [],
          colorCard: "#8BDDBE card-button"
        }
      },
      River: {
        disabled: true,
        Valuebet: {
          color: "#8BDDBE",
          prHandString: [],
          colorCard: "#D3D3D3 card-button"
        },
        Bluff: {
          color: "#ED87A7",
          prHandString: [],
          colorCard: "#6B6C7C card-button"
        },
        CheckCall: {
          color: "#6B6C7C",
          prHandString: [],
          colorCard: "#ED87A7 card-button"
        },
        CheckFold: {
          color: "#D3D3D3",
          prHandString: [],
          colorCard: "#8BDDBE card-button"
        }
      }
    }
};

const data = [{  name: 'Preflop', value: 'Raise4BetFold' },
              {  name: 'Preflop', value: 'RaiseCall' },
              {  name: 'Preflop', value: 'RaiseFold' },
              {  name: 'Flop', value: 'Valuebet' },
              {  name: 'Flop', value: 'Bluff' },
              {  name: 'Flop', value: 'CheckCall' },
              {  name: 'Flop', value: 'CheckFold' },
              {  name: 'Turn', value: 'Valuebet' },
              {  name: 'Turn', value: 'Bluff' },
              {  name: 'Turn', value: 'CheckCall' },
              {  name: 'Turn', value: 'CheckFold' },
              {  name: 'River', value: 'Valuebet' },
              {  name: 'River', value: 'Bluff' },
              {  name: 'River', value: 'CheckCall' },
              {  name: 'River', value: 'CheckFold' }
];

const sethandrange = [{cards: 'AKo', street: 'Preflop', streetAction: 'Raise4BetCall', rangeColors: {"#8BDDBE": ['AKo']}},
                      {cards: 'AKo', street: 'Preflop', streetAction: 'Raise4BetFold', rangeColors: {"#ED87A7": ['AKo']}},
                      {cards: 'AKo', street: 'Preflop', streetAction: 'RaiseCall', rangeColors: { "#6B6C7C": ['AKo']}},
                      {cards: 'AKo', street: 'Preflop', streetAction: 'RaiseFold', rangeColors: { "#D3D3D3": ['AKo']}},
                      {cards: 'AKo', street: 'Flop', streetAction: 'Valuebet', rangeColors: {"#8BDDBE": ['AKo']}},
                      {cards: 'AKo', street: 'Flop', streetAction: 'Bluff', rangeColors: {"#ED87A7": ['AKo']}},
                      {cards: 'AKo', street: 'Flop', streetAction: 'CheckCall', rangeColors: { "#6B6C7C": ['AKo']}},
                      {cards: 'AKo', street: 'Flop', streetAction: 'CheckFold', rangeColors: { "#D3D3D3": ['AKo']} },
                      {cards: 'AKo', street: 'Turn', streetAction: 'Valuebet', rangeColors: {"#8BDDBE": ['AKo']}},
                      {cards: 'AKo', street: 'Turn', streetAction: 'Bluff', rangeColors: {"#ED87A7": ['AKo']}},
                      {cards: 'AKo', street: 'Turn', streetAction: 'CheckCall', rangeColors: { "#6B6C7C": ['AKo']}},
                      {cards: 'AKo', street: 'Turn', streetAction: 'CheckFold', rangeColors: { "#D3D3D3": ['AKo']} },
                      {cards: 'AKo', street: 'River', streetAction: 'Valuebet', rangeColors: {"#8BDDBE": ['AKo']}},
                      {cards: 'AKo', street: 'River', streetAction: 'Bluff', rangeColors: {"#ED87A7": ['AKo']}},
                      {cards: 'AKo', street: 'River', streetAction: 'CheckCall', rangeColors: { "#6B6C7C": ['AKo']}},
                      {cards: 'AKo', street: 'River', streetAction: 'CheckFold', rangeColors: { "#D3D3D3": ['AKo']} }];

describe('main reducer', () => {
    test('should return the initial state', function() {
        expect(reducer(undefined, {})).toEqual(
            defaultReducerState
        )
    });

    test.each(data)('The reducer with action '  + types.SET_HAND_RANGE_SELECT + ' should return the new mode', (data) =>  {
        const action = {type: types.SET_HAND_RANGE_SELECT, data};

        let newState = JSON.parse(JSON.stringify(defaultReducerState));
        newState = {...defaultReducerState, mode: {
            street: data.name,
            streetAction: data.value
          }};

        expect(reducer(undefined, action)).toEqual(newState);    
    }); 

    //FIXME: This test definitely is broken    
    test.each(sethandrange)('The reducer with action ' + types.SET_HAND_RANGE + 
        ' should return the new hand range', (sethandrange) => {
        const action = {type: types.SET_HAND_RANGE, data: {cards: sethandrange.cards}};

        let oldState = JSON.parse(JSON.stringify(defaultReducerState));
        oldState.mode = {
            street: sethandrange.street,
            streetAction: sethandrange.streetAction
        }; 
        console.log(oldState); //?

        let newState = JSON.parse(JSON.stringify(oldState));
        newState.ranges[[sethandrange.street]][[sethandrange.streetAction]].prHandString = ['AKo'];
        

        const rangeColors = {...newState.rangeColors};
        newState.rangeColors = sethandrange.rangeColors;
        newState.rangeColors = {...rangeColors, ...newState.rangeColors};

        expect(reducer(oldState, action)).toEqual(newState);   
    });
})