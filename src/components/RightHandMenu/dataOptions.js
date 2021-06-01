// Labels and static Data to show in right hand menu/buttons

export const dataOptions = {
  poverty_data : {
    title: 'Poverty Rates',
    desc: 'Text about poverty rates and the data and possibly the next year',
    toggleSelect: ['Total', 'Children'],
    toggleSelectKeys: ['poverty_population_poverty', 'poverty_population_poverty_child'],
    legendLabels: ['Overall Poverty', 'Child Poverty'],
    radioSelect: null
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
    }
  },
  WIC : {
    title: 'WIC Usage',
    desc: 'Text about WIC usage data and the data and possibly the next year',
    toggleSelect: ['Enrollment', 'Race'],
    radioSelect: {
      Enrollment : null,
      Race : ['Women', 'Infants', 'Children'],
      }
  },
  race_data : {
    title: 'Census Data',
    desc: 'Text about Census data and the data and possibly the next year',
    toggleSelect: null,
    radioSelect: null
  }
}