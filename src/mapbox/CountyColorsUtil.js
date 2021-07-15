//es6 import didn't work for me
var convert = require("color-convert");
//lightness from the hsl() color function in css
function getScaledLightnessLevel({
  value,
  maxValue = 1,
  minValue = 0,
  maxLightness,
  minLightness,
}) {
  const percent = value / (maxValue - minValue);
  const range = maxLightness - minLightness;
  return percent * range + minLightness;
}

export function getCountyAndColorGroup({
  countyAndMetricGroup,
  colorKeyword = "green",
  maxLightness,
  minLightness,
}) {
  const hslColorParamaters = convert.keyword.hsl(colorKeyword);
  const allMetricValues = countyAndMetricGroup.map(
    (countyAndMetric) => countyAndMetric.metric,
  );
  const maxxes = [10, 30, 60, 90];
  const maxMetricValue = [10, 30, 60, 90].length;

  const minMetricValue = 0;
  const categoryIndex = getValueCategoryList({
    values: countyAndMetricGroup.map(
      (countyAndMetric) => countyAndMetric.metric,
    ),
    categoryMaximumValues: [25, 50, 75, 200],
    min: 0,
  });
  /*  const getHexColor = (categoryIndex) => {
    return (
      "#" +
      convert.hsl.hex(
        hslColorParamaters[0],
        100,
        getScaledLightnessLevel({
          value: categoryIndex,
          maxValue: maxMetricValue,
          minValue: minMetricValue,
          maxLightness,
          minLightness,
        }),
      )
    );
  };*/

  const givenColors = ["#D8F9DB", "#7EC484", "#48944D", "#237528"];
  const getHexColor = (categoryIndex) => {
    return givenColors[categoryIndex];
  };

  return countyAndMetricGroup.map((countyAndMetric, index) => {
    return {
      county: countyAndMetric.county,
      color: getHexColor(categoryIndex[index]),
    };
  });
}
/* NOTE: the county names must match the county names in the data parameter of
   the Source component in the map. Example:


 <Source id="counties" type="geojson" data={illinois_counties.counties}>
*/
export function getCategoryDictionary({
  categoryMaximumValues,
  //TODO change to new list
  valueDictionary,
}) {
  const originalValues = Object.values(valueDictionary);
  const originalKeys = Object.keys(valueDictionary);
  const categoryValue = getValueCategoryList({
    values: originalValues,
    categoryMaximumValues,
  });

  const newDictionaryWithCategoriesAsValues = originalKeys.reduce(
    (categoryDictionary, key, index) => {
      return {[key]: categoryValue[index], ...categoryDictionary};
    },
    {},
  );
  return newDictionaryWithCategoriesAsValues;
}
export function getValueCategoryList({
  values,
  categoryMaximumValues,
  minimumValue = 0, //TODO add minimum so it doesn't start at 0
}) {
  const sortedCategoryMaximums = categoryMaximumValues
    .slice(0)
    .sort((a, b) => a - b);
  return values.map((value) => {
    for (var i = 0; i < sortedCategoryMaximums.length; i++) {
      if (value <= sortedCategoryMaximums[i]) {
        return i;
      }
    }
    throw Error(`Value: ${value} is not in any category`);
  });
}

