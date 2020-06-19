import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const selectUser = state => state.user;

const makeSelectUser = () => createSelector(selectUser, userState => userState);

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

const makeSelectMenu = slug =>
  createSelector(selectGlobal, globalState => globalState.menus[slug]);

export {
  selectGlobal,
  selectRouter,
  selectUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectMenu,
  makeSelectUser
};
