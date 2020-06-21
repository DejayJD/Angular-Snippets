/**
 * Example Input: "prop1="test" prop2="123""
 *         Output: {prop1: "test", prop2: 123} <- note that it will try to convert values using JSON.parse but if it cant it will remain its original value
 * @param propsString
 * @returns object
 */
export const parsePropString = propsString => {
  const finalObject = {};
  const propStringArray = propsString.split(" "); // split by spaces first. Ex: `prop1="test" prop2="123"` to ['prop1="test', 'prop2="12']
  const propStringRegex = /(.*?)="(.*?)"/; // Matches key in first group and value in second group
  propStringArray.forEach(propString => {
    const regexGroups = propString.match(propStringRegex) || [];
    // eslint-disable-next-line no-unused-vars
    const [match, key, value] = regexGroups; // First value in string.match function return is always the whole group, which we dont need here
    if (key && value) {
      try {
        // Parse strings into actual data types if possible. Ex "123" -> 123, "true" -> true
        finalObject[key] = JSON.parse(value);
      } catch (e) {
        // If there are issues with parsing we just leave it in string format ¯\_(ツ)_/¯
        finalObject[key] = value;
      }
    }
  });
  return finalObject;
};
