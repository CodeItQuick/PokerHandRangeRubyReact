class Scenario {
  constructor({ board, ScenarioName, DefenderPosition, OpenerPosition }) {
    this.deadcards = board;
    this.ScenarioName = ScenarioName;
    this.OpenerPosition = OpenerPosition;
    this.DefenderPosition = DefenderPosition;
  }

  getDeadcards() {
    return this.deadcards;
  }
  getOpenerPosition() {
    return this.OpenerPosition;
  }
  getDefenderPosition() {
    return this.DefenderPosition;
  }
  getScenarioName() {
    return this.ScenarioName;
  }
}

export default Scenario;
