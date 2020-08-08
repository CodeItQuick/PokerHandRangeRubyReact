class Scenario {
  constructor(board, rangeRepoIP, rangeRepoOOP, user = "evan") {
    this.deadcards = board;
    this.rangeRepoIP = rangeRepoIP;
    this.rangeRepoOOP = rangeRepoOOP;
    this.user = user;
  }

  displayScenario() {
    return this.deadcards;
  }
}

export default Scenario;
