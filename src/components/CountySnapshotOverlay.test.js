import React from 'react';
import { render} from '../test-utils';
import CountySnapshotOverlay from './CountySnapshotOverlay'

/**
 * Tests for the CountySnapshotOverlay component.
 */
describe("CountySnapshotOverlay", () => {

    // Variables used across multiple tests:
    const countyProperties = {
        NAME: "Cook",
        STATE: "17",
        COUNTY: "031"
    }
    const x = 150;
    const y = 250;

    // Tests to verify that the expected componenents are rendered.
    describe("Layout", () => {

        test("if countyProps is null, the component is not rendered.", () => {
            const {queryByTestId} = render(<CountySnapshotOverlay/>);
            const overlay = queryByTestId('county_level_snapshot_overlay');
            expect(overlay).not.toBeInTheDocument();
        })

        test("if countyProps is not null, the component is rendered.", () => {
            const {queryByTestId} = render(<CountySnapshotOverlay countyProperties={countyProperties}/>);
            const overlay = queryByTestId('county_level_snapshot_overlay');
            expect(overlay).toBeInTheDocument();
        })

        test("has a label that displays the county name passed through props with format: 'County: {name of county}'.", () => {
            const {queryByText} = render(<CountySnapshotOverlay countyProperties={countyProperties}/>);
            const text  = queryByText("County: " + countyProperties.NAME);
            expect(text).toBeInTheDocument();
        })

        test("has a label that displays the county FIPS code passed through props with format: 'FIPS: {FIPS code}'.", () => {
            const {queryByText} = render(<CountySnapshotOverlay countyProperties={countyProperties}/>);
            const text  = queryByText("FIPS: " + countyProperties.STATE + countyProperties.COUNTY);
            expect(text).toBeInTheDocument();
        })

        test("is left-aligned to the point passed in props as 'x'.", () => {
            const {queryByTestId} = render(<CountySnapshotOverlay countyProperties={countyProperties} x={x}/>);
            const overlay = queryByTestId('county_level_snapshot_overlay');
            expect(overlay.style.left).toBe(x+"px");
        })

        test("is top-aligned to the point passed in props as 'y'.", () => {
            const {queryByTestId} = render(<CountySnapshotOverlay countyProperties={countyProperties} y={y}/>);
            const overlay = queryByTestId('county_level_snapshot_overlay');
            expect(overlay.style.top).toBe(y+"px");
        })
    })
})