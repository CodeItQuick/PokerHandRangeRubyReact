import React from "react";
import { Label, Radio, Form } from "semantic-ui-react";
import styled from "styled-components";

const PositionField = styled(Form.Field)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const PositionComponent = ({ position, setPosition, componentLabel }) => {
  return (
    <PositionField>
      <Label>{componentLabel}</Label>
      {componentLabel === "Open" ? (
        <Radio
          label="UTG"
          name={"position" && componentLabel}
          value="UTG"
          checked={position === "UTG"}
          onChange={() => setPosition("UTG")}
        />
      ) : null}
      <Radio
        label="MP"
        name={"position" && componentLabel}
        value="MP"
        checked={position === "MP"}
        onChange={() => setPosition("MP")}
      />
      <Radio
        label="CO"
        name={"position" && componentLabel}
        value="CO"
        checked={position === "CO"}
        onChange={() => setPosition("CO")}
      />
      <Radio
        label="BU"
        name={"position" && componentLabel}
        value="BU"
        checked={position === "BU"}
        onChange={() => setPosition("BU")}
      />
      <Radio
        label="SB"
        name={"position" && componentLabel}
        value="SB"
        checked={position === "SB"}
        onChange={() => setPosition("SB")}
      />
      {componentLabel === "Defend" ? (
        <Radio
          label="BB"
          name={"position" && componentLabel}
          value="BB"
          checked={position === "BB"}
          onChange={() => setPosition("BB")}
        />
      ) : null}
    </PositionField>
  );
};

export default PositionComponent;
