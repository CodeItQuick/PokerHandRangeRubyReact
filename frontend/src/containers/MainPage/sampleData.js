const ranges = [
  {
    Street: "Preflop",
    BetType: "Raise4BetCall",
    hands: []
  },
  {
    Street: "Preflop",
    BetType: "Raise4BetFold",
    hands: []
  },
  {
    Street: "Preflop",
    BetType: "RaiseCall",
    hands: []
  },
  {
    Street: "Preflop",
    BetType: "RaiseFold",
    hands: []
  },
  {
    Street: "Flop",
    BetType: "Valuebet",
    hands: []
  },
  {
    Street: "Flop",
    BetType: "Bluff",
    hands: []
  },
  {
    Street: "Flop",
    BetType: "CheckCall",
    hands: []
  },
  {
    Street: "Flop",
    BetType: "CheckFold",
    hands: []
  },
  {
    Street: "Turn",
    BetType: "Valuebet",
    hands: []
  },
  {
    Street: "Turn",
    BetType: "Bluff",
    hands: []
  },
  {
    Street: "Turn",
    BetType: "CheckCall",
    hands: []
  },
  {
    Street: "Turn",
    BetType: "CheckFold",
    hands: []
  },
  {
    Street: "River",
    BetType: "Valuebet",
    hands: []
  },
  {
    Street: "River",
    BetType: "Bluff",
    hands: []
  },
  {
    Street: "River",
    BetType: "CheckCall",
    hands: []
  },
  {
    Street: "River",
    BetType: "CheckFold",
    hands: []
  }
];
const sampleData = {
  mode: {
    street: "Preflop",
    streetAction: "Raise4BetCall",
    isIP: true
  },
  rangeSelectionArray: {
    folderID: "Evan's Second Folder",
    folderSubgroupName: "Opening Ranges",
    folderSubgroupRangeName: "UTG"
  },
  rangeColors: {
    "0": [],
    "1": [],
    "2": [],
    "3": []
  },
  rangeRepoIP: JSON.parse(JSON.stringify(ranges)),
  rangeRepoOOP: [JSON.parse(JSON.stringify(ranges))]
};

export { sampleData, ranges };
