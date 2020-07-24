import React from "react";
import { Segment, Step, Icon } from "semantic-ui-react";

const ProgressIndicator = ({ street, handsIPUsed, handsOOPUsed }) => {
  return (
    <Segment inverted stacked size="tiny">
      <Step.Group fluid size="tiny">
        <Step completed={handsIPUsed}>
          <Icon name="thumbs down" color="red" />
          <Step.Content>
            <Step.Description>IP Selected on {street}</Step.Description>
          </Step.Content>
        </Step>
        <Step completed={handsOOPUsed}>
          <Icon name="thumbs down" color="red" />
          <Step.Content>
            <Step.Description>OOP Selected on {street}</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </Segment>
  );
};

export default ProgressIndicator;
