import React from 'react';
import { render} from '@testing-library/react';
import Map from './Map';

describe("Map", () => {
    test("renders without crashing", () => {
        render(<Map/>);
    })
})