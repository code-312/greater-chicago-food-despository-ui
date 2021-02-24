import React from 'react';
import { render } from '../test-utils';
import ZipCodeSnapshotOverlay from './ZipCodeSnapshotOverlay'

/**
 * Tests for the CountySnapshotOverlay component.
 */
describe("CountySnapshotOverlay", () => {

    // Variables used across multiple tests:
    const zipCodeProperties = {
        ZCTA: "60610"
    }
    const x = 150;
    const y = 250;


    // Tests to verify that the component renderes as expected.
    describe("Layout", () => {

        test("if zipCodeProperties is null, the component is not rendered.", () => {
            const {queryByTestId} = render(<ZipCodeSnapshotOverlay/>);
            const overlay = queryByTestId('zipcode_level_snapshot_overlay');
            expect(overlay).not.toBeInTheDocument();
        })

        test("if zipCodeProperties is not null, the component is rendered.", () => {
            const {queryByTestId} = render(<ZipCodeSnapshotOverlay zipCodeProperties={zipCodeProperties}/>);
            const overlay = queryByTestId('zipcode_level_snapshot_overlay');
            expect(overlay).toBeInTheDocument();
        })

        test("has a label that displays the zip code passed through props with format: 'Zip Code: {zip code}'.", () => {
            const {queryByText} = render(<ZipCodeSnapshotOverlay zipCodeProperties={zipCodeProperties}/>);
            const text  = queryByText("Zip Code: " + zipCodeProperties.ZCTA);
            expect(text).toBeInTheDocument();
        })

        test("is left-aligned to the point passed in props as 'x'.", () => {
            const {queryByTestId} = render(<ZipCodeSnapshotOverlay zipCodeProperties={zipCodeProperties} x={x}/>);
            const overlay = queryByTestId('zipcode_level_snapshot_overlay');
            expect(overlay.style.left).toBe(x+"px");
        })

        test("is top-aligned to the point passed in props as 'y'.", () => {
            const {queryByTestId} = render(<ZipCodeSnapshotOverlay zipCodeProperties={zipCodeProperties} y={y}/>);
            const overlay = queryByTestId('zipcode_level_snapshot_overlay');
            expect(overlay.style.top).toBe(y+"px");
        })
    })
})