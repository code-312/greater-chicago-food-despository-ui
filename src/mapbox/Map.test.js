import React from 'react';
import { render } from '../test-utils';
import Map from './Map';

describe.skip("Map", () => {
    test("renders without crashing", () => {
        render(<Map/>);
    })
})