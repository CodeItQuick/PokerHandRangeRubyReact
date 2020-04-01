/**
 * The User state selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectUser = state => state.user || initialState;

const selectRouter = state => state.router;

const makeSelectLoading = () =>
  createSelector(selectUser, userState => userState.loading);

const makeSelectError = () =>
  createSelector(selectUser, userState => userState.error);

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState => routerState.location);

const makeSelectToken = () =>
  createSelector(selectUser, userState => userState.token);

const makeSelectUser = () =>
  createSelector(selectUser, userState => userState.data);

export {
  selectUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectToken,
  makeSelectUser
};
