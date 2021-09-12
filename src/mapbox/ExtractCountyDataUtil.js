import {
  getExtraDataLabelDictionary,
} from './DataSelectionUtil';

export function extractCountyAndMetricDictionary(
  selectedFeat,
  extraDataMenuFeat,
  countyData,
) {
  let {selectedfilterFeat, selectedfilterSubfeat} = selectedFeat;
  let {selectedExtraDataFeat, selectedExtraDataFeatLabel} = extraDataMenuFeat;
  let countyMetricDict = {};

  //Note that if we change te default race we have to update extra data menu
  for (const county in countyData) {
    let countyName_Key = countyData[county].NAME.substring(
      0,
      countyData[county].NAME.length - 17,
    );
    countyMetricDict[countyName_Key] = getDataForSelector({
      selectedfilterFeat,
      selectedfilterSubfeat,
      selectedExtraDataFeat,
      currentObjectToSearch: countyData[county],
    });
  }
    if( Object.values(countyMetricDict).includes(undefined)){
        const newSelectedDataFeature =  getExtraDataLabelDictionary(selectedfilterFeat)[selectedExtraDataFeatLabel]
        if(newSelectedDataFeature === selectedExtraDataFeatLabel){
            throw new Error(`County metric is undefind for ${selectedfilterFeat,extraDataMenuFeat,selectedExtraDataFeatLabel}`)
        }
        selectedExtraDataFeat=  getExtraDataLabelDictionary(selectedfilterFeat)[selectedExtraDataFeatLabel]
        return  extractCountyAndMetricDictionary(selectedFeat, { selectedExtraDataFeat }, countyData)
    }

  return countyMetricDict;
}


export function getDataForSelector({
  selectedfilterFeat,
  selectedfilterSubfeat,
  selectedExtraDataFeat,
  currentObjectToSearch,
}) {
  if (selectedfilterFeat) {
    switch (selectedfilterFeat) {
      case "poverty_data":
        selectedfilterSubfeat =
          selectedfilterSubfeat || "poverty_population_total";
        return currentObjectToSearch[selectedfilterFeat][selectedfilterSubfeat];
        break;

      case "insecurity_data":
        selectedfilterSubfeat =
          selectedfilterSubfeat || "insecurity_2018_child";
        return currentObjectToSearch[selectedfilterFeat][selectedfilterSubfeat];
        break;

      case "race_data":
        selectedExtraDataFeat = selectedExtraDataFeat || "race_asian";
        return currentObjectToSearch[selectedfilterFeat][selectedExtraDataFeat];
        break;

      case "snap_data":
        selectedfilterSubfeat = selectedfilterSubfeat || "2019age_18-65";
        selectedExtraDataFeat = selectedExtraDataFeat || "race_asian";
        if (selectedfilterSubfeat && selectedfilterSubfeat.length > 4) {
          return currentObjectToSearch[selectedfilterFeat][
            selectedfilterSubfeat.substring(0, 4)
          ][selectedfilterSubfeat.substring(4)][selectedExtraDataFeat];
        }
        break;

      case "WIC":
        selectedfilterSubfeat =
          selectedfilterSubfeat || "wic_participation_total_data";
        selectedExtraDataFeat = selectedExtraDataFeat || "race_asian";
        if (selectedfilterSubfeat && selectedExtraDataFeat) {
          if (
            selectedfilterSubfeat.substring(0, 3) === "wic" &&
            selectedExtraDataFeat.substring !== "wic"
          ) {
            if (currentObjectToSearch[selectedfilterSubfeat]) {
              return currentObjectToSearch[selectedfilterSubfeat][
                selectedExtraDataFeat
              ];
            } else {
              return 0;
            }
          } else if (
            selectedfilterSubfeat === "Enrollment" &&
            selectedExtraDataFeat.substring(0, 3) === "wic"
          ) {
            if (
              currentObjectToSearch[
                selectedExtraDataFeat.substring(
                  0,
                  selectedExtraDataFeat.length - 6,
                )
              ]
            ) {
              return currentObjectToSearch[
                selectedExtraDataFeat.substring(
                  0,
                  selectedExtraDataFeat.length - 6,
                )
              ][
                selectedExtraDataFeat.substring(
                  selectedExtraDataFeat.length - 5,
                )
              ];
            } else {
              return 0;
            }
          }
        }
        break;

      default:
        return undefined;
    }
  }
}
