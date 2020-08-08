import React, { memo, useState, useEffect } from "react";

import { connect } from "react-redux";
import { compose } from "redux";

import { Table, Button } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeModeSuitSelection } from "../actions";
import { makeSelectMode } from "../selectors";

const SuitSelection = ({ mode: { suitSelection }, open, onCloseHandler }) => {
  const dispatch = useDispatch();
  const [opens, setOpens] = useState(open);

  useEffect(() => {
    setOpens(open);
  }, [open]);

  const onSuitSelectHandler = (e, { assignedSuit }) =>
    dispatch(changeModeSuitSelection(assignedSuit));

  return (
    <Modal
      show={opens}
      onHide={() => {
        onCloseHandler();
        setOpens(false);
      }}
      size="lg"
    >
      <Modal.Header>Choose a Suit</Modal.Header>
      <Modal.Body>
        <Table celled padded>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Spade Spade"
                  active={(suitSelection || []).indexOf("Spade Spade") >= 0}
                >
                  Spade Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Spade Club"
                  active={(suitSelection || []).indexOf("Spade Club") >= 0}
                >
                  Spade Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Spade Diamond"
                  active={(suitSelection || []).indexOf("Spade Diamond") >= 0}
                >
                  Spade Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Spade Heart"
                  active={(suitSelection || []).indexOf("Spade Heart") >= 0}
                >
                  Spade Heart
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Club Spade"
                  active={(suitSelection || []).indexOf("Club Spade") >= 0}
                >
                  Club Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Club Club"
                  active={(suitSelection || []).indexOf("Club Club") >= 0}
                >
                  Club Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Club Diamond"
                  active={(suitSelection || []).indexOf("Club Diamond") >= 0}
                >
                  Club Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Club Heart"
                  active={(suitSelection || []).indexOf("Club Heart") >= 0}
                >
                  Club Heart
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Diamond Spade"
                  active={(suitSelection || []).indexOf("Diamond Spade") >= 0}
                >
                  Diamond Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Diamond Club"
                  active={(suitSelection || []).indexOf("Diamond Club") >= 0}
                >
                  Diamond Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Diamond Diamond"
                  active={(suitSelection || []).indexOf("Diamond Diamond") >= 0}
                >
                  Diamond Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Diamond Heart"
                  active={(suitSelection || []).indexOf("Diamond Heart") >= 0}
                >
                  Diamond Heart
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Heart Spade"
                  active={(suitSelection || []).indexOf("Heart Spade") >= 0}
                >
                  Heart Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Heart Club"
                  active={(suitSelection || []).indexOf("Heart Club") >= 0}
                >
                  Heart Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Heart Diamond"
                  active={(suitSelection || []).indexOf("Heart Diamond") >= 0}
                >
                  Heart Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedSuit="Heart Heart"
                  active={(suitSelection || []).indexOf("Heart Heart") >= 0}
                >
                  Heart Heart
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = () => {
  const getMode = makeSelectMode();

  const mapState = state => {
    return {
      mode: getMode(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(SuitSelection);
