import {
  getCountyAndColorGroup,
  getCategoryDictionary,
  getValueCategoryList,
} from "./CountyColorsUtil";

test("convert data to categories", () => {
  expect(
    getCategoryDictionary({
      categoryMaximumValues: [2, 4.5, 10],
      valueDictionary: {
        county_1: 1,
        county_2: 2,
        county_3: 3,
        county_4: 4,
        county_5: 5,
      },
    }),
  ).toEqual({
    county_1: 0,
    county_2: 0,
    county_3: 1,
    county_4: 1,
    county_5: 2,
  });
});
it("spit data into categories", () => {
  expect(
    getValueCategoryList({
      values: [1, 2, 3, 4, 5],
      categoryMaximumValues: [2, 4.5, 10],
    }),
  ).toEqual([0, 0, 1, 1, 2]);
});

//TODO make dictionary

it.skip("get individual county colors", () => {
  expect(
    getCountyAndColorGroup({
      countyAndMetricGroup: retrieveTestCountyAndMetric(),
      colorKeyword: "green",
      maxLightness: 70,
      minLightness: 20,
    }),
  ).toEqual(4);
});
//put this in a function so it can be at the bottom of the file
function retrieveTestResults() {
  return;
}
function retrieveTestCountyAndMetric() {
  return [
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
}
