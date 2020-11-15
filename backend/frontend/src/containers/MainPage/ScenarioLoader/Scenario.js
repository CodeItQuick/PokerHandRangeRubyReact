class Scenario {
  constructor({
    board,
    rangeRepoIP,
    rangeRepoOOP,
    user = "default",
    ScenarioName,
    DefenderPosition,
    OpenerPosition,
  }) {
    this.deadcards = board;
    this.rangeRepoIP = rangeRepoIP;
    this.rangeRepoOOP = rangeRepoOOP;
    this.user = user;
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
