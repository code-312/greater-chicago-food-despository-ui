import {updateExtraDataFeat} from "../redux/extraDataMenuReducer";
import {updateSelectedFeat} from "../redux/selectedFeatReducer";

const defaultFeatures = {
  snap_year: "2019",
  snap_age_group: "age_18-65",
  census_race: "race_asian",
  snap_race: "race_asian",
  wic_race: "race_asian",
  wic_feature: "wic_participation_total_data",
  food_insecurity_feature: "insecurity_2018_child",
  poverty_feature: "poverty_population_total",
};

export function setSelectionDefaults({
  dispatch,
  selectedFeat,
  selectedExtraDataFeat,
}) {
  const {selectedfilterSubfeat, selectedfilterFeat} = selectedFeat;
  const setSubFeature = (value) => {
    if (
      selectedfilterSubfeat === null ||
      typeof selectedfilterSubfeat === "undefined") {
      dispatch(
        updateSelectedFeat({
          ...selectedFeat,
          ...{
            selectedfilterSubfeat: value,
          },
        }),
      );
    }
  };
  const setExtraDataFeatureDefault = (value) => {
    if (
      selectedExtraDataFeat === null ||
      typeof selectedExtraDataFeat === "undefined"
    ) {
      dispatch(
        updateExtraDataFeat({
          selectedExtraDataFeat: value,
        }),
      );
    }
  };

  switch (selectedfilterFeat) {
    case "poverty_data":
      setSubFeature(defaultFeatures.snap_year + defaultFeatures.snap_age_group);
      break;
    case "insecurity_data":
      setSubFeature(defaultFeatures.food_insecurity_feature);
      break;
    case "race_data":
      setExtraDataFeatureDefault(defaultFeatures.census_race);
      break;
    case "snap_data":
      setSubFeature(defaultFeatures.snap_year + defaultFeatures.snap_age_group);
      setExtraDataFeatureDefault(defaultFeatures.snap_race);
      break;
    case "WIC":
      setSubFeature(defaultFeatures.wic_feature);
      setExtraDataFeatureDefault(defaultFeatures.wic_race);
      break;
  }
}
