import React from 'react';
import { render } from '../test-utils';
import Map from './Map';
/*
  See this issue for discussion about mocking the mapbox-gl library :
  https://github.com/visgl/react-map-gl/issues/210
*/

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('MapGL test', () => {
  it('renders without crashing', () => {
    render(<Map/>);
  })
})


