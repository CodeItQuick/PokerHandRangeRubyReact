import React, { useState, useEffect } from 'react';
import MainContainer from '../../components/MainContainer/index';
import Board from '../../components/board/board';
import Range from '../Range/index';
import {Button, Select } from 'semantic-ui-react';
import UseRequest1API from '../../HOC/API/useRequest1';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../../redux/actions';
import prange from 'prange';

export const MainPage = (props) => {


    const dispatch = useDispatch();
    const username = useSelector(state => state.username);

    const user_id = useSelector(state => state.id);
    const user_email = useSelector(state => state.email);
    const text = username ? (
        <h1>{username} is currently logged in. You can store ranges.</h1>
    ) : (
        <h1>Nobody is logged in. You cannot store ranges.</h1>
    )

    const initBettingOptions = [
        {key: 'raise4betCall', value: 'raise4betCall', text: 'Raise/4bet/Call'},
        {key: 'raise4betFold', value: 'raise4betFold', text: 'Raise/4bet/Fold'},
        {key: 'raiseCall', value: 'raiseCall', text: 'Raise/Call'},
        {key: 'raiseFold', value: 'raiseFold', text: 'Raise/Fold'},
        {key: 'Fold', value: 'Fold', text: 'Fold'}
    ];

    const initCurrentUserRanges = [
        {key: 'EvansHandRange', value: 'EvansHandRange', text: "Evan's Hand Range"},
        {key: 'EvansHandRange2', value: 'EvansHandRange2', text: "Evan's Hand Range 2"}
    ];

    const urlHR = "hand_ranges";
    const [HRpostQuery, setHRPostQuery] = useState();
    const [dataStateHR] = UseRequest1API(HRpostQuery, urlHR, "get");


    const [raise4betCall, setRaise4betCall] = useState([]);
    const [raise4betFold, setRaise4betFold] = useState([]);
    const [raiseCall, setRaiseCall] = useState([]);
    const [raiseFold, setRaiseFold] = useState([]);

    const [PRANGEraise4betCall, setPRANGEraise4betCall] = useState(prange.reverse(raise4betCall));
    const [PRANGEraise4betFold, setPRANGEraise4betFold] = useState(prange.reverse(raise4betCall));
    const [PRANGEraiseCall, setPRANGEraiseCall] = useState(prange.reverse(raise4betCall));
    const [PRANGEraiseFold, setPRANGEraiseFold] = useState(prange.reverse(raise4betCall));

    useEffect(() => {
        setPRANGEraise4betCall(prange.reverse(raise4betCall));
        setPRANGEraise4betFold(prange.reverse(raise4betFold));
        setPRANGEraiseCall(prange.reverse(raiseCall));
        setPRANGEraiseFold(prange.reverse(raiseFold));
    }, [raise4betCall, raise4betFold, raiseCall, raiseFold]);

    useEffect(() => {

        setRaise4betCall((dataStateHR.data[13]) ? prange(dataStateHR.data[13].RangeScope0) : [] );
        setRaise4betFold((dataStateHR.data[13]) ? prange(dataStateHR.data[13].RangeScope1) : [] );
        setRaiseCall((dataStateHR.data[13]) ? prange(dataStateHR.data[13].RangeScope2) : [] );
        setRaiseFold((dataStateHR.data[13]) ? prange(dataStateHR.data[13].RangeScope3) : [] );
        
    }, [dataStateHR]);
    const url = "hand_ranges";
    const [postQuery, setPostQuery] = useState();
    const [dataState] = UseRequest1API(postQuery, url, "post");

    const [bettingOptions, setBettingOptions] = useState(initBettingOptions.key);
    const [activeUserRanges, setActiveUserRanges] = useState(initCurrentUserRanges.key);

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
        
        dispatch(userActions.saveHandRangeToDB());
        console.log(user_email);
        console.log(user_id);
        let newRaise4betCall = (PRANGEraise4betCall.length !== 0) ? PRANGEraise4betCall : null;
        let newRaise4betFold = (PRANGEraise4betFold.length !== 0) ? PRANGEraise4betFold : null;
        let newRaiseCall = (PRANGEraiseCall.length !== 0) ? PRANGEraiseCall : null;
        let newRaiseFold = (PRANGEraiseFold.length !== 0) ? PRANGEraiseFold : null;
        let newData = {"params": {
            "RangeName": "EvansHandRangeTest", 
            "RangeScope0": newRaise4betCall, 
            "RangeScope1": newRaise4betFold, 
            "RangeScope2": newRaiseCall, 
            "RangeScope3": newRaiseFold, 
            "RangeScope4": "None", 
            "user_id": (user_id) ? user_id : null
        }};

        setPostQuery(newData);
        let returnData = await dataState;
     };

    const loadUserRange = async () => {
        await setHRPostQuery([{"id": "4"}]);
        console.log(dataStateHR);



    }

    return (
        <MainContainer>
            <Board onHandClick={onHandClickHandler} classColor={classColorHandler} optionsState={bettingOptions}></Board>
            <Range bettingOptions={initBettingOptions} onChangeHandler={bettingOptionsHandler}></Range><br></br>
            <div>Raise 4bet Call Range: <span onChange={onRaise4BetCallHandler.bind(this)}>{PRANGEraise4betCall}</span></div>
            <div>Raise 4bet Fold Range: <span onChange={onRaise4BetFoldHandler.bind(this)}>{PRANGEraise4betFold}</span></div>
            <div>Raise Call Range: <span onChange={onRaiseCallHandler.bind(this)}>{PRANGEraiseCall}</span></div>
            <div>Raise Fold Range: <span onChange={onRaiseFoldHandler.bind(this)}>{PRANGEraiseFold}</span></div>
            <Button onClick={saveToServerHandler}>Save Range To Server</Button>
            <div>{text}</div>
            <Range bettingOptions={initCurrentUserRanges} onChangeHandler={loadUserRange}></Range><br></br>
        </MainContainer>
    );
};

export default MainPage;