import { initialState } from "./../../../containers/MainPage/reducer";
import BoardOfHands, {
  generateCardGrid,
} from "./../../../containers/MainPage/EngineClasses/StateUpdate";
import { CardHandSuitBuilder } from "./../../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { RangeObjectCollection } from "./../../../containers/MainPage/EngineClasses/RangeObjectCollection.js";
import { expect } from "chai";

const CardTable = [
  [
    new CardHandSuitBuilder().build("A", "A", ""),
    new CardHandSuitBuilder().build("A", "K", "s"),
    new CardHandSuitBuilder().build("A", "Q", "s"),
    new CardHandSuitBuilder().build("A", "J", "s"),
    new CardHandSuitBuilder().build("A", "T", "s"),
    new CardHandSuitBuilder().build("A", "9", "s"),
    new CardHandSuitBuilder().build("A", "8", "s"),
    new CardHandSuitBuilder().build("A", "7", "s"),
    new CardHandSuitBuilder().build("A", "6", "s"),
    new CardHandSuitBuilder().build("A", "5", "s"),
    new CardHandSuitBuilder().build("A", "4", "s"),
    new CardHandSuitBuilder().build("A", "3", "s"),
    new CardHandSuitBuilder().build("A", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "K", "o"),
    new CardHandSuitBuilder().build("K", "K", ""),
    new CardHandSuitBuilder().build("K", "Q", "s"),
    new CardHandSuitBuilder().build("K", "J", "s"),
    new CardHandSuitBuilder().build("K", "T", "s"),
    new CardHandSuitBuilder().build("K", "9", "s"),
    new CardHandSuitBuilder().build("K", "8", "s"),
    new CardHandSuitBuilder().build("K", "7", "s"),
    new CardHandSuitBuilder().build("K", "6", "s"),
    new CardHandSuitBuilder().build("K", "5", "s"),
    new CardHandSuitBuilder().build("K", "4", "s"),
    new CardHandSuitBuilder().build("K", "3", "s"),
    new CardHandSuitBuilder().build("K", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "Q", "o"),
    new CardHandSuitBuilder().build("K", "Q", "o"),
    new CardHandSuitBuilder().build("Q", "Q", ""),
    new CardHandSuitBuilder().build("Q", "J", "s"),
    new CardHandSuitBuilder().build("Q", "T", "s"),
    new CardHandSuitBuilder().build("Q", "9", "s"),
    new CardHandSuitBuilder().build("Q", "8", "s"),
    new CardHandSuitBuilder().build("Q", "7", "s"),
    new CardHandSuitBuilder().build("Q", "6", "s"),
    new CardHandSuitBuilder().build("Q", "5", "s"),
    new CardHandSuitBuilder().build("Q", "4", "s"),
    new CardHandSuitBuilder().build("Q", "3", "s"),
    new CardHandSuitBuilder().build("Q", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "J", "o"),
    new CardHandSuitBuilder().build("K", "J", "o"),
    new CardHandSuitBuilder().build("Q", "J", "o"),
    new CardHandSuitBuilder().build("J", "J", ""),
    new CardHandSuitBuilder().build("J", "T", "s"),
    new CardHandSuitBuilder().build("J", "9", "s"),
    new CardHandSuitBuilder().build("J", "8", "s"),
    new CardHandSuitBuilder().build("J", "7", "s"),
    new CardHandSuitBuilder().build("J", "6", "s"),
    new CardHandSuitBuilder().build("J", "5", "s"),
    new CardHandSuitBuilder().build("J", "4", "s"),
    new CardHandSuitBuilder().build("J", "3", "s"),
    new CardHandSuitBuilder().build("J", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "T", "o"),
    new CardHandSuitBuilder().build("K", "T", "o"),
    new CardHandSuitBuilder().build("Q", "T", "o"),
    new CardHandSuitBuilder().build("J", "T", "o"),
    new CardHandSuitBuilder().build("T", "T", ""),
    new CardHandSuitBuilder().build("T", "9", "s"),
    new CardHandSuitBuilder().build("T", "8", "s"),
    new CardHandSuitBuilder().build("T", "7", "s"),
    new CardHandSuitBuilder().build("T", "6", "s"),
    new CardHandSuitBuilder().build("T", "5", "s"),
    new CardHandSuitBuilder().build("T", "4", "s"),
    new CardHandSuitBuilder().build("T", "3", "s"),
    new CardHandSuitBuilder().build("T", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "9", "o"),
    new CardHandSuitBuilder().build("K", "9", "o"),
    new CardHandSuitBuilder().build("Q", "9", "o"),
    new CardHandSuitBuilder().build("J", "9", "o"),
    new CardHandSuitBuilder().build("T", "9", "o"),
    new CardHandSuitBuilder().build("9", "9", ""),
    new CardHandSuitBuilder().build("9", "8", "s"),
    new CardHandSuitBuilder().build("9", "7", "s"),
    new CardHandSuitBuilder().build("9", "6", "s"),
    new CardHandSuitBuilder().build("9", "5", "s"),
    new CardHandSuitBuilder().build("9", "4", "s"),
    new CardHandSuitBuilder().build("9", "3", "s"),
    new CardHandSuitBuilder().build("9", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "8", "o"),
    new CardHandSuitBuilder().build("K", "8", "o"),
    new CardHandSuitBuilder().build("Q", "8", "o"),
    new CardHandSuitBuilder().build("J", "8", "o"),
    new CardHandSuitBuilder().build("T", "8", "o"),
    new CardHandSuitBuilder().build("9", "8", "o"),
    new CardHandSuitBuilder().build("8", "8", ""),
    new CardHandSuitBuilder().build("8", "7", "s"),
    new CardHandSuitBuilder().build("8", "6", "s"),
    new CardHandSuitBuilder().build("8", "5", "s"),
    new CardHandSuitBuilder().build("8", "4", "s"),
    new CardHandSuitBuilder().build("8", "3", "s"),
    new CardHandSuitBuilder().build("8", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "7", "o"),
    new CardHandSuitBuilder().build("K", "7", "o"),
    new CardHandSuitBuilder().build("Q", "7", "o"),
    new CardHandSuitBuilder().build("J", "7", "o"),
    new CardHandSuitBuilder().build("T", "7", "o"),
    new CardHandSuitBuilder().build("9", "7", "o"),
    new CardHandSuitBuilder().build("8", "7", "o"),
    new CardHandSuitBuilder().build("7", "7", ""),
    new CardHandSuitBuilder().build("7", "6", "s"),
    new CardHandSuitBuilder().build("7", "5", "s"),
    new CardHandSuitBuilder().build("7", "4", "s"),
    new CardHandSuitBuilder().build("7", "3", "s"),
    new CardHandSuitBuilder().build("7", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "6", "o"),
    new CardHandSuitBuilder().build("K", "6", "o"),
    new CardHandSuitBuilder().build("Q", "6", "o"),
    new CardHandSuitBuilder().build("J", "6", "o"),
    new CardHandSuitBuilder().build("T", "6", "o"),
    new CardHandSuitBuilder().build("9", "6", "o"),
    new CardHandSuitBuilder().build("8", "6", "o"),
    new CardHandSuitBuilder().build("7", "6", "o"),
    new CardHandSuitBuilder().build("6", "6", ""),
    new CardHandSuitBuilder().build("6", "5", "s"),
    new CardHandSuitBuilder().build("6", "4", "s"),
    new CardHandSuitBuilder().build("6", "3", "s"),
    new CardHandSuitBuilder().build("6", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "5", "o"),
    new CardHandSuitBuilder().build("K", "5", "o"),
    new CardHandSuitBuilder().build("Q", "5", "o"),
    new CardHandSuitBuilder().build("J", "5", "o"),
    new CardHandSuitBuilder().build("T", "5", "o"),
    new CardHandSuitBuilder().build("9", "5", "o"),
    new CardHandSuitBuilder().build("8", "5", "o"),
    new CardHandSuitBuilder().build("7", "5", "o"),
    new CardHandSuitBuilder().build("6", "5", "o"),
    new CardHandSuitBuilder().build("5", "5", ""),
    new CardHandSuitBuilder().build("5", "4", "s"),
    new CardHandSuitBuilder().build("5", "3", "s"),
    new CardHandSuitBuilder().build("5", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "4", "o"),
    new CardHandSuitBuilder().build("K", "4", "o"),
    new CardHandSuitBuilder().build("Q", "4", "o"),
    new CardHandSuitBuilder().build("J", "4", "o"),
    new CardHandSuitBuilder().build("T", "4", "o"),
    new CardHandSuitBuilder().build("9", "4", "o"),
    new CardHandSuitBuilder().build("8", "4", "o"),
    new CardHandSuitBuilder().build("7", "4", "o"),
    new CardHandSuitBuilder().build("6", "4", "o"),
    new CardHandSuitBuilder().build("5", "4", "o"),
    new CardHandSuitBuilder().build("4", "4", ""),
    new CardHandSuitBuilder().build("4", "3", "s"),
    new CardHandSuitBuilder().build("4", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "3", "o"),
    new CardHandSuitBuilder().build("K", "3", "o"),
    new CardHandSuitBuilder().build("Q", "3", "o"),
    new CardHandSuitBuilder().build("J", "3", "o"),
    new CardHandSuitBuilder().build("T", "3", "o"),
    new CardHandSuitBuilder().build("9", "3", "o"),
    new CardHandSuitBuilder().build("8", "3", "o"),
    new CardHandSuitBuilder().build("7", "3", "o"),
    new CardHandSuitBuilder().build("6", "3", "o"),
    new CardHandSuitBuilder().build("5", "3", "o"),
    new CardHandSuitBuilder().build("4", "3", "o"),
    new CardHandSuitBuilder().build("3", "3", ""),
    new CardHandSuitBuilder().build("3", "2", "s"),
  ],
  [
    new CardHandSuitBuilder().build("A", "2", "o"),
    new CardHandSuitBuilder().build("K", "2", "o"),
    new CardHandSuitBuilder().build("Q", "2", "o"),
    new CardHandSuitBuilder().build("J", "2", "o"),
    new CardHandSuitBuilder().build("T", "2", "o"),
    new CardHandSuitBuilder().build("9", "2", "o"),
    new CardHandSuitBuilder().build("8", "2", "o"),
    new CardHandSuitBuilder().build("7", "2", "o"),
    new CardHandSuitBuilder().build("6", "2", "o"),
    new CardHandSuitBuilder().build("5", "2", "o"),
    new CardHandSuitBuilder().build("4", "2", "o"),
    new CardHandSuitBuilder().build("3", "2", "o"),
    new CardHandSuitBuilder().build("2", "2", ""),
  ],
];
describe("State Update Functions", () => {
  it(" generate CardGrid generates an empty object when given an empty range", () => {
    const PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges));
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).to.deep.equal({});
  });

  it(" generate CardGrid generates an AA object when given an AA range", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuitBuilder().build("A", "A");
    PreflopRanges[0].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).to.deep.equal({
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
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuitBuilder().build("A", "A");
    PreflopRanges[1].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).to.deep.equal({
      AA: {
        colorCards: ["#0F6125", "#ed87a7", "#6b6c7c", "#d3d3d3"][1],
        equity: "n/a",
      },
    });
  });

  it(" generate CardGrid generates an AA object when given an AA range", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuitBuilder().build("A", "A");
    PreflopRanges[2].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).to.deep.equal({
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
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street === "Preflop"
    );
    let AAHandObj = new CardHandSuitBuilder().build("A", "A");
    PreflopRanges[3].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).to.deep.equal({
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

  it(" generates a BoardOfHands when instantiated and called", () => {
    const newBoardOfHands = new BoardOfHands();
    const newCardGrid = newBoardOfHands.generateCardGrid();

    expect(newCardGrid).to.deep.equal(CardTable);
  });
  it(" can be updated to generate a new board", () => {
    let newBoardOfHands = new BoardOfHands();
    const PreflopRanges = new RangeObjectCollection(initialState.ranges);
    const SelectedRanges = PreflopRanges.displayRangeByStreet({
      Street: "Flop",
      useTwoFlopSizes: false,
    });
    Object.assign(SelectedRanges[0], {
      cardSuitHandArray: [new CardHandSuitBuilder().build("A", "A")],
    });

    newBoardOfHands.updateCardGrid(PreflopRanges, SelectedRanges);
    const newCardGrid = newBoardOfHands.generateCardGrid();

    expect(newCardGrid).to.deep.equal(CardTable);
  });
});
