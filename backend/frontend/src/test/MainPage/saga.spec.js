import reducer, { initialState } from "../../containers/MainPage/reducer";
import { initSaveScenario } from "../../containers/MainPage/actions";
import * as types from "../../containers/MainPage/constants";
import SagaTester from "redux-saga-tester";
import saga from "../../containers/MainPage/saga";
import nock from "nock";
import { expect } from "chai";

describe("MainPage saga", () => {
  describe("saveScenario", () => {
    it("does nothing when token is not provided", async () => {
      const sagaTester = new SagaTester({ initialState, reducers: reducer });
      sagaTester.start(saga);

      sagaTester.dispatch(
        initSaveScenario({
          deadcards: [],
          rangeRepoIP: [],
          rangeRepoOOP: [],
          user: "Evan",
          OpenerPosition: "CO",
          DefenderPosition: "BU",
          Filename: "test",
          token: null,
        })
      );

      const actions = sagaTester.getCalledActions();
      const sagaActions = actions.filter(
        (a) => a.type !== types.INIT_SAVE_SCENARIO
      );
      expect(sagaActions).to.deep.equal([]);
    });

    it("makes the HTTP POST when a token is provided", async () => {
      nock("http://www.poker-range-appalyzer.com")
        .post("/api/private/insert")
        .reply(200, {});

      const sagaTester = new SagaTester({ initialState, reducers: reducer });
      sagaTester.start(saga);

      sagaTester.dispatch(
        initSaveScenario({
          deadcards: [],
          rangeRepoIP: [],
          rangeRepoOOP: [],
          user: "Evan",
          OpenerPosition: "CO",
          DefenderPosition: "BU",
          Filename: "test",
          token: "dummy-token",
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(nock.isDone()).to.equal(true);
    });
  });
});
