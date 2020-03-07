import React, { useState, useEffect } from 'react';
import MainContainer from '../../components/MainContainer/index';
import Board from '../../components/board/board';
import Range from '../Range/index';
import {Button, Select } from 'semantic-ui-react';
import UseRequest1API from '../../HOC/API/useRequest1';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../../reducers/actions';
import prange from 'prange';
import {Row, Col} from 'react-bootstrap';
import BoardLegend from '../../components/BoardLegend/BoardLegend';
import hrActions from '../../reducers/actionsHandRanges.js';

export const MainPage = (props) => {


    const dispatch = useDispatch();
    const name = useSelector(state => state.rootReducer.name);

    const user_id = useSelector(state => state.rootReducer.id);
    const user_email = useSelector(state => state.email);

    const userRanges = useSelector(state => state.handRangesAvailable.ranges);

    const userFolders = useSelector(state => state.handRangesAvailable.folderNames);
    const userGroups = useSelector(state => state.handRangesAvailable.folderGroups);

    const text = name ? (
        <h1>{name} is currently logged in. You can store ranges.</h1>
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

    const [currentUserRanges, setCurrentUserRanges] = useState([
        {key: 'EvansHandRange', value: 'EvansHandRange', text: "Evan's Hand Range"},
        {key: 'EvansHandRange2', value: 'EvansHandRange2', text: "Evan's Hand Range 2"}
    ]);

    const [currentUserFolders, setCurrentUserFolders] = useState([
        {key: 'EvansHandRange', value: 'EvansHandRange', text: "Evan's Folder"},
        {key: 'EvansHandRange2', value: 'EvansHandRange2', text: "Evan's Folder 2"}
    ]);

    const [currentUserGroups, setCurrentUserGroups] = useState([
        {key: 'EvansHandRange', value: 'EvansHandRange', text: "Evan's Groups"},
        {key: 'EvansHandRange2', value: 'EvansHandRange2', text: "Evan's Groups 2"}
    ]);
    const [selectedFolder, setSelectedFolder] = useState();
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedRange, setSelectedRange] = useState();

    const [raise4betCall, setRaise4betCall] = useState([]);
    const [raise4betFold, setRaise4betFold] = useState([]);
    const [raiseCall, setRaiseCall] = useState([]);
    const [raiseFold, setRaiseFold] = useState([]);

    const [PRANGEraise4betCall, setPRANGEraise4betCall] = useState(prange.reverse(raise4betCall));
    const [PRANGEraise4betFold, setPRANGEraise4betFold] = useState(prange.reverse(raise4betCall));
    const [PRANGEraiseCall, setPRANGEraiseCall] = useState(prange.reverse(raise4betCall));
    const [PRANGEraiseFold, setPRANGEraiseFold] = useState(prange.reverse(raise4betCall));
    const [handRangeName, setHandRangeName] = useState();
    useEffect(() => {
        setPRANGEraise4betCall(prange.reverse(raise4betCall));
        setPRANGEraise4betFold(prange.reverse(raise4betFold));
        setPRANGEraiseCall(prange.reverse(raiseCall));
        setPRANGEraiseFold(prange.reverse(raiseFold));
    }, [raise4betCall, raise4betFold, raiseCall, raiseFold]);

    useEffect(() => {
        if(userRanges)
        {
            let handRangeNames = [];
            let i = 0;
            userRanges.forEach((userRange) => {
                handRangeNames = [...handRangeNames, {key: i, value: i, text: userRange.RangeName}];
                i = i + 1;
            });
            setCurrentUserRanges(handRangeNames);
        }
    }, [userRanges]);

    useEffect(() => {
        if(userFolders)
        {
            let handFoldersNames = [];
            let i = 0;
            userFolders.forEach((userFolder) => {
                handFoldersNames = [...handFoldersNames, {key: i, value: userFolder.id, text: userFolder.FolderName}];
                i = i + 1;
            });
            setCurrentUserFolders(handFoldersNames);
        }
    }, [userFolders]);
   
    useEffect(() => {
        if(userGroups)
        {
            console.log("value in userGroups");
            console.log(selectedFolder);
            console.log("value in userGroups");
            let handGroupsNames = [];
            let i = 0;
            userGroups.forEach((userGroup) => {
                if (userGroup.hand_range_folder_id == selectedFolder)
                {
                    handGroupsNames = [...handGroupsNames, {key: i, value: userGroup.id, text: userGroup.GroupName}];
                    i = i + 1;
                }
            });
            setCurrentUserGroups(handGroupsNames);
        }
    }, [userGroups, userFolders, selectedFolder]);

    const url = "hand_ranges";
    const [postQuery, setPostQuery] = useState();
    const [dataState] = UseRequest1API(postQuery, url, "post");

    const [bettingOptions, setBettingOptions] = useState(dataState);

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

    const [raise4BetCallCombos, setRaise4BetCallCombos] = useState(0);
    const [raise4BetFoldCombos, setRaise4BetFoldCombos] = useState(0);
    const [raiseCallCombos, setRaiseCallCombos] = useState(0);
    const [raiseFoldCombos, setRaiseFoldCombos] = useState(0);
    const [totalCombos, setTotalCombos] = useState(0);
    const [raise4BetCallPercent, setRaise4BetCallPercent] = useState(0);
    const [raise4BetFoldPercent, setRaise4BetFoldPercent] = useState(0);
    const [raiseCallPercent, setRaiseCallPercent] = useState(0);
    const [raiseFoldPercent, setRaiseFoldPercent] = useState(0);

    const [raise4BetCallPercentAll, setRaise4BetCallPercentAll] = useState(0);
    const [raise4BetFoldPercentAll, setRaise4BetFoldPercentAll] = useState(0);
    const [raiseCallPercentAll, setRaiseCallPercentAll] = useState(0);
    const [raiseFoldPercentAll, setRaiseFoldPercentAll] = useState(0);
    useEffect(() => {
        setTotalCombos(raise4BetCallCombos + raise4BetFoldCombos + raiseCallCombos + raiseFoldCombos);
        setRaise4BetCallPercent((raise4BetCallCombos / totalCombos).toFixed(2))
        setRaise4BetFoldPercent((raise4BetFoldCombos / totalCombos).toFixed(2))
        setRaiseCallPercent((raiseCallCombos / totalCombos).toFixed(2))
        setRaiseFoldPercent((raiseFoldCombos / totalCombos).toFixed(2))
        setRaise4BetCallPercentAll((raise4BetCallCombos / 676).toFixed(2))
        setRaise4BetFoldPercentAll((raise4BetFoldCombos / 676).toFixed(2))
        setRaiseCallPercentAll((raiseCallCombos / 676).toFixed(2))
        setRaiseFoldPercentAll((raiseFoldCombos / 676).toFixed(2))
    }, [raise4BetCallCombos, raise4BetFoldCombos, raiseCallCombos, raiseFoldCombos, totalCombos ]);

    const checkBettingOption = (action, getHandHandler, setHandHandler, handTested, getCombos, setCombos ) => {
        if(bettingOptions === action)
        {
            if(getHandHandler.includes(handTested))
            {
                if(handTested.length === 2 && handTested[0] === handTested[1] && action === bettingOptions) {
                    const tempCombos = getCombos;
                    setCombos(tempCombos - 4);
                }
                else if(handTested.length === 3 && handTested[2] === 's' && action === bettingOptions)
                {
                    const tempCombos = getCombos;
                    setCombos(tempCombos - 4);
                }
                else if(action === bettingOptions){
                    const tempCombos = getCombos;
                    setCombos(tempCombos - 12);
                }

                let filteredHandRange = getHandHandler.filter(function(hand){ return hand !== handTested});

                setHandHandler(filteredHandRange);
            }
            else
            {
                if(handTested.length === 2 && handTested[0] === handTested[1] && action === bettingOptions) {
                    const tempCombos = getCombos;
                    setCombos(tempCombos + 4);
                }
                else if(handTested.length === 3 && handTested[2] === 's' && action === bettingOptions)
                {
                    const tempCombos = getCombos;
                    setCombos(tempCombos + 4);
                }
                else if(action === bettingOptions){
                    const tempCombos = getCombos;
                    setCombos(tempCombos + 12);
                }

                setHandHandler([...getHandHandler, handTested]);
            }        
        }
    }

    const onHandClickHandler = (e) => {
        checkBettingOption("raise4betCall", raise4betCall, 
                            setRaise4betCall, e.target.name, 
                            raise4BetCallCombos, setRaise4BetCallCombos); 
        checkBettingOption("raise4betFold", raise4betFold, setRaise4betFold, e.target.name,
                            raise4BetFoldCombos, setRaise4BetFoldCombos,); 
        checkBettingOption("raiseCall", raiseCall, setRaiseCall, e.target.name,
                            raiseCallCombos, setRaiseCallCombos); 
        checkBettingOption("raiseFold", raiseFold, setRaiseFold, e.target.name,
                            raiseFoldCombos, setRaiseFoldCombos); 
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
        let newRaise4betCall = (PRANGEraise4betCall.length !== 0) ? PRANGEraise4betCall : null;
        let newRaise4betFold = (PRANGEraise4betFold.length !== 0) ? PRANGEraise4betFold : null;
        let newRaiseCall = (PRANGEraiseCall.length !== 0) ? PRANGEraiseCall : null;
        let newRaiseFold = (PRANGEraiseFold.length !== 0) ? PRANGEraiseFold : null;
        let newData = {"params": {
            "RangeName": handRangeName, 
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

    const loadUserRange = async (e, props) => {
        console.log("userRanges", userRanges);
        console.log("userRangespropsvalue", props.value);
        setSelectedRange(props.value);
        setRaise4betCall((userRanges[props.value].RangeScope) ? prange(userRanges[props.value].RangeScope) : [] );
        setRaise4betFold((userRanges[props.value].RangeScope) ? prange(userRanges[props.value].RangeScope) : [] );
        setRaiseCall((userRanges[props.value].RangeScope) ? prange(userRanges[props.value].RangeScope) : [] );
        setRaiseFold((userRanges[props.value].RangeScope) ? prange(userRanges[props.value].RangeScope) : [] );

    }

    const loadUserFolder = (event, props) => {
        console.log("userFolderSet", event.target);
        console.log("userFolderSetProps", props);
        setSelectedFolder(props.value);
        // setRaise4betCall((userRanges[props.value].RangeScopes[0]) ? prange(userRanges[props.value].RangeScopes[0]) : [] );
        // setRaise4betFold((userRanges[props.value].RangeScopes[1]) ? prange(userRanges[props.value].RangeScopes[1]) : [] );
        // setRaiseCall((userRanges[props.value].RangeScopes[2]) ? prange(userRanges[props.value].RangeScopes[2]) : [] );
        // setRaiseFold((userRanges[props.value].RangeScopes[3]) ? prange(userRanges[props.value].RangeScopes[3]) : [] );

    }
    const loadUserGroup = (event, props) => {
        console.log("userRanges", userRanges);
        setSelectedGroup(props.value);

    }
    const handleRangeNameFolderChange = (event, props) => {
        setSelectedFolder(event.target.value);
    }
    const handleRangeNameGroupChange = (event) => {
        //setHandRangeName(event.target.value)
    }
    const handleRangeNameChange = (event) => {
        setHandRangeName(event.target.value)
    }

    const createFolderHandler = () => {
        console.log("selectedFolder", selectedFolder);
        dispatch(hrActions.createHRF(selectedFolder));
    };

    const editFolderHandler = () => {
        dispatch(hrActions.editHRF(selectedFolder));
    };

    return (
        <MainContainer>
            <Row>
                <Col>
                <Board onHandClick={onHandClickHandler} classColor={classColorHandler} optionsState={bettingOptions}></Board>
                </Col>
                <Col><BoardLegend range0Combos={raise4BetCallCombos} range1Combos={raise4BetFoldCombos} range2Combos={raiseCallCombos} 
                                  range3Combos={raiseFoldCombos} range0Percent={raise4BetCallPercent}
                                  range1Percent={raise4BetFoldPercent} range2Percent={raiseCallPercent}
                                  range3Percent={raiseFoldPercent} range0PercentAll={raise4BetCallPercentAll}
                                  range1PercentAll={raise4BetFoldPercentAll} range2PercentAll={raiseCallPercentAll}
                                  range3PercentAll={raiseFoldPercentAll}></BoardLegend></Col>
            </Row>
            <Range bettingOptions={initBettingOptions} onChangeHandler={bettingOptionsHandler}></Range><br></br>
            <div>Raise 4bet Call Range: <span onChange={onRaise4BetCallHandler.bind(this)}>{PRANGEraise4betCall}</span></div>
            <div>Raise 4bet Fold Range: <span onChange={onRaise4BetFoldHandler.bind(this)}>{PRANGEraise4betFold}</span></div>
            <div>Raise Call Range: <span onChange={onRaiseCallHandler.bind(this)}>{PRANGEraiseCall}</span></div>
            <div>Raise Fold Range: <span onChange={onRaiseFoldHandler.bind(this)}>{PRANGEraiseFold}</span></div>
            <Button onClick={saveToServerHandler}>Save Range To Server</Button>
            <div>{text}</div>
            <div>Folder Options: <Range bettingOptions={currentUserFolders} onChangeHandler={loadUserFolder.bind(this)} /> 
            <input type="text" name="handRangeFolderName" onChange={handleRangeNameFolderChange.bind(this)} /></div>
            <Button onClick={createFolderHandler}>Create Folder</Button>
            <Button onClick={editFolderHandler}>{(selectedFolder) ? "Edit Folder Name" : "Select a Folder Name First" }</Button><br></br>
            <div>Group Options: <Range bettingOptions={currentUserGroups} onChangeHandler={loadUserGroup.bind(this)} /> 
            <input type="text" name="handRangeGroupName" onChange={handleRangeNameGroupChange.bind(this)} /></div>
            <Button>{(selectedFolder) ? "Add Group to " + selectedFolder : "Pick a Folder First"}</Button>
            <Button>{(selectedGroup) ? "Edit Group Name" : "Select a Group Name First" }</Button><br></br>
            <div>Hand Range Options: <Range bettingOptions={currentUserRanges} onChangeHandler={loadUserRange.bind(this)} /> 
            <input type="text" name="handRangeName" onChange={handleRangeNameChange.bind(this)} /></div>
            <Button>{(selectedGroup) ? "Add Range to " + selectedGroup : "Pick a Group First"}</Button>
            <Button>{(selectedRange) ? "Edit Range Name" : "Select a Range Name First" }</Button><br></br>
        </MainContainer>
    );
};

export default MainPage;