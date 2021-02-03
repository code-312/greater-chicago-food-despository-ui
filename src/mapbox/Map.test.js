import React from 'react';
import { render } from '../test-utils';
import Map from './Map';

describe("Map", () => {
    test("renders without crashing", () => {
        render(<Map/>);
    })
})