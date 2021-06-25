export const filterFeatChart = (data, selectedFeat) => {
  const { selectedfilterFeat, selectedfilterSubfeat, selectedCounty, featLabel } = selectedFeat
  let pieData = []
  let reqCountyData = (data && selectedCounty) && data[selectedCounty.id]

  if (reqCountyData) {

    switch(selectedfilterFeat) {

      case 'poverty_data':
        pieData = [
          {key: featLabel, 
            value: reqCountyData.poverty_data[selectedfilterSubfeat], 
            percent: Math.round(reqCountyData.poverty_data.poverty_percentages[selectedfilterSubfeat] * 100)
          },
          {key: 'Total Population', 
           value: (reqCountyData.poverty_data.poverty_population_total - reqCountyData.poverty_data[selectedfilterSubfeat]), 
           percent: Math.round((1 - reqCountyData.poverty_data.poverty_percentages[selectedfilterSubfeat]) * 100)
          }
        ]
        break

      case 'race_data':
        for (const itemKey in raceLegend) {
          pieData.push({ key: raceLegend[itemKey], 
                         value: reqCountyData.race_data[itemKey], 
                         percent: Math.round(reqCountyData.race_data.race_percentages[itemKey] * 100 * 10)/10 
                        })
        }
        break

      case 'insecurity_data':
        pieData = [
            { key: featLabel, 
              value: Math.round((reqCountyData.insecurity_data[selectedfilterSubfeat] * 100 * 100)) / 100 
            },
            { key: 'Total Population', 
              value: 100 - Math.round((reqCountyData.insecurity_data[selectedfilterSubfeat] * 100 * 100)) / 100 
            }
          ]
        break

      case 'WIC':
        if (selectedfilterSubfeat === 'Enrollment') {
          pieData = [
            { key: 'Women', 
              value: reqCountyData.wic_participation_women_data.total 
            },
            { key: 'Infants', 
              value: reqCountyData.wic_participation_infants_data.total 
            },
            { key: 'Children', 
              value: reqCountyData.wic_participation_children_data.total 
            }
          ]
        } else {
          if (selectedfilterSubfeat ? selectedfilterSubfeat.slice(0,3) === 'wic' : false) {
            for (const itemKey in wicLegend) {
              pieData.push({ key: wicLegend[itemKey], 
                             value: reqCountyData[selectedfilterSubfeat][itemKey] 
                            })
            }
          }
        }
        break

      case 'snap_data':
        console.log('snap Data')
        break
        
      default:
        break
    }
  }
  return pieData
}

const raceLegend = {
  race_white: 'White',
  race_asian: 'Asian',
  race_black: 'Black',
  race_hispaniclatino_total: 'Hispanic/Latino',
  race_native: 'Native',
  race_pacific: 'Pacific',
  race_twoplus_total: 'Two+',
  race_other: 'Other'
}

const wicLegend = {
  race_white: 'White',
  race_asian: 'Asian',
  race_black: 'Black',
  hispanic_or_latino: 'Hispanic/Latino',
  race_amer_indian_or_alaskan_native: 'Native',
  race_native_hawaii_or_pacific_islander: 'Pacific',
  race_multiracial: 'Two+'
}

// const snapRaceLegend = {
//   race_white: 'White',
//   race_asian: 'Asian',
//   race_black: 'Black',
//   race_hispaniclatino_total: 'Hispanic/Latino',
//   race_native: 'Native',
//   race_pacific: 'Pacific',
//   race_unknown: 'Unknown'
// }
