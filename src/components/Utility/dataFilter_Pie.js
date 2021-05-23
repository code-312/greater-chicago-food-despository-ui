
export const featureDataFilter = (data, selectFeat) => {
  const { filterFeat, filterSubFeat, selectCounty, featLabel } = selectFeat
  let selectedData = []
  let reqCounty = (data && selectCounty) && data[selectCounty.id]
  if (reqCounty) {
    switch(filterFeat) {
      case 'poverty_data':
        selectedData = [
          {key: featLabel, value: reqCounty.poverty_data[filterSubFeat], percent: reqCounty.poverty_data.poverty_percentages[filterSubFeat]},
          {key: 'Total Population', value: (reqCounty.poverty_data.poverty_population_total - reqCounty.poverty_data[filterSubFeat]), percent: (100 - reqCounty.poverty_data.poverty_percentages[filterSubFeat])/100}
        ]
        break
      default:
        break
    }
  }
  console.log('filter', selectFeat, reqCounty)
  return selectedData
}