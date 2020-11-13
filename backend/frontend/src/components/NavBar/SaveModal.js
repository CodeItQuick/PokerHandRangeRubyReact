import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Input, Radio, Label, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import PositionComponent from "./PositionComponent";

const addSuits = (rank) =>
  ["c", "s", "h", "d"].map((suited) => {
    return {
      key: rank + suited,
      text: rank + suited,
      value: rank + suited,
    };
  });

const stateOptions = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
].reduce((acc, rank) => [...acc, ...addSuits(rank)], []);

const SaveModal = ({ isOpen, setIsOpen, onSave }) => {
  const [positionOpener, setPositionOpener] = useState("UTG");
  const [positionDefender, setPositionDefender] = useState("MP");
  const [inputBoard, updateInputBoard] = useState([]);
  const [Filename, updateFilename] = useState();

  return (
    <Modal show={isOpen} size="medium" onHide={setIsOpen}>
      <Form
        onSubmit={() =>
          onSave({ positionOpener, positionDefender, inputBoard, Filename })
        }
      >
        <Modal.Header>
          <Modal.Title>Save a Scenario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Field>
            <Input
              name="Filename"
              label="Filename"
              onChange={(_, { value }) => updateFilename(value)}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              name="saveBoard"
              placeholder="Choose three flop cards"
              fluid
              selection
              multiple
              search
              options={stateOptions}
              onChange={(_, { value }) => updateInputBoard(value)}
            />
          </Form.Field>
          <PositionComponent
            name="OpenerPostion"
            position={positionOpener}
            setPosition={setPositionOpener}
            componentLabel="Opener Position"
          />
          <PositionComponent
            name="DefendingPosition"
            position={positionDefender}
            setPosition={setPositionDefender}
            componentLabel="Defending Position"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={setIsOpen}>Close</Button>
          <Button type="submit">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveModal;
