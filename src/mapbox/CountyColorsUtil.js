//es6 import didn't work for me
var convert = require("color-convert");

function getScaledLightnessLevel({
  value,
  maxValue = 1,
  minValue = 0,
  maxBrightness,
  minBrightness,
}) {
  const percent = value / (maxValue - minValue);
  const range = maxBrightness - minBrightness;
  return percent * range + minBrightness;
}

export function getCountyAndColorGroup({
  countyAndMetricGroup,
  colorKeyword = "green",
  maxBrightness = 50,
  minBrightness = 20,
}) {
  const hslColorParamaters = convert.keyword.hsl(colorKeyword);

  return countyAndMetricGroup.map((countyAndMetric, index) => {
    return {
      county: countyAndMetric.county,
      color:
        "#" +
        convert.hsl.hex(
          hslColorParamaters[0],
          100,
          getScaledLightnessLevel({
            value: countyAndMetric.metric,
            maxBrightness,
            minBrightness,
          }),
        ),
    };
  });
}
// NOTE:  the county name must match the counties in the data parameter of
// the Source component in the map. Example:
//    <Source id="counties" type="geojson" data={illinois_counties.counties}>
export const countyAndMetricGroup = [
  {county: "Hardin", metric: 0},
  {county: "Jasper", metric: 0.01},
  {county: "Jefferson", metric: 0.02},
  {county: "Johnson", metric: 0.03},
  {county: "Kendall", metric: 0.04},
  {county: "LaSalle", metric: 0.05},
  {county: "Lee", metric: 0.06},
  {county: "McDonough", metric: 0.07},
  {county: "Macon", metric: 0.08},
  {county: "Marion", metric: 0.09},
  {county: "Menard", metric: 0.1},
  {county: "Montgomery", metric: 0.11},
  {county: "Ogle", metric: 0.12},
  {county: "Piatt", metric: 0.13},
  {county: "Putnam", metric: 0.14},
  {county: "Richland", metric: 0.15},
  {county: "Saline", metric: 0.16},
  {county: "Scott", metric: 0.17},
  {county: "Stark", metric: 0.18},
  {county: "Warren", metric: 0.19},
  {county: "Washington", metric: 0.2},
  {county: "Will", metric: 0.21},
  {county: "Bond", metric: 0.22},
  {county: "Boone", metric: 0.23},
  {county: "Brown", metric: 0.24},
  {county: "Champaign", metric: 0.25},
  {county: "Clay", metric: 0.26},
  {county: "Coles", metric: 0.27},
  {county: "Cumberland", metric: 0.28},
  {county: "DeKalb", metric: 0.29},
  {county: "Douglas", metric: 0.3},
  {county: "Effingham", metric: 0.31},
  {county: "Ford", metric: 0.32},
  {county: "Hamilton", metric: 0.33},
  {county: "Henderson", metric: 0.34},
  {county: "Iroquois", metric: 0.35},
  {county: "Jackson", metric: 0.36},
  {county: "Jersey", metric: 0.37},
  {county: "Jo Daviess", metric: 0.38},
  {county: "Kane", metric: 0.39},
  {county: "Kankakee", metric: 0.4},
  {county: "Knox", metric: 0.41},
  {county: "Lake", metric: 0.42},
  {county: "Lawrence", metric: 0.43},
  {county: "Livingston", metric: 0.44},
  {county: "Logan", metric: 0.45},
  {county: "McHenry", metric: 0.46},
  {county: "Macoupin", metric: 0.47},
  {county: "Madison", metric: 0.48},
  {county: "Marshall", metric: 0.49},
  {county: "Mason", metric: 0.5},
  {county: "Massac", metric: 0.51},
  {county: "Mercer", metric: 0.52},
  {county: "Monroe", metric: 0.53},
  {county: "Morgan", metric: 0.54},
  {county: "Moultrie", metric: 0.55},
  {county: "Peoria", metric: 0.56},
  {county: "Perry", metric: 0.57},
  {county: "Pike", metric: 0.58},
  {county: "Pope", metric: 0.59},
  {county: "Pulaski", metric: 0.6},
  {county: "Randolph", metric: 0.61},
  {county: "McLean", metric: 0.62},
  {county: "Rock Island", metric: 0.63},
  {county: "St. Clair", metric: 0.64},
  {county: "Sangamon", metric: 0.65},
  {county: "Schuyler", metric: 0.66},
  {county: "Shelby", metric: 0.67},
  {county: "Stephenson", metric: 0.68},
  {county: "Tazewell", metric: 0.69},
  {county: "Union", metric: 0.7},
  {county: "Vermilion", metric: 0.71},
  {county: "Wabash", metric: 0.72},
  {county: "Wayne", metric: 0.73},
  {county: "White", metric: 0.74},
  {county: "Whiteside", metric: 0.75},
  {county: "Williamson", metric: 0.76},
  {county: "Winnebago", metric: 0.77},
  {county: "Woodford", metric: 0.78},
  {county: "Adams", metric: 0.79},
  {county: "Alexander", metric: 0.8},
  {county: "Bureau", metric: 0.81},
  {county: "Calhoun", metric: 0.82},
  {county: "Carroll", metric: 0.83},
  {county: "Cass", metric: 0.84},
  {county: "Christian", metric: 0.85},
  {county: "Clark", metric: 0.86},
  {county: "Clinton", metric: 0.87},
  {county: "Cook", metric: 0.88},
  {county: "Crawford", metric: 0.89},
  {county: "De Witt", metric: 0.9},
  {county: "DuPage", metric: 0.91},
  {county: "Edgar", metric: 0.92},
  {county: "Edwards", metric: 0.93},
  {county: "Fayette", metric: 0.94},
  {county: "Franklin", metric: 0.95},
  {county: "Fulton", metric: 0.96},
  {county: "Gallatin", metric: 0.97},
  {county: "Greene", metric: 0.98},
  {county: "Hancock", metric: 0.99},
  {county: "Henry", metric: 1},
  {county: "Grundy", metric: 1.0},
];
//TODO retrieve counties and a metric to show dynamically
export function retrieveCountyAndMetricGroup() {
  return countyAndMetricGroup;
}
