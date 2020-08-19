import React from "react";
import { Segment, Step, Icon, Button } from "semantic-ui-react";
import { setIsIP } from "../actions";
import { useDispatch } from "react-redux";

//TODO: Note testin code for this code is elsewhere
export const assignPositions = (
  rangeRepoIP,
  rangeRepoOOP,
  selectedRanges,
  value
) => {
  let newRanges, newRangeIP, newRangeOOP;
  if (value) {
    newRanges = rangeRepoIP.map(RangeObj => RangeObj.getRangesObject());
    newRangeIP = rangeRepoIP.map(RangeObj => RangeObj.getRangesObject());
    newRangeOOP = selectedRanges.map(RangeObj => RangeObj.getRangesObject());
  } else {
    newRanges = rangeRepoOOP.map(RangeObj => RangeObj.getRangesObject());
    newRangeIP = selectedRanges.map(RangeObj => RangeObj.getRangesObject());
    newRangeOOP = rangeRepoOOP.map(RangeObj => RangeObj.getRangesObject());
  }
  return [newRangeIP, newRangeOOP, newRanges];
};

const ProgressIndicator = ({
  isIP,
  rangeRepoIP,
  rangeRepoOOP,
  selectedRanges,
  handsIPUsed,
  handsOOPUsed
}) => {
  const dispatch = useDispatch();

  const onChangePosition = (e, { value }) => {
    let [newRangeIP, newRangeOOP, newRanges] = assignPositions(
      rangeRepoIP,
      rangeRepoOOP,
      selectedRanges,
      value
    );

    dispatch(
      setIsIP({
        position: value,
        newRangeIP,
        newRangeOOP,
        newRanges
      })
    );
  };
  return (
    <Step.Group fluid>
      <Step completed={handsIPUsed}>
        <Icon name="thumbs down" color="red" />
        <Step.Content>
          <Step.Description>
            <Button
              name="Position"
              value={true}
              active={isIP}
              inverted
              primary
              onClick={onChangePosition}
            >
              <strong>In Position</strong>
            </Button>
          </Step.Description>
        </Step.Content>
      </Step>
      <Step completed={handsOOPUsed}>
        <Icon name="thumbs down" color="red" />
        <Step.Content>
          <Step.Description>
            <Button
              name="Position"
              value={false}
              active={!isIP}
              inverted
              primary
              onClick={onChangePosition}
            >
              <strong>Out Of Position</strong>
            </Button>
          </Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default ProgressIndicator;
