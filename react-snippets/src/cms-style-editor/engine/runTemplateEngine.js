import flattenDeep from "lodash/flattenDeep";
import { dehydrateContent, rehydrateContent } from "./hydrators";

const getRegexMatchesAndGroups = (string, regex) => {
  const totalMatchRegex = new RegExp(regex, "g");
  const nonGlobalRegex = new RegExp(regex);
  const nonEmptyFilter = val => val != null && val.trim() !== "";
  return string
    .match(totalMatchRegex)
    .map(match => match.split(nonGlobalRegex).filter(nonEmptyFilter));
};

/**
 *
 * @param string
 * @param regex
 * @param element - any valid JSX element
 */
const replaceStringWithElement = (string, regex, element) => {
  return string
    .split(new RegExp(`(${regex})`)) // Split into an array by our regex element first
    .map(val => (val === regex ? element : val)) // Inject our element
    .filter(val => val !== ""); // If the match is at the beginning or the end split() will pad empty string values into the array
};

const getTemplateValue = (regexGroups, hydratorData, templateValue) => {
  if (regexGroups.length > 0) {
    // If a function is passed, we need to pass the captured groups to that function
    if (typeof templateValue === "function" && regexGroups.length > 0) {
      // On the way out to the function we rehydrate the values so that we're not passing junk to the template functions
      const rehydratedCaptureGroups = regexGroups.map(string => {
        const rehydratedValue = rehydrateContent(string, hydratorData);
        return rehydratedValue.length > 1 ? rehydratedValue : string;
      });
      // Pass regex group data back to the template
      return templateValue(rehydratedCaptureGroups);
    }
  }
  return templateValue;
};

// Returns an array with the string value replaced as a component
const replaceRegexTemplate = (
  dehydratedObject,
  regexTemplate,
  templateValue,
) => {
  const { string: originalString, hydratorData } = dehydratedObject;
  // Get matches from the regex template
  const regexObject = new RegExp(`(${regexTemplate})`, "g"); // wrap in parantheses so we get the whole match as one of our outputs

  const hasMatches = regexObject.test(originalString);
  // First check if there are any matches
  if (hasMatches) {
    const regexMatchesAndGroups = getRegexMatchesAndGroups(
      originalString,
      regexObject,
    );
    const replacedValues = regexMatchesAndGroups.reduce(
      (previousValues, regexGroups) => {
        // The logic here is to get the capture groups from our replacement and pass them to our function
        const entireCaptureGroup = regexGroups[0]; // First group will be the entire value match - ex. (pattern(.)) => ["pattern1", "1"]
        const regexCaptureGroups = regexGroups.splice(1, regexGroups.length); // Remaining groups
        const replacementElement = getTemplateValue(
          regexCaptureGroups,
          hydratorData,
          templateValue,
        );
        const finalValue = previousValues.map(val =>
          typeof val === "string"
            ? replaceStringWithElement(
                val,
                entireCaptureGroup,
                replacementElement,
              )
            : val,
        );
        return flattenDeep(finalValue);
      },
      [originalString],
    );
    // Rehydrate the content before sending it back
    const rehydratedContent = replacedValues.map(value => {
      return value != null && typeof value === "string" // If its not a string theres nothing to rehydrate
        ? rehydrateContent(value, hydratorData)
        : value;
    });
    return flattenDeep(rehydratedContent);
  }

  // No matches so we return a rehydrated array from the string input
  return rehydrateContent(originalString, hydratorData);
};

/**
 * Top level function that iterates through each template individually
 * @returns function(*): * * JSX elements
 */
export const runTemplateEngine = (templates = {}, externalData = {}) => {
  return text => {
    return Object.keys(templates).reduce(
      (previousValues, regexString) => {
        const dehydratedObject = dehydrateContent(previousValues);
        return replaceRegexTemplate(
          dehydratedObject,
          regexString,
          templates[regexString],
        );
      },
      [text],
    );
  };
};
