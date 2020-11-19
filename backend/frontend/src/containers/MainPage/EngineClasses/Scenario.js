class Scenario {
  constructor({ board, ScenarioName, DefenderPosition, OpenerPosition }) {
    this.deadcards = board;
    this.ScenarioName = ScenarioName;
    this.OpenerPosition = OpenerPosition;
    this.DefenderPosition = DefenderPosition;
  }

  displayDeadcards() {
    return this.deadcards;
  }
  displayOpenerPosition() {
    return this.OpenerPosition;
  }
  displayDefenderPosition() {
    return this.DefenderPosition;
  }
  displayScenarioName() {
    return this.ScenarioName;
  }
}

export default Scenario;
