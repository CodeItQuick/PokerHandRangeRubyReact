const ranges = [
  {
    Street: "Preflop",
    BetType: "Raise4BetCall",
    hands: [],
  },
  {
    Street: "Preflop",
    BetType: "Raise4BetFold",
    hands: [],
  },
  {
    Street: "Preflop",
    BetType: "RaiseCall",
    hands: [],
  },
  {
    Street: "Preflop",
    BetType: "RaiseFold",
    hands: [],
  },
  {
    Street: "Flop",
    BetType: "Valuebet",
    hands: [],
  },
  {
    Street: "Flop",
    BetType: "Bluff",
    hands: [],
  },
  {
    Street: "Flop",
    BetType: "CheckCall",
    hands: [],
  },
  {
    Street: "Flop",
    BetType: "CheckFold",
    hands: [],
  },
  {
    Street: "Flop",
    BetType: "SmallValuebet",
    hands: [],
  },
  {
    Street: "Flop",
    BetType: "SmallBluff",
    hands: [],
  },
  {
    Street: "Turn",
    BetType: "Valuebet",
    hands: [],
  },
  {
    Street: "Turn",
    BetType: "Bluff",
    hands: [],
  },
  {
    Street: "Turn",
    BetType: "CheckCall",
    hands: [],
  },
  {
    Street: "Turn",
    BetType: "CheckFold",
    hands: [],
  },
  {
    Street: "River",
    BetType: "Valuebet",
    hands: [],
  },
  {
    Street: "River",
    BetType: "Bluff",
    hands: [],
  },
  {
    Street: "River",
    BetType: "CheckCall",
    hands: [],
  },
  {
    Street: "River",
    BetType: "CheckFold",
    hands: [],
  },
];
const sampleData = {
  mode: {
    street: "Preflop",
    streetAction: "Raise4BetCall",
    suitSelection: [],
    isIP: true,
    useTwoFlopSizes: false,
  },
  rangeSelectionArray: {
    folderID: "Evan's Second Folder",
    folderSubgroupName: "Opening Ranges",
    folderSubgroupRangeName: "UTG",
  },
  rangeColors: {
    0: [],
    1: [],
    2: [],
    3: [],
  },
  rangeRepoIP: JSON.parse(JSON.stringify(ranges)),
  rangeRepoOOP: JSON.parse(JSON.stringify(ranges)),
  helpChat: {
    messageVersion: "1.0",
    invocationSource: "DialogCodeHook",
    userId: "c6ff70c5-c315-4300-a817-5c0a17a01fa4",
    sessionAttributes: {},
    bot: {
      name: "InteractiveMessageBot",
      alias: "$LATEST",
      version: "$LATEST",
    },
    outputDialogMode: "Text",
    currentIntent: {
      name: "InteractiveMessageIntent",
      slots: {
        action: null,
        department: null,
        interactiveOption: null,
      },
      confirmationStatus: "None",
    },
    inputTranscript: "help",
    recentIntentSummaryView: null,
    message: { content: null, contentType: null },
    slotToElicit: "",
  },
};

export { sampleData, ranges };
