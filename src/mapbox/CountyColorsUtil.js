export function getCountyAndColorDictionary({
  countyValueDictionary,
  colorsForCategories,
  categoryMaximumValues,
  minimumCategoryValue,
}) {
  const countyCategoryDictionary = getCategoryDictionary({
    categoryMaximumValues: categoryMaximumValues,
    valueDictionary: countyValueDictionary,
  });
  return getColorDictionary({
    colors: colorsForCategories,
    categoryDictionary: countyCategoryDictionary,
  });
}

export function getColorDictionary({colors, categoryDictionary}) {
  const categories = Object.values(categoryDictionary);
  const originalKeys = Object.keys(categoryDictionary);
  const colorList = categories.map((category) => colors[category]);

  return getDictionary({keys: originalKeys, values: colorList});
}

export function getCategoryDictionary({
  categoryMaximumValues,
  valueDictionary,
}) {
  const originalValues = Object.values(valueDictionary);
  const originalKeys = Object.keys(valueDictionary);
  const categoryValues = getValueCategoryList({
    values: originalValues,
    categoryMaximumValues,
  });

  return getDictionary({keys: originalKeys, values: categoryValues});
}

export function getValueCategoryList({
  values,
  categoryMaximumValues,
  minimumValue = 0, 
}) {
  const sortedCategoryMaximums = categoryMaximumValues
    .slice(0) //clone list
    .sort((a, b) => a - b);

  const minReceivedValue = Math.min(...values);
  if (minReceivedValue < minimumValue)
    throw Error(`Value: ${minimumValue} is less than smallest category`);

  return values.map((value) => {
    for (var i = 0; i < sortedCategoryMaximums.length; i++) {
      if (value <= sortedCategoryMaximums[i]) {
        return i;
      }
    }
    throw Error(`Value: ${value} is not in any category`);
  });
}

function getDictionary({keys, values}) {
  const newDictionary = {};
  keys.forEach((key, index) => {
    newDictionary[key] = values[index];
  });
  return newDictionary;
}

export function retrieveCountyAndMetricDictionary() {
  /* NOTE: the county names must match the county names in the data parameter of
   the Source component in the map. Example:
 <Source id="counties" type="geojson" data={illinois_counties.counties}>
*/
  return {
    //random sample data
    Hardin: 0,
    Jasper: 1,
    Jefferson: 2,
    Johnson: 3,
    Kendall: 4,
    LaSalle: 5,
    Lee: 6,
    McDonough: 7,
    Macon: 8,
    Marion: 9,
    Menard: 10,
    Montgomery: 11,
    Ogle: 12,
    Piatt: 13,
    Putnam: 14,
    Richland: 15,
    Saline: 16,
    Scott: 17,
    Stark: 18,
    Warren: 19,
    Washington: 20,
    Will: 21,
    Bond: 22,
    Boone: 23,
    Brown: 24,
    Champaign: 25,
    Clay: 26,
    Coles: 27,
    Cumberland: 28,
    DeKalb: 29,
    Douglas: 30,
    Effingham: 31,
    Ford: 32,
    Hamilton: 33,
    Henderson: 34,
    Iroquois: 35,
    Jackson: 36,
    Jersey: 37,
    "Jo Daviess": 38,
    Kane: 39,
    Kankakee: 40,
    Knox: 41,
    Lake: 42,
    Lawrence: 43,
    Livingston: 44,
    Logan: 45,
    McHenry: 46,
    Macoupin: 47,
    Madison: 48,
    Marshall: 49,
    Mason: 50,
    Massac: 51,
    Mercer: 52,
    Monroe: 53,
    Morgan: 54,
    Moultrie: 55,
    Peoria: 56,
    Perry: 57,
    Pike: 58,
    Pope: 59,
    Pulaski: 60,
    Randolph: 61,
    McLean: 62,
    "Rock Island": 63,
    "St. Clair": 64,
    Sangamon: 65,
    Schuyler: 66,
    Shelby: 67,
    Stephenson: 68,
    Tazewell: 69,
    Union: 70,
    Vermilion: 71,
    Wabash: 72,
    Wayne: 73,
    White: 74,
    Whiteside: 75,
    Williamson: 76,
    Winnebago: 77,
    Woodford: 78,
    Adams: 79,
    Alexander: 80,
    Bureau: 81,
    Calhoun: 82,
    Carroll: 83,
    Cass: 84,
    Christian: 85,
    Clark: 86,
    Clinton: 87,
    Cook: 88,
    Crawford: 89,
    "De Witt": 90,
    DuPage: 91,
    Edgar: 92,
    Edwards: 93,
    Fayette: 94,
    Franklin: 95,
    Fulton: 96,
    Gallatin: 97,
    Greene: 98,
    Hancock: 99,
    Henry: 100,
    Grundy: 101,
  };
}

function getScaledLightnessLevel({
  value,
  maxValue = 1,
  minValue = 0,
  maxLightness,
  minLightness,
}) {
  //lightness from the hsl() color in css
  const percent = value / (maxValue - minValue);
  const range = maxLightness - minLightness;
  return percent * range + minLightness;
}
