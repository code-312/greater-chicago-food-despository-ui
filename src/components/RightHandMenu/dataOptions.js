// Labels and static Data to show in right hand menu/buttons

export const dataOptions = {
  poverty_data : {
    title: 'Poverty Rates',
    desc: 'This includes county data on the number of people living in a household with a total cash income below the U.S. Census Bureau’s poverty threshold.',
    toggleSelect: ['Total', 'Children'],
    toggleSelectKeys: ['poverty_population_poverty', 'poverty_population_poverty_child'],
    legendLabels: ['Overall Poverty', 'Child Poverty'],
    radioSelect: null,
    dataType: 'percentValue'
  },
  insecurity_data : {
    title: 'Food Insecurity',
    desc: 'This includes data on the overall food insecurity rates for people in the county. Food insecurity is defined as a lack of consistent access to enough food for an active, healthy life.',
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
    desc: 'This includes county data on the total number of people enrolled in the Women Infant Children (WIC) special nutrition program, broken down into categories, total enrollment and racial makeup.',
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
    desc: 'This includes data on the racial/ethnic makeups of counties that have been measured across a 5-year span and averaged together to provide a more reliable estimate of the data.',
    toggleSelect: null,
    radioSelect: null,
    dataType: 'percentValue'
  },
  snap_data : {
    title: 'Snap Data',
    desc: 'This includes county data on enrollment in the Supplemental Nutrition Assistance Program (SNAP) that provides nutrition benefits to supplement the food budget for families broken down by age range and race.',
    toggleSelect: ['2019', '2020'],
    toggleSelectKeys: ['2019', '2020'],
    legendLabels: ['2019', '2020'],
    radioSelect: {
      2019: ['Age: 0-4', 'Age: 5-17','Age: 18-65', 'Age: 66+'],
      2020: ['Age: 0-4', 'Age: 5-17','Age: 18-65', 'Age: 66+'],
      '2019Keys': ['2019age_0-4', '2019age_5-17','2019age_18-65', '2019age_66+'],
      '2020Keys': ['2020age_0-4', '2020age_5-17','2020age_18-65', '2020age_66+']
    },
    dataType: 'value'
  }
}
