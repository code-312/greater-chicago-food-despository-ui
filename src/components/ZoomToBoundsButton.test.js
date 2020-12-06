import React from 'react';
import { render} from '@testing-library/react';
import ZoomToBoundsButton from './ZoomToBoundsButton'
import userEvent from '@testing-library/user-event'

/**
 * Tests for the ZoomToBoundsButton component.
 */
describe("ZoomToBoundsButton", () => {
    /**
     * Variables used across multiple tests:
     */
    const viewport = {
        latitude: 45,
        longitude: -45, 
        zoom: 8,
      }

    /**
     * Tests to verify that the component renderes as expected.
     */
    describe("Layout", () => {
        test("renders a button component", () => {
            const {container} = render(<ZoomToBoundsButton/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })

        test("displays the label passed through props", () => {
            const {queryByText} = render(<ZoomToBoundsButton label="test-label"/>);
            const button = queryByText("test-label");
            expect(button).toBeInTheDocument();
        })
    })

    /**
     * Tests to verify that interactions with the component function as expected.
     */
    describe("Interactions", () => {
        test('on click, calls function passed in props as "updateViewport"', () => {
            const onClickFunction = jest.fn();
            const {container} = render(<ZoomToBoundsButton newViewport={null} updateViewport={onClickFunction}/>);
            const button = container.querySelector('button'); 
            userEvent.click(button);
            expect(onClickFunction).toHaveBeenCalledTimes(1);
        });

        test('updateViewport is called with value passed in props as "newViewport"', () => {
            const onClickFunction = jest.fn().mockImplementation((value) => {
                return value;
            });
            const {container} = render(<ZoomToBoundsButton newViewport={viewport} updateViewport={onClickFunction}/>);
            const button = container.querySelector('button'); 
            userEvent.click(button);
            expect(onClickFunction).toReturnWith(viewport);
        });
    })
})