export const countyAndMetricGroup = [
  //random sample data
  {county: "Hardin", metric: 0},
  {county: "Jasper", metric: 1},
  {county: "Jefferson", metric: 2},
  {county: "Johnson", metric: 3},
  {county: "Kendall", metric: 4},
  {county: "LaSalle", metric: 5},
  {county: "Lee", metric: 6},
  {county: "McDonough", metric: 7},
  {county: "Macon", metric: 8},
  {county: "Marion", metric: 9},
  {county: "Menard", metric: 10},
  {county: "Montgomery", metric: 11},
  {county: "Ogle", metric: 12},
  {county: "Piatt", metric: 13},
  {county: "Putnam", metric: 14},
  {county: "Richland", metric: 15},
  {county: "Saline", metric: 16},
  {county: "Scott", metric: 17},
  {county: "Stark", metric: 18},
  {county: "Warren", metric: 19},
  {county: "Washington", metric: 20},
  {county: "Will", metric: 21},
  {county: "Bond", metric: 22},
  {county: "Boone", metric: 23},
  {county: "Brown", metric: 24},
  {county: "Champaign", metric: 25},
  {county: "Clay", metric: 26},
  {county: "Coles", metric: 27},
  {county: "Cumberland", metric: 28},
  {county: "DeKalb", metric: 29},
  {county: "Douglas", metric: 30},
  {county: "Effingham", metric: 31},
  {county: "Ford", metric: 32},
  {county: "Hamilton", metric: 33},
  {county: "Henderson", metric: 34},
  {county: "Iroquois", metric: 35},
  {county: "Jackson", metric: 36},
  {county: "Jersey", metric: 37},
  {county: "Jo Daviess", metric: 38},
  {county: "Kane", metric: 39},
  {county: "Kankakee", metric: 40},
  {county: "Knox", metric: 41},
  {county: "Lake", metric: 42},
  {county: "Lawrence", metric: 43},
  {county: "Livingston", metric: 44},
  {county: "Logan", metric: 45},
  {county: "McHenry", metric: 46},
  {county: "Macoupin", metric: 47},
  {county: "Madison", metric: 48},
  {county: "Marshall", metric: 49},
  {county: "Mason", metric: 50},
  {county: "Massac", metric: 51},
  {county: "Mercer", metric: 52},
  {county: "Monroe", metric: 53},
  {county: "Morgan", metric: 54},
  {county: "Moultrie", metric: 55},
  {county: "Peoria", metric: 56},
  {county: "Perry", metric: 57},
  {county: "Pike", metric: 58},
  {county: "Pope", metric: 59},
  {county: "Pulaski", metric: 60},
  {county: "Randolph", metric: 61},
  {county: "McLean", metric: 62},
  {county: "Rock Island", metric: 63},
  {county: "St. Clair", metric: 64},
  {county: "Sangamon", metric: 65},
  {county: "Schuyler", metric: 66},
  {county: "Shelby", metric: 67},
  {county: "Stephenson", metric: 68},
  {county: "Tazewell", metric: 69},
  {county: "Union", metric: 70},
  {county: "Vermilion", metric: 71},
  {county: "Wabash", metric: 72},
  {county: "Wayne", metric: 73},
  {county: "White", metric: 74},
  {county: "Whiteside", metric: 75},
  {county: "Williamson", metric: 76},
  {county: "Winnebago", metric: 77},
  {county: "Woodford", metric: 78},
  {county: "Adams", metric: 79},
  {county: "Alexander", metric: 80},
  {county: "Bureau", metric: 81},
  {county: "Calhoun", metric: 82},
  {county: "Carroll", metric: 83},
  {county: "Cass", metric: 84},
  {county: "Christian", metric: 85},
  {county: "Clark", metric: 86},
  {county: "Clinton", metric: 87},
  {county: "Cook", metric: 88},
  {county: "Crawford", metric: 89},
  {county: "De Witt", metric: 90},
  {county: "DuPage", metric: 91},
  {county: "Edgar", metric: 92},
  {county: "Edwards", metric: 93},
  {county: "Fayette", metric: 94},
  {county: "Franklin", metric: 95},
  {county: "Fulton", metric: 96},
  {county: "Gallatin", metric: 97},
  {county: "Greene", metric: 98},
  {county: "Hancock", metric: 99},
  {county: "Henry", metric: 100},
  {county: "Grundy", metric: 101},
];
//TODO retrieve counties and a metric to show dynamically from external source
export function retrieveCountyAndMetricGroup() {
  //this must be a list of {county, metric} objects
  return countyAndMetricGroup;
}
