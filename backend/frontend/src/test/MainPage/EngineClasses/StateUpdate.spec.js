import { initialState } from "./../../../containers/MainPage/reducer";
import StartingHandGrid, {
  buildHandColorMap,
} from "./../../../containers/MainPage/EngineClasses/StateUpdate";
import { StartingHandBuilder } from "../../../containers/MainPage/EngineClasses/StartingHandBuilder";
import { HandRangeCollection } from "../../../containers/MainPage/EngineClasses/HandRangeCollection";
import { expect } from "chai";

const CardTable = [
  [
    new StartingHandBuilder().build("A", "A", ""),
    new StartingHandBuilder().build("A", "K", "s"),
    new StartingHandBuilder().build("A", "Q", "s"),
    new StartingHandBuilder().build("A", "J", "s"),
    new StartingHandBuilder().build("A", "T", "s"),
    new StartingHandBuilder().build("A", "9", "s"),
    new StartingHandBuilder().build("A", "8", "s"),
    new StartingHandBuilder().build("A", "7", "s"),
    new StartingHandBuilder().build("A", "6", "s"),
    new StartingHandBuilder().build("A", "5", "s"),
    new StartingHandBuilder().build("A", "4", "s"),
    new StartingHandBuilder().build("A", "3", "s"),
    new StartingHandBuilder().build("A", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "K", "o"),
    new StartingHandBuilder().build("K", "K", ""),
    new StartingHandBuilder().build("K", "Q", "s"),
    new StartingHandBuilder().build("K", "J", "s"),
    new StartingHandBuilder().build("K", "T", "s"),
    new StartingHandBuilder().build("K", "9", "s"),
    new StartingHandBuilder().build("K", "8", "s"),
    new StartingHandBuilder().build("K", "7", "s"),
    new StartingHandBuilder().build("K", "6", "s"),
    new StartingHandBuilder().build("K", "5", "s"),
    new StartingHandBuilder().build("K", "4", "s"),
    new StartingHandBuilder().build("K", "3", "s"),
    new StartingHandBuilder().build("K", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "Q", "o"),
    new StartingHandBuilder().build("K", "Q", "o"),
    new StartingHandBuilder().build("Q", "Q", ""),
    new StartingHandBuilder().build("Q", "J", "s"),
    new StartingHandBuilder().build("Q", "T", "s"),
    new StartingHandBuilder().build("Q", "9", "s"),
    new StartingHandBuilder().build("Q", "8", "s"),
    new StartingHandBuilder().build("Q", "7", "s"),
    new StartingHandBuilder().build("Q", "6", "s"),
    new StartingHandBuilder().build("Q", "5", "s"),
    new StartingHandBuilder().build("Q", "4", "s"),
    new StartingHandBuilder().build("Q", "3", "s"),
    new StartingHandBuilder().build("Q", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "J", "o"),
    new StartingHandBuilder().build("K", "J", "o"),
    new StartingHandBuilder().build("Q", "J", "o"),
    new StartingHandBuilder().build("J", "J", ""),
    new StartingHandBuilder().build("J", "T", "s"),
    new StartingHandBuilder().build("J", "9", "s"),
    new StartingHandBuilder().build("J", "8", "s"),
    new StartingHandBuilder().build("J", "7", "s"),
    new StartingHandBuilder().build("J", "6", "s"),
    new StartingHandBuilder().build("J", "5", "s"),
    new StartingHandBuilder().build("J", "4", "s"),
    new StartingHandBuilder().build("J", "3", "s"),
    new StartingHandBuilder().build("J", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "T", "o"),
    new StartingHandBuilder().build("K", "T", "o"),
    new StartingHandBuilder().build("Q", "T", "o"),
    new StartingHandBuilder().build("J", "T", "o"),
    new StartingHandBuilder().build("T", "T", ""),
    new StartingHandBuilder().build("T", "9", "s"),
    new StartingHandBuilder().build("T", "8", "s"),
    new StartingHandBuilder().build("T", "7", "s"),
    new StartingHandBuilder().build("T", "6", "s"),
    new StartingHandBuilder().build("T", "5", "s"),
    new StartingHandBuilder().build("T", "4", "s"),
    new StartingHandBuilder().build("T", "3", "s"),
    new StartingHandBuilder().build("T", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "9", "o"),
    new StartingHandBuilder().build("K", "9", "o"),
    new StartingHandBuilder().build("Q", "9", "o"),
    new StartingHandBuilder().build("J", "9", "o"),
    new StartingHandBuilder().build("T", "9", "o"),
    new StartingHandBuilder().build("9", "9", ""),
    new StartingHandBuilder().build("9", "8", "s"),
    new StartingHandBuilder().build("9", "7", "s"),
    new StartingHandBuilder().build("9", "6", "s"),
    new StartingHandBuilder().build("9", "5", "s"),
    new StartingHandBuilder().build("9", "4", "s"),
    new StartingHandBuilder().build("9", "3", "s"),
    new StartingHandBuilder().build("9", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "8", "o"),
    new StartingHandBuilder().build("K", "8", "o"),
    new StartingHandBuilder().build("Q", "8", "o"),
    new StartingHandBuilder().build("J", "8", "o"),
    new StartingHandBuilder().build("T", "8", "o"),
    new StartingHandBuilder().build("9", "8", "o"),
    new StartingHandBuilder().build("8", "8", ""),
    new StartingHandBuilder().build("8", "7", "s"),
    new StartingHandBuilder().build("8", "6", "s"),
    new StartingHandBuilder().build("8", "5", "s"),
    new StartingHandBuilder().build("8", "4", "s"),
    new StartingHandBuilder().build("8", "3", "s"),
    new StartingHandBuilder().build("8", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "7", "o"),
    new StartingHandBuilder().build("K", "7", "o"),
    new StartingHandBuilder().build("Q", "7", "o"),
    new StartingHandBuilder().build("J", "7", "o"),
    new StartingHandBuilder().build("T", "7", "o"),
    new StartingHandBuilder().build("9", "7", "o"),
    new StartingHandBuilder().build("8", "7", "o"),
    new StartingHandBuilder().build("7", "7", ""),
    new StartingHandBuilder().build("7", "6", "s"),
    new StartingHandBuilder().build("7", "5", "s"),
    new StartingHandBuilder().build("7", "4", "s"),
    new StartingHandBuilder().build("7", "3", "s"),
    new StartingHandBuilder().build("7", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "6", "o"),
    new StartingHandBuilder().build("K", "6", "o"),
    new StartingHandBuilder().build("Q", "6", "o"),
    new StartingHandBuilder().build("J", "6", "o"),
    new StartingHandBuilder().build("T", "6", "o"),
    new StartingHandBuilder().build("9", "6", "o"),
    new StartingHandBuilder().build("8", "6", "o"),
    new StartingHandBuilder().build("7", "6", "o"),
    new StartingHandBuilder().build("6", "6", ""),
    new StartingHandBuilder().build("6", "5", "s"),
    new StartingHandBuilder().build("6", "4", "s"),
    new StartingHandBuilder().build("6", "3", "s"),
    new StartingHandBuilder().build("6", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "5", "o"),
    new StartingHandBuilder().build("K", "5", "o"),
    new StartingHandBuilder().build("Q", "5", "o"),
    new StartingHandBuilder().build("J", "5", "o"),
    new StartingHandBuilder().build("T", "5", "o"),
    new StartingHandBuilder().build("9", "5", "o"),
    new StartingHandBuilder().build("8", "5", "o"),
    new StartingHandBuilder().build("7", "5", "o"),
    new StartingHandBuilder().build("6", "5", "o"),
    new StartingHandBuilder().build("5", "5", ""),
    new StartingHandBuilder().build("5", "4", "s"),
    new StartingHandBuilder().build("5", "3", "s"),
    new StartingHandBuilder().build("5", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "4", "o"),
    new StartingHandBuilder().build("K", "4", "o"),
    new StartingHandBuilder().build("Q", "4", "o"),
    new StartingHandBuilder().build("J", "4", "o"),
    new StartingHandBuilder().build("T", "4", "o"),
    new StartingHandBuilder().build("9", "4", "o"),
    new StartingHandBuilder().build("8", "4", "o"),
    new StartingHandBuilder().build("7", "4", "o"),
    new StartingHandBuilder().build("6", "4", "o"),
    new StartingHandBuilder().build("5", "4", "o"),
    new StartingHandBuilder().build("4", "4", ""),
    new StartingHandBuilder().build("4", "3", "s"),
    new StartingHandBuilder().build("4", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "3", "o"),
    new StartingHandBuilder().build("K", "3", "o"),
    new StartingHandBuilder().build("Q", "3", "o"),
    new StartingHandBuilder().build("J", "3", "o"),
    new StartingHandBuilder().build("T", "3", "o"),
    new StartingHandBuilder().build("9", "3", "o"),
    new StartingHandBuilder().build("8", "3", "o"),
    new StartingHandBuilder().build("7", "3", "o"),
    new StartingHandBuilder().build("6", "3", "o"),
    new StartingHandBuilder().build("5", "3", "o"),
    new StartingHandBuilder().build("4", "3", "o"),
    new StartingHandBuilder().build("3", "3", ""),
    new StartingHandBuilder().build("3", "2", "s"),
  ],
  [
    new StartingHandBuilder().build("A", "2", "o"),
    new StartingHandBuilder().build("K", "2", "o"),
    new StartingHandBuilder().build("Q", "2", "o"),
    new StartingHandBuilder().build("J", "2", "o"),
    new StartingHandBuilder().build("T", "2", "o"),
    new StartingHandBuilder().build("9", "2", "o"),
    new StartingHandBuilder().build("8", "2", "o"),
    new StartingHandBuilder().build("7", "2", "o"),
    new StartingHandBuilder().build("6", "2", "o"),
    new StartingHandBuilder().build("5", "2", "o"),
    new StartingHandBuilder().build("4", "2", "o"),
    new StartingHandBuilder().build("3", "2", "o"),
    new StartingHandBuilder().build("2", "2", ""),
  ],
];
describe("State Update Functions", () => {
  it(" generate CardGrid generates an empty object when given an empty range", () => {
    const preflopRanges = JSON.parse(JSON.stringify(initialState.ranges));
    const position = initialState.mode.isIP;
    const handColorMap = buildHandColorMap(preflopRanges, position);

    expect(handColorMap).to.deep.equal({});
  });

  it(" generate CardGrid generates an AA object when given an AA range", () => {
    let preflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let aaHand = new StartingHandBuilder().build("A", "A");
    preflopRanges[0].hands = [aaHand];
    const position = initialState.mode.isIP;
    const handColorMap = buildHandColorMap(preflopRanges, position);

    expect(handColorMap).to.deep.equal({
      AA: {
        colorCards: [
          "#0F6125",
          "#ed87a7",
          "#3ac0ff",
          "#dc73ff",
          "#003d3e",
          "#8A4000",
        ][0],
        equity: "n/a",
      },
    });
  });

  it(" generate CardGrid generates an AA object when given an AA range", () => {
    let preflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let aaHand = new StartingHandBuilder().build("A", "A");
    preflopRanges[1].hands = [aaHand];
    const position = initialState.mode.isIP;
    const handColorMap = buildHandColorMap(preflopRanges, position);

    expect(handColorMap).to.deep.equal({
      AA: {
        colorCards: ["#0F6125", "#ed87a7", "#6b6c7c", "#d3d3d3"][1],
        equity: "n/a",
      },
    });
  });

  it(" generate CardGrid generates an AA object when given an AA range", () => {
    let preflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let aaHand = new StartingHandBuilder().build("A", "A");
    preflopRanges[2].hands = [aaHand];
    const position = initialState.mode.isIP;
    const handColorMap = buildHandColorMap(preflopRanges, position);

    expect(handColorMap).to.deep.equal({
      AA: {
        colorCards: [
          "#0F6125",
          "#ed87a7",
          "#3ac0ff",
          "#dc73ff",
          "#003d3e",
          "#8A4000",
        ][2],
        equity: "n/a",
      },
    });
  });

  it(" generate CardGrid generates an AA object when given an AA range", () => {
    let preflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street === "Preflop"
    );
    let aaHand = new StartingHandBuilder().build("A", "A");
    preflopRanges[3].hands = [aaHand];
    const position = initialState.mode.isIP;
    const handColorMap = buildHandColorMap(preflopRanges, position);

    expect(handColorMap).to.deep.equal({
      AA: {
        colorCards: [
          "#0F6125",
          "#ed87a7",
          "#3ac0ff",
          "#dc73ff",
          "#003d3e",
          "#8A4000",
        ][3],
        equity: "n/a",
      },
    });
  });

  it(" generates a StartingHandGrid when instantiated and called", () => {
    const startingHandGrid = new StartingHandGrid();
    const handGrid = startingHandGrid.generateHandGrid();

    expect(handGrid).to.deep.equal(CardTable);
  });
  it(" can be updated to generate a new board", () => {
    let startingHandGrid = new StartingHandGrid();
    const preflopRanges = new HandRangeCollection(initialState.ranges);
    const selectedRanges = preflopRanges.getRangesForStreet({
      Street: "Flop",
      useTwoFlopSizes: false,
    });
    Object.assign(selectedRanges[0], {
      startingHands: [new StartingHandBuilder().build("A", "A")],
    });

    startingHandGrid.updateCardGrid(preflopRanges, selectedRanges);
    const handGrid = startingHandGrid.generateHandGrid();

    expect(handGrid).to.deep.equal(CardTable);
  });
});
