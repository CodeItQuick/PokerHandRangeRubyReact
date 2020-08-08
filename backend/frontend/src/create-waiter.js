import throttle from "lodash/throttle";
import { saveState } from "./localStorage";
import { initialState } from "./containers/MainPage/reducer";
import { createSelector } from "reselect";

const createWaiter = (store, stateSelector) => async () => {
  const state = stateSelector(store.getState());
  /* 
    as this method is called each time we mount our 
    compoment we need to return early when 
    our data has loaded
    */
  // if (!state.isLoading) {
  //   if (state.error != null) {
  //     throw state.error;
  //   }
  // }
  /* 
    if our data isn't ready then we can throw our 
    promise to kick us into the loading state
    */
  return await new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const state = stateSelector(store.getState());

      // resolve when our data has loaded or throw an Error
      //   if (!state.isLoading) {
      if (state.error != null) {
        store.setState("state", initialState);
        unsubscribe();
        return reject();
      }
      unsubscribe();
      return resolve;
      //   }
    });

    return createSelector(
      state => state,
      global => global
    );
  });
};

export { createWaiter };
