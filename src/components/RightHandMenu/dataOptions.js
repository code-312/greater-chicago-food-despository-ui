// Labels and static Data to show in right hand menu/buttons

export const dataOptions = {
  poverty_data : {
    title: 'Poverty Rates',
    desc: 'Text about poverty rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    toggleSelectKeys: ['poverty_population_poverty', 'poverty_population_poverty_child'],
    legendLabels: ['Overall Poverty', 'Child Poverty'],
    radioSelect: null,
    dataType: 'percentValue'
  },
  insecurity_data : {
    title: 'Food Insecurity',
    desc: 'Text about food insecurity rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    toggleSelectKeys: [null, null],
    legendLabels: ['Food Insecurity', 'Child Food Insecurity'],
    radioSelect: {
      Total : ['2018', '2020'],
      TotalKeys: ['insecurity_2018', 'insecurity_2020_projected'],
      Children : ['2018', '2020'],
      ChildrenKeys: ['insecurity_2018_child', 'insecurity_2020_child_projected']
    },
    dataType: 'percent'
  },
  WIC : {
    title: 'WIC Usage',
    desc: 'Text about WIC usage data and the data and possibly the next year',
    toggleSelect: ['Enrollment', 'Race'],
    toggleSelectKeys: ['Enrollment', 'Race'],
    legendLabels: ['Total Enrollment', ''],
    radioSelect: {
      Enrollment : null,
      Race : ['Women', 'Infants', 'Children', 'Total'],
      RaceKeys: ['wic_participation_women_data', 'wic_participation_infants_data', 'wic_participation_children_data', 'wic_participation_total_data']
      },
    dataType: 'value'
  },
  race_data : {
    title: 'Census Data',
    desc: 'Text about Census data and the data and possibly the next year',
    toggleSelect: null,
    radioSelect: null,
    dataType: 'percentValue'
  },
  snap_data : {
    title: 'Snap Data',
    desc: 'Text about SNAP data',
    toggleSelect: ['2019', '2020'],
    toggleSelectKeys: ['2019', '2020'],
    legendLabels: ['', ''],
    radioSelect: {
      2019: ['0-4', '5-17','18-65', '66+'],
      2020: ['0-4', '5-17','18-65', '66+'],
      '2019Keys': ['age_0-4', 'age_5-17','age_18-65', 'age_66+'],
      '2020Keys': ['age_0-4', 'age_5-17','age_18-65', 'age_66+']
    },
    dataType: 'value'
  }
}
