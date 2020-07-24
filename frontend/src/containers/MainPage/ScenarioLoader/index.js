import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Icon, Button } from "semantic-ui-react";

const ScenarioLoader = ({ active, onCloseModal }) => {
  return (
    <Modal onHide={onCloseModal} show={active} size="medium">
      <Modal.Header>
        <Modal.Title>Select a Scenario</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button onClick={onCloseModal}>Close</Button>
        <Button onClick={onCloseModal}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScenarioLoader;
