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
    console.log("Answer: ", countyMetricDict[countyName_Key]);
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
        
        if(selectedfilterSubfeat.length === 4){
          selectedfilterSubfeat += "age_18-65";
        }
        
        if (selectedfilterSubfeat && selectedfilterSubfeat.length > 4) {
          return currentObjectToSearch[selectedfilterFeat][
            selectedfilterSubfeat.substring(0, 4)
          ][selectedfilterSubfeat.substring(4)][selectedExtraDataFeat];
        }
        break;

      // selected filter feat is WIC
      case "WIC":
        console.log("selectedfilterSubfeat: ", selectedfilterSubfeat);
        console.log("selectedExtraDataFeat: ", selectedExtraDataFeat);
        console.log("currentObjectToSearch: ", currentObjectToSearch);

        selectedfilterSubfeat = selectedfilterSubfeat || "wic_participation_total_data";
        selectedExtraDataFeat = selectedExtraDataFeat || "race_asian";

        // there is a selected filter subfeat and selected extra data feat
        if (selectedfilterSubfeat && selectedExtraDataFeat) {
          
          // selectedfilterSubfeat begins with "wic" and exraDataFeat does not 
          if (selectedfilterSubfeat.substring(0, 3) === "wic" && selectedExtraDataFeat.substring !== "wic") {
              
            // there is a selected filer subfeat ("wic_participation_total_data" set above)
            if (currentObjectToSearch[selectedfilterSubfeat]) {
              return currentObjectToSearch[selectedfilterSubfeat][selectedExtraDataFeat];
            } else {
              // there is no selectedfilterSubfeat property
              return 0;
            }
              
          // selctedfilterSubfeaet is "Enrollment" (used to have && sedf substring "wic")
          } else if (selectedfilterSubfeat === "Enrollment") {
            
            // if selectedExtraDataFeat not valid make it 'Women'
            selectedExtraDataFeat = (selectedExtraDataFeat === 'Women' ||selectedExtraDataFeat ===  'Infants' ||selectedExtraDataFeat ===  'Children') 
            ? selectedExtraDataFeat 
            : 'Women';
              
            // if there is a selectedExtraDataFeat.substring (defaults to "race")
            if (currentObjectToSearch[`wic_participation_${selectedExtraDataFeat.toLowerCase()}_data`]) {
              return currentObjectToSearch
                [`wic_participation_${selectedExtraDataFeat.toLowerCase()}_data`]
                ['total'];
            } else {
              // no valid property selected
              return 0;
            }
          
          // selected sub feat is "Race"
          } else if (selectedfilterSubfeat === "Race") {
            // if county has WIC data
            if (currentObjectToSearch.wic_participation_total_data) {
              return currentObjectToSearch?.wic_participation_total_data?.['race_asian'];
            } else {
              return 0;
            }
          } 
        }
        // there is no selected filtered subfeat or no selected extra data
        break;

      default:
        return undefined;
    }
  }
}
