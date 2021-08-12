export const extraDataOptions_Selector = (selectedfilterFeat, selectedfilterSubfeat) => {
  const featOptions = {
    WIC: {
      Enrollment: {
        Women: 'wic_participation_women_data.total',
        Infants: 'wic_participation_infants_data.total',
        Children: 'wic_participation_children_data.total' 
      },
      wic_participation: {
        White: 'race_white',
        Asian: 'race_asian',
        Black: 'race_black',
        'Hispanic/Latino': 'hispanic_or_latino',
        Native: 'race_amer_indian_or_alaskan_native',
        Pacific: 'race_native_hawaii_or_pacific_islander',
        'Two+': 'race_multiracial'
      }
    },
    race_data: {
      White: 'race_white',
      Asian: 'race_asian',
      Black: 'race_black',
      'Hispanic/Latino': 'race_hispaniclatino_total',
      Native: 'race_native',
      Pacific: 'race_pacific',
      'Two+': 'race_twoplus_total',
      Other: 'race_other'
    },
    snap_data: {
      White: 'race_white',
      Asian: 'race_asian',
      Black: 'race_black',
      'Hispanic/Latino': 'race_hispaniclatino',
      Native: 'race_native',
      Pacific: 'race_pacific',
      Unknown: 'race_unknown'
    }
  }
  
  switch(selectedfilterFeat) {
    case 'WIC':
      if (selectedfilterSubfeat === 'Enrollment') {
        return(featOptions.WIC.Enrollment)
      } else {
        return(featOptions.WIC.wic_participation)
      }
    case 'race_data':
      return(featOptions.race_data)
    case 'snap_data':
      return(featOptions.snap_data)
    default: 
      return(null)
  }
}