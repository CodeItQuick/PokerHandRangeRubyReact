import progressIndicatorReducer from "./../../../containers/MainPage/ProgressIndicator/reducer";
import { initialState } from "./../../../containers/MainPage/reducer";
import { expect } from "chai";

describe("MainPage reducer", () => {
  test("should return the initial state", function () {
    expect(progressIndicatorReducer(undefined, { type: {} })).to.equal(
      initialState
    );
  });

  test("When it is given the change IP action it changes state", () => {
    //Given

    //When
    const reducerObj = progressIndicatorReducer(undefined, {
      data: {
        position: true,
        newRangeOOP: undefined,
        newRangeIP: undefined,
        newRanges: undefined,
      },
    });

    //Then
    expect(reducerObj.mode.isIP).to.equal(true);
  });
});
