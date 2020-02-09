import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer/index';
import Board from '../../components/board/board';
import Range from '../Range/index';
import {Button } from 'semantic-ui-react';
import UseRequest1API from '../../HOC/API/useRequest1';

export const MainPage = ({loading, error}) => {

    const initBettingOptions = [
        {key: 'raise4betCall', value: 'raise4betCall', text: 'Raise/4bet/Call'},
        {key: 'raise4betFold', value: 'raise4betFold', text: 'Raise/4bet/Fold'},
        {key: 'raiseCall', value: 'raiseCall', text: 'Raise/Call'},
        {key: 'raiseFold', value: 'raiseFold', text: 'Raise/Fold'},
        {key: 'Fold', value: 'Fold', text: 'Fold'}
    ]
    const url = "hand_ranges";
    const [raise4betCall, setRaise4betCall] = useState([]);
    const [raise4betFold, setRaise4betFold] = useState([]);
    const [raiseCall, setRaiseCall] = useState([]);
    const [raiseFold, setRaiseFold] = useState([]);

    const [postQuery, setPostQuery] = useState();
    const [dataState] = UseRequest1API(postQuery, url);


    const [bettingOptions, setBettingOptions] = useState(initBettingOptions.key);

    const onRaise4BetCallHandler = (e) => {
        setRaise4betCall(raise4betCall.map((key, value) => {return key;}));
    };

    const onRaise4BetFoldHandler = (e) => {
        setRaise4betFold(raise4betFold.map((key, value) => {return key;}));
    };

    const onRaiseCallHandler = (e) => {
        setRaiseCall(raiseCall.map((key, value) => {return key;}));
    };

    const onRaiseFoldHandler = (e) => {
        setRaiseFold(raiseFold.map((key, value) => {return key;}));
    };

    const bettingOptionsHandler = (e) => {
        if(e.target.textContent === "Raise/4bet/Call")
        {
            setBettingOptions(initBettingOptions[0].key);
        }
        else if(e.target.textContent === "Raise/4bet/Fold")
        {
            setBettingOptions(initBettingOptions[1].key);
        }
        else if(e.target.textContent === "Raise/Call")
        {
            setBettingOptions(initBettingOptions[2].key);
        }
        else if(e.target.textContent === "Raise/Fold")
        {
            setBettingOptions(initBettingOptions[3].key);
        }
        else if(e.target.textContent === "Fold")
        {
            setBettingOptions(initBettingOptions[4].key);
        }
    };

    const checkBettingOption = (action, getHandHandler, setHandHandler, handTested) => {
        console.log(bettingOptions);
        if(bettingOptions === action)
        {
            if(getHandHandler.includes(handTested))
            {
                console.log("remove");
                let filteredHandRange = getHandHandler.filter(function(hand){ return hand !== handTested});

                setHandHandler(filteredHandRange);
            }
            else
            {
                setHandHandler([...getHandHandler, handTested]);
            }        
        }
    }

    const onHandClickHandler = (e) => {
        checkBettingOption("raise4betCall", raise4betCall, setRaise4betCall, e.target.name); 
        checkBettingOption("raise4betFold", raise4betFold, setRaise4betFold, e.target.name); 
        checkBettingOption("raiseCall", raiseCall, setRaiseCall, e.target.name); 
        checkBettingOption("raiseFold", raiseFold, setRaiseFold, e.target.name); 
    };

    const checkClassColor = (hand, getHandHandler, color) => {
        if(getHandHandler.includes(hand))
        {
            return "ui " + color + " button";
        }
        
    }

    const classColorHandler = (cardOne, cardTwo, suit) => {
        let classColorValue = "";
        classColorValue = classColorValue + checkClassColor(cardOne + cardTwo + suit, raise4betCall, "red");
        classColorValue = classColorValue + checkClassColor(cardOne + cardTwo + suit, raise4betFold, "violet");
        classColorValue = classColorValue + checkClassColor(cardOne + cardTwo + suit, raiseCall, "blue");
        classColorValue = classColorValue + checkClassColor(cardOne + cardTwo + suit, raiseFold, "green");
        return classColorValue;
    };

    const saveToServerHandler = async () => {
        let newRaise4betCall = (raise4betCall.length !== 0) ? raise4betCall.reduce((result, item) => { return result + item;}) : null;
        let newRaise4betFold = (raise4betFold.length !== 0) ? raise4betFold.reduce((result, item) => { return result + item;}) : null;
        let newRaiseCall = (raiseCall.length !== 0) ? raiseCall.reduce((result, item) => { return result + item;}) : null;
        let newRaiseFold = (raiseFold.length !== 0) ? raiseFold.reduce((result, item) => { return result + item;}) : null;
        let newData = {"params": {
            "RangeName": "EvansHandRangeTest", 
            "RangeScope0": newRaise4betCall, 
            "RangeScope1": newRaise4betFold, 
            "RangeScope2": newRaiseCall, 
            "RangeScope3": newRaiseFold, 
            "RangeScope4": "None", 
            "UserID": 1
        }};

        setPostQuery(newData);
        let returnData = await dataState;
     };

    return (
        <MainContainer>
            <Board onHandClick={onHandClickHandler} classColor={classColorHandler} optionsState={bettingOptions}></Board>
            <Range bettingOptions={initBettingOptions} onChangeHandler={bettingOptionsHandler}></Range><br></br>
            <div>Raise 4bet Call Range: <span onChange={onRaise4BetCallHandler.bind(this)}>{raise4betCall}</span></div>
            <div>Raise 4bet Fold Range: <span onChange={onRaise4BetFoldHandler.bind(this)}>{raise4betFold}</span></div>
            <div>Raise Call Range: <span onChange={onRaiseCallHandler.bind(this)}>{raiseCall}</span></div>
            <div>Raise Fold Range: <span onChange={onRaiseFoldHandler.bind(this)}>{raiseFold}</span></div>
            <Button onClick={saveToServerHandler}>Save Range To Server</Button>
        </MainContainer>
    );
};

export default MainPage;