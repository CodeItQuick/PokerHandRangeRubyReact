import React from "react";
import MainPage from "../../src/containers/MainPage/";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer, { initialState } from "../../src/containers/MainPage/reducer";
import * as types from "../../src/containers/MainPage/constants";

const defaultReducerState = initialState;

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

const sethandrange = [{cards: 'AKo', street: 'Preflop', streetAction: 'Raise4BetCall'},
                      {cards: 'AKo', street: 'Preflop', streetAction: 'Raise4BetFold'},
                      {cards: 'AKo', street: 'Preflop', streetAction: 'RaiseCall'},
                      {cards: 'AKo', street: 'Preflop', streetAction: 'RaiseFold'},
                      {cards: 'AKo', street: 'Flop', streetAction: 'Valuebet'},
                      {cards: 'AKo', street: 'Flop', streetAction: 'Bluff'},
                      {cards: 'AKo', street: 'Flop', streetAction: 'CheckCall'},
                      {cards: 'AKo', street: 'Flop', streetAction: 'CheckFold'},
                      {cards: 'AKo', street: 'Turn', streetAction: 'Valuebet'},
                      {cards: 'AKo', street: 'Turn', streetAction: 'Bluff'},
                      {cards: 'AKo', street: 'Turn', streetAction: 'CheckCall' },
                      {cards: 'AKo', street: 'Turn', streetAction: 'CheckFold'},
                      {cards: 'AKo', street: 'River', streetAction: 'Valuebet'},
                      {cards: 'AKo', street: 'River', streetAction: 'Bluff'},
                      {cards: 'AKo', street: 'River', streetAction: 'CheckCall'},
                      {cards: 'AKo', street: 'River', streetAction: 'CheckFold' }];

describe('MainPage reducer', () => {
    test('should return the initial state', function() {
        expect(reducer(undefined, {})).toEqual(
            defaultReducerState
        )
    });

    test.each(data)('The reducer with action '  + types.SET_HAND_RANGE_SELECT 
        + ' should return the new mode', (data) =>  {
        const action = {type: types.SET_HAND_RANGE_SELECT, data};

        let newState = JSON.parse(JSON.stringify(defaultReducerState));
        newState = {...defaultReducerState, mode: {
            street: data.name,
            streetAction: data.value
          }};

        expect(reducer(undefined, action)).toEqual(newState);    
    }); 

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

        newState['ranges'] = newState.ranges.map(({Street, BetType, hands}) => {
            let newHands = undefined;
            if (Street == sethandrange.street && BetType == sethandrange.streetAction)
                newHands = [...hands, sethandrange.cards];
            return {Street, BetType, hands: newHands || hands};
        });

        console.log(newState); //?

        expect(reducer(oldState, action)).toEqual(newState);   
    });


    test('The reducer with action ' + types.SET_DYNAMIC_FOLDER_INFO + 
        ' should return the new hand range', () => {
        const action = {type: types.SET_DYNAMIC_FOLDER_INFO, data: {
            folderID: "My First Folder",
            folderSubgroupName: "Opening Ranges",
            folderSubgroupRangeName: "MP"}
        };

        let oldState = JSON.parse(JSON.stringify(defaultReducerState));
        oldState['ranges']['Preflop']['Raise4BetCall'].prHandString = ['AA']; 
        oldState["rangeColors"] = {
            '#8BDDBE': ["AA"],
            '#ED87A7': [],
            '#6B6C7C': [],
            '#D3D3D3': []
        }
        
        let newState = JSON.parse(JSON.stringify(oldState));
        newState.rangeRepo["Evan's Second Folder"]['Opening Ranges']['UTG']['ranges'] = JSON.parse(JSON.stringify(defaultReducerState.ranges)); 
        newState.rangeRepo["Evan's Second Folder"]['Opening Ranges']['UTG']['ranges']['Preflop']['Raise4BetCall'].prHandString = ['AA']; 
        newState.rangeSelectionArray["folderSubgroupRangeName"] = "MP";
        newState['ranges']['Preflop']['Raise4BetCall'].prHandString = [];

        const rangeColors = {...newState.rangeColors};
        newState.rangeColors = sethandrange.rangeColors;
        newState.rangeColors = {...rangeColors, ...newState.rangeColors};

        expect(reducer(oldState, action)).toEqual(newState); 
        
        const secondAction = {type: types.SET_DYNAMIC_FOLDER_INFO, data: {
            folderID: "Evan's Second Folder",
            folderSubgroupName: "Opening Ranges",
            folderSubgroupRangeName: "UTG"}
        };

        let finalState = JSON.parse(JSON.stringify(newState));

        finalState.rangeRepo["Evan's Second Folder"]['Opening Ranges']['MP']['ranges'] = JSON.parse(JSON.stringify(defaultReducerState.ranges)); 
        finalState.rangeRepo["Evan's Second Folder"]['Opening Ranges']['MP']['ranges']['Preflop']['Raise4BetCall'].prHandString = []; 
        finalState['ranges']['Preflop']['Raise4BetCall'].prHandString = ['AA']; 
         

        expect(reducer(newState, action)).toEqual(finalState); 
        
    });
})