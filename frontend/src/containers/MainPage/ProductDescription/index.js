import React, { Fragment } from "react";

const ProductDescription = () => {
  return (
    <Fragment>
      <h2>Hand Range Display Application</h2>
      <p>
        This application allows you to track what hands you are playing from
        different positions in Texas Holdem Poker. Click a street on the left,
        and then select a betting pattern. For example, you could select flop,
        then Valuebet, Bluff, Check Fold, or Check Call.
      </p>
      <p>
        You can then select different hands to fit into your poker hand range.
        Once you have completed filling out the hand ranges you can then look at
        the legend to see how your range is divided between the different
        actions.
      </p>
    </Fragment>
  );
};

export default ProductDescription;
