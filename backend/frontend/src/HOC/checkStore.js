import invariant from "invariant";
import pkg from "lodash";
const { conformsTo, isFunction, isObject } = pkg;
/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };
  invariant(
    conformsTo(store, shape),
    "(app/utils...) injectors: Expected a valid redux store"
  );
}
