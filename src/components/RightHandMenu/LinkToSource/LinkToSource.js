import React from 'react';
import './LinkToSource.css';

const LinkToSource = ({ data }) => {
  const { selectedfilterFeat, selectedfilterSubfeat } = data;

  const renderLinkText = () => {
    switch (selectedfilterFeat) {
      case 'poverty_data':
        return 'IPUMS (2014)';
      case 'WIC':
        return 'IDHS (2021)';
      case 'snap_data':
        return 'IDHS (2019-2020)';
      case 'race_data':
        return 'American Community Survey (2018)';
      default:
        console.log('No selectedfilterFeat')    
    }
    // If Food Insecurity is selected:
    switch (selectedfilterSubfeat) {
      case 'insecurity_2018':
        return 'Feeding America (2018)';
      case 'insecurity_2020_projected':
        return 'Feeding America (2020)';
      case 'insecurity_2018_child':
        return 'Feeding America - Children (2018)';
      case 'insecurity_2020_child_projected':
        return 'Feeding America - Children (2020)';
      default: 
        console.log('No selectedfilterSubfeat')
    }
    return 'Link to source';
  };

  return (
    <a alt='link to source' href='#a' className='rt__link'>
      {renderLinkText()}
    </a>
  );
};

export default LinkToSource;
