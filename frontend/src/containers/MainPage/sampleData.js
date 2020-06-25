const sampleData = {
  mode: {
    street: "Preflop",
    streetAction: "Raise4BetCall"
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
  }
};

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

const rangeRepo = [
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Opening Ranges",
    Position: "UTG",
    ranges: ranges
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Opening Ranges",
    Position: "MP",
    ranges: ranges
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Opening Ranges",
    Position: "CO",
    ranges: [
      {
        Street: "Preflop",
        BetType: "Raise4BetCall",
        hands: []
      }
    ]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Opening Ranges",
    Position: "BU",
    ranges: [
      {
        Street: "Preflop",
        BetType: "Raise4BetCall",
        hands: []
      }
    ]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Opening Ranges",
    Position: "SB",
    ranges: [
      {
        Street: "Preflop",
        BetType: "Raise4BetCall",
        hands: []
      }
    ]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Defending Ranges",
    Position: "UTG",
    ranges: [{}]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Defending Ranges",
    Position: "MP",
    ranges: [{}]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Defending Ranges",
    Position: "CO",
    ranges: [
      {
        Street: "Preflop",
        BetType: "Raise4BetCall",
        hands: []
      }
    ]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Defending Ranges",
    Position: "BU",
    ranges: [
      {
        Street: "Preflop",
        BetType: "Raise4BetCall",
        hands: []
      }
    ]
  },
  {
    FolderName: "Evan's Second Folder",
    FolderGroupName: "Defending Ranges",
    Position: "SB",
    ranges: [
      {
        Street: "Preflop",
        BetType: "Raise4BetCall",
        hands: []
      }
    ]
  }
];

export { sampleData, ranges, rangeRepo };
