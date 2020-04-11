import { UPDATE_RANGE_COLORS } from "./constants";

export function updateRangeColors(data) {
  return {
    type: UPDATE_RANGE_COLORS,
    data
  };
}
