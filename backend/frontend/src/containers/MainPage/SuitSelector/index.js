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

  const onSuitSelectHandler = (e, { assignedsuit }) => {
    dispatch(changeModeSuitSelection(assignedsuit));
  };
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
                  assignedsuit="ss"
                  active={(suitSelection || []).indexOf("ss") >= 0}
                >
                  Spade Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="sc"
                  active={(suitSelection || []).indexOf("sc") >= 0}
                >
                  Spade Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="sd"
                  active={(suitSelection || []).indexOf("sd") >= 0}
                >
                  Spade Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="sh"
                  active={(suitSelection || []).indexOf("sh") >= 0}
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
                  assignedsuit="cs"
                  active={(suitSelection || []).indexOf("cs") >= 0}
                >
                  Club Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="cc"
                  active={(suitSelection || []).indexOf("cc") >= 0}
                >
                  Club Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="cd"
                  active={(suitSelection || []).indexOf("cd") >= 0}
                >
                  Club Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="ch"
                  active={(suitSelection || []).indexOf("ch") >= 0}
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
                  assignedsuit="ds"
                  active={(suitSelection || []).indexOf("ds") >= 0}
                >
                  Diamond Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="dc"
                  active={(suitSelection || []).indexOf("dc") >= 0}
                >
                  Diamond Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="dd"
                  active={(suitSelection || []).indexOf("dd") >= 0}
                >
                  Diamond Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="dh"
                  active={(suitSelection || []).indexOf("dh") >= 0}
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
                  assignedsuit="hs"
                  active={(suitSelection || []).indexOf("hs") >= 0}
                >
                  Heart Spade
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="hc"
                  active={(suitSelection || []).indexOf("hc") >= 0}
                >
                  Heart Club
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="hd"
                  active={(suitSelection || []).indexOf("hd") >= 0}
                >
                  Heart Diamond
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color="blue"
                  onClick={onSuitSelectHandler}
                  assignedsuit="hh"
                  active={(suitSelection || []).indexOf("hh") >= 0}
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
