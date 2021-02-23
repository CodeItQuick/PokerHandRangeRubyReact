import React, { Fragment, useState, useEffect, memo } from "react";

import { Menu, Item, Button, Dropdown, Icon, Modal } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  initGetAllScenario,
  initSaveScenario,
  changeUseOneFlopBetsize,
} from "../../containers/MainPage/actions";
import ScenarioLoader from "../../containers/MainPage/ScenarioLoader";
import {
  makeSelectMode,
  makeSelectSelectedStreet,
  makeSelectDeadcards,
  makeSelectRange,
} from "../../containers/MainPage/selectors";
import { compose } from "redux";
import {
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
} from "../../containers/MainPage/ProgressIndicator/selector";
import SaveModal from "./SaveModal";

const Navbar = ({
  isAuthenticated,
  loginWithRedirect,
  logout,
  user,
  token,
  deadcards,
  selectedRanges,
  rangeRepoIP,
  rangeRepoOOP,
  mode: { isIP, useTwoFlopSizes },
  updateTourOpen,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ active: false });
  const [isOpen, setIsOpen] = useState(false);

  const isOpenHandler = () => setIsOpen(!isOpen);

  const onCloseModal = () => {
    setState({
      active: false,
    });
  };

  const onSave = ({
    positionOpener,
    positionDefender,
    inputBoard,
    Filename,
  }) => {
    dispatch(
      initSaveScenario({
        token,
        deadcards: inputBoard.reduce((acc, curr) => acc + curr, ""),
        OpenerPosition: positionOpener,
        Filename,
        DefenderPosition: positionDefender,
        user: user || "default", //FIXME: shouldn't be here at all, not sure what it will break
        rangeRepoIP: isIP
          ? selectedRanges.map((range) => range.getRangesObject())
          : rangeRepoIP.map((range) => range.getRangesObject()),
        rangeRepoOOP: !isIP
          ? selectedRanges.map((range) => range.getRangesObject())
          : rangeRepoOOP.map((range) => range.getRangesObject()),
      })
    );
  };

  return (
    <Menu inverted>
      <Menu.Item>
        <Dropdown text="File">
          <Dropdown.Menu>
            <Dropdown.Item
              text="Open Scenario"
              onClick={() => {
                dispatch(initGetAllScenario(token));
                setState({ active: true });
              }}
            />
            <Dropdown.Item text="Save Scenario" onClick={isOpenHandler} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <SaveModal isOpen={isOpen} setIsOpen={isOpenHandler} onSave={onSave} />
      <Menu.Item>
        <Dropdown text="Edit">
          <Dropdown.Menu>
            <Dropdown.Item
              text={
                <>
                  {" "}
                  Use One Flop Betsize
                  {!useTwoFlopSizes ? <Icon name="checkmark" /> : ""}
                </>
              }
              onClick={() => dispatch(changeUseOneFlopBetsize(false))}
            />
            <Dropdown.Item
              text={
                <>
                  {" "}
                  {useTwoFlopSizes ? <Icon name="checkmark" /> : ""} Use Two
                  Flop Betsize
                </>
              }
              onClick={() => dispatch(changeUseOneFlopBetsize(true))}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Item>
        <Dropdown text="Tutorials">
          <Dropdown.Menu>
            <Dropdown.Item
              text="Quick Basic Tutorial"
              onClick={() => updateTourOpen(true)}
            />
          </Dropdown.Menu>
        </Dropdown>
        <ScenarioLoader
          active={state.active}
          onCloseModal={onCloseModal}
          token={token}
        />
      </Menu.Item>
      {isAuthenticated ? (
        <Fragment>
          <Menu.Item>{user.name || ""}</Menu.Item>
          <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item onClick={() => loginWithRedirect()}>Login</Menu.Item>
        </Fragment>
      )}
    </Menu>
  );
};

const mapStateToProps = () => {
  const getMode = makeSelectMode();
  const getSelectedStreet = makeSelectSelectedStreet();
  const getDeadcards = makeSelectDeadcards();
  const getRange = makeSelectRange();
  const getRangeRepoIP = makeSelectRangeRepoIP();
  const getRangeRepoOOP = makeSelectRangeRepoOOP();

  const mapState = (state) => {
    return {
      selectedRanges: getRange(state),
      rangeRepoIP: getRangeRepoIP(state),
      rangeRepoOOP: getRangeRepoOOP(state),
      mode: getMode(state),
      selectedStreet: getSelectedStreet(state),
      deadcards: getDeadcards(state),
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Navbar);
