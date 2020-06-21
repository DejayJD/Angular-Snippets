/**
 * Condenses an arrya into a string from a
 * @param descriptionArray
 * @returns {string|*}
 */
export const arrayToNewLineFormatter = descriptionArray => {
  try {
    return descriptionArray.reduce((p1, p2) => `${p1}\n\n${p2}`);
  } catch (e) {
    return "";
  }
};
/**
 * Generates array from text split inbetween two newline characters (markdown style)
 * Sample input: "line1\n\nline2"
 * Sample output: ["line1", "line2"]
 * @param descriptionText
 * @returns {Array|RangeTree|void|string[]|Array}
 */
export const newLineToArrayFormatter = descriptionText => {
  try {
    return descriptionText.split("\n\n");
  } catch (e) {
    return [descriptionText];
  }
};
