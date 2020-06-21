/**
 * Turns mixed type arrays (both strings, components, etc) into a single string replacing all non-string values with an index mapped to a parallel array.
 * The purpose of this is to continue to allow regex matching and other string operations to occur on the string,
 * but still retain a way to return to an array format
 * Example input:
 *  [
 *    "line1",
 *    <Component/>,
 *    "line2",
 *  ]
 * Example output:
 *   {
 *    string: "line1&&0line2",
 *    hydratorData: {
 *      values: [<Component/>]
 *      specialCharacter: "&&"
 *    }
 *   }
 * @param array
 * @returns {{string: *, hydratorData: {values: *, specialCharacter: *}}}
 */
export const dehydrateContent = array => {
  const specialCharacter = "&&";
  const valueMapArray = [];
  const pureStringArray = array.map(jsxElement => {
    if (typeof jsxElement !== "string" && jsxElement != null) {
      const newIndex = valueMapArray.length;
      valueMapArray.push(jsxElement);
      return `${specialCharacter}${newIndex}`;
    }
    return jsxElement;
  });
  return {
    string: pureStringArray.join(""),
    hydratorData: {
      values: valueMapArray,
      specialCharacter,
    },
  };
};

/**
 * Turns mixed type arrays (both strings, components, etc) into a single string with special characters
 * @param string
 * @param dehyrdatorData: {values, specialCharacter}
 * @returns {unknown[]}
 */
export const rehydrateContent = (string, { values, specialCharacter }) => {
  return string
    .split(new RegExp(`(${specialCharacter}\\d+)`))
    .filter(val => val !== "") // Remove empty strings from our arrays - split has a tendency to add empty strings
    .map(val => {
      const matchGroups = val.match(new RegExp(`${specialCharacter}(\\d+)`));
      if (matchGroups) {
        return values[matchGroups[1]];
      }
      return val;
    });
};
