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
