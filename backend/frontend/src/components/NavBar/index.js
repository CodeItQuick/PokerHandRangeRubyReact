import React, { Fragment, useState, useEffect, memo } from "react";

import { Menu, Item, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  initGetAllScenario,
  initSaveScenario
} from "../../containers/MainPage/actions";
import ScenarioLoader from "../../containers/MainPage/ScenarioLoader";
import {
  makeSelectMode,
  makeSelectSelectedStreet,
  makeSelectDeadcards,
  makeSelectRange,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP
} from "../../containers/MainPage/selectors";
import { compose } from "redux";

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
  mode: { isIP }
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ active: false });

  const onCloseModal = () => {
    setState({
      active: false
    });
  };
  return (
    <Menu inverted>
      <Menu.Item>
        <NavLink to="/">Home</NavLink>
        <Button
          inverted
          onClick={() => {
            dispatch(initGetAllScenario(token));
            setState({ active: true });
          }}
        >
          Open Saved Scenario
        </Button>
        <Button
          inverted
          onClick={() => {
            dispatch(
              initSaveScenario({
                token,
                deadcards: deadcards.toString(),
                user: "evan", //FIXME: shouldn't be here at all, not sure what it will break
                rangeRepoIP: isIP
                  ? selectedRanges.map(range => range.getRangesObject())
                  : rangeRepoIP.map(range => range.getRangesObject()),
                rangeRepoOOP: !isIP
                  ? selectedRanges.map(range => range.getRangesObject())
                  : rangeRepoOOP.map(range => range.getRangesObject())
              })
            );
          }}
        >
          Save Scenario
        </Button>
        <ScenarioLoader
          active={state.active}
          onCloseModal={onCloseModal}
          token={token}
        />
      </Menu.Item>
      {isAuthenticated ? (
        <Fragment>
          <Menu.Item>{user.name || ""}</Menu.Item>
          <Menu.Item>
            <Button onClick={() => logout()}>Logout</Button>
          </Menu.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          </Menu.Item>
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

  const mapState = state => {
    return {
      selectedRanges: getRange(state),
      rangeRepoIP: getRangeRepoIP(state),
      rangeRepoOOP: getRangeRepoOOP(state),
      mode: getMode(state),
      selectedStreet: getSelectedStreet(state),
      deadcards: getDeadcards(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Navbar);
