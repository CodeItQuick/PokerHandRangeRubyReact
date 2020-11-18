import React, { useState, useEffect, memo, Fragment } from "react";
import { useDispatch } from "react-redux";

import { Table } from "semantic-ui-react";
import { useGesture } from "react-use-gesture";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectSelectedStreet,
  makeSelectLoadEquities,
  makeSelectDeadcards,
  makeSelectOtherRange,
  makeSelectHandEquities,
  makeSelectMode,
  makeSelectRange,
  makeSelectRangesPreviousStreet,
} from "../selectors";

import BoardOfHands from "../EngineClasses/StateUpdate";

const isOnMouseDownEventPushed = ({ props }) =>
  (props.memo !== props.args[props.args.length - 1] && props.down) ||
  (props.first && props.down);

const Board = ({ onMouseOverHandler, SelectedRanges, preflopRanges }) => {
  const [manyHands, setManyHands] = useState();
  const [instanceOfBoardHands, updateInstanceOfBoardHands] = useState(false);

  // Set the drag hook and define component movement based on gesture data
  const bind = useGesture({
    onDrag: (props) =>
      onMouseOverHandler(
        {
          cards: props.args[props.args.length - 1],
          onMouseDownEvent: isOnMouseDownEventPushed({ props }),
        },
        { threshold: 40, filterTaps: false }
      ),
    onMove: (props) =>
      onMouseOverHandler(
        {
          cards: props.args[props.args.length - 1],
          onMouseDownEvent:
            (props.memo !== props.args[0] && props.down) ||
            (props.first && props.down),
        },
        { threshold: 40, delay: true }
      ),
  });

  useEffect(() => {
    if (!instanceOfBoardHands)
      updateInstanceOfBoardHands(new BoardOfHands(bind));

    //If there are new equities to be entered, dispatch the action
  }, [false, bind]);

  useEffect(() => {
    if (instanceOfBoardHands) {
      instanceOfBoardHands.updateCardGrid(preflopRanges, SelectedRanges);

      setManyHands(instanceOfBoardHands.view());
    }
    //If there are new equities to be entered, dispatch the action
  }, [instanceOfBoardHands, SelectedRanges, preflopRanges, bind]);

  return (
    <Table celled striped unstackable>
      {manyHands}
    </Table>
  ); //TO-DO: BUG this generates console error
};

const mapStateToProps = () => {
  const getRangesSelected = makeSelectSelectedStreet();
  const getLoadEquities = makeSelectLoadEquities();
  const getCards = makeSelectDeadcards();
  const getOtherRange = makeSelectOtherRange();
  const getHandEquities = makeSelectHandEquities();
  const getMode = makeSelectMode();
  const getRanges = makeSelectRange();
  const getRangesPreflop = makeSelectRangesPreviousStreet();

  const mapState = (state) => {
    return {
      SelectedRanges: getRangesSelected(state),
      ranges: getRanges(state),
      loadEquities: getLoadEquities(state),
      handEquities: getHandEquities(state),
      deadcards: getCards(state),
      otherRange: getOtherRange(state),
      mode: getMode(state),
      preflopRanges: getRangesPreflop(state),
    };
  };

  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Board);
