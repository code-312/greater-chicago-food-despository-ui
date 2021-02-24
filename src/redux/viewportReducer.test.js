import reducer, { initialVPState, updateVP, maxMinZoom } from './viewportReducer.js'

describe('viewport Slice', () => {
    it('must provide initial viewport state state on first run', () => {
        const expectVPState = initialVPState
        // updateVP is not called as no action/state on start. just puts initialVPState as state. 
        // On first run, no action/state, so state is undefined and there is no action
        const resultFilterState = reducer(undefined, {})
        expect(resultFilterState).toEqual(expectVPState)
    })

    it('must update viewportState when latitude/longitude is changed', () => {   
        const payload1 = {
            latitude: 39.758681,
            longitude: -91.361406, 
            zoom: 6,
            width: window.innerWidth,
            height: window.innerHeight
        } 
        const payload2 = {
            latitude: 52.759881,
            longitude: -89.362506, 
            zoom: 6,
            width: window.innerWidth,
            height: window.innerHeight
        }
        // expected results, expected result is same as payload, just zoom is adjusted
        const expectPayload1 = payload1
        expectPayload1.zoom = maxMinZoom(payload1.zoom, payload1)
    
        const expectPayload2 = payload2
        expectPayload2.zoom = maxMinZoom(payload2.zoom, payload2)
        
        //pass payload through reducer and check if expected is same as result
        const newFilterState1 = reducer(initialVPState, updateVP(payload1))
        expect(newFilterState1).toEqual(expectPayload1)
        //test with new updated state.
        const newFilterState2 = reducer(newFilterState1, updateVP(payload2))
        expect(newFilterState2).toEqual(expectPayload2)
     })

     it('must update viewportState when zoom level is changed', () => {
         // input payloads
        const payload3 = {
            latitude: 39.758681,
            longitude: -91.361406, 
            zoom: 15,
            width: window.innerWidth,
            height: window.innerHeight
        } 
        const payload4 = {
            latitude: 52.759881,
            longitude: -89.362506, 
            zoom: 4,
            width: window.innerWidth,
            height: window.innerHeight
        }
        const payload5 = {
            latitude: 52.759881,
            longitude: -89.362506, 
            zoom: 8,
            width: window.innerWidth,
            height: window.innerHeight
        }

        //expected outputs: same as inputs returned as state from reducer, only zoom is modified.
        const expectPayload3 = payload3
        expectPayload3.zoom = maxMinZoom(payload3.zoom, payload3)
    
        const expectPayload4 = payload4
        expectPayload4.zoom = maxMinZoom(payload4.zoom, payload4)

        const expectPayload5 = payload5
        expectPayload5.zoom = maxMinZoom(payload5.zoom, payload5)

        
        const newFilterState3 = reducer(initialVPState, updateVP(payload3))
        expect(newFilterState3).toEqual(expectPayload3)
        const newFilterState4 = reducer(newFilterState3, updateVP(payload4))
        expect(newFilterState4).toEqual(expectPayload4)
        const newFilterState5 = reducer(newFilterState4, updateVP(payload5))
        expect(newFilterState5).toEqual(expectPayload5)
     })
})


describe('maxMinZoom function', () => {
    it('must returns 15 when zoom is greater than 15', () => {
        // output do not depend on state, so just passing initialVPState
        const input1 = {
            zoom: 15,
            state: initialVPState
        }
        const input2 = {
            zoom: 15.1,
            state: initialVPState
        }
        const input3 = {
            zoom: 16,
            state: initialVPState
        }
        const output = 15
        expect(maxMinZoom(input1.zoom, input1.state)).toEqual(output)
        expect(maxMinZoom(input2.zoom, input2.state)).toEqual(output)
        expect(maxMinZoom(input3.zoom, input3.state)).toEqual(output)
    })

    it('must returns 5.5 when zoom is less than 5.5', () => {
        // output do not depend on state, so just passing initialVPState
        const input1 = {
            zoom: 5.5,
            state: initialVPState
        }
        const input2 = {
            zoom: 5.49,
            state: initialVPState
        }
        const input3 = {
            zoom:  5,
            state: initialVPState
        }
        const output = 5.5
        expect(maxMinZoom(input1.zoom, input1.state)).toEqual(output)
        expect(maxMinZoom(input2.zoom, input2.state)).toEqual(output)
        expect(maxMinZoom(input3.zoom, input3.state)).toEqual(output)
    })

    it('must return current zoom or +0.5 -0.5 of current zoom', () => {
        // return 0.5 increased or decreased from current zoom level, when difference between current zoom and new zoom level is 1/-1 (zoom by clicking on button, default is to increase or decrease by 1)
        // else return the provided zoom level; (zoom by scrolling)
        const input1 = {
            zoom: 7,
            state: {
                latitude: 39.758681,
                longitude: -91.361406, 
                zoom: 6,
                width: window.innerWidth,
                height: window.innerHeight
            } 
        }
        const input2 = {
            zoom: 6.5,
            state: {
                latitude: 39.758681,
                longitude: -91.361406, 
                zoom: 7.5,
                width: window.innerWidth,
                height: window.innerHeight
            } 
        }
        const input3 = {
            zoom:  9.00123,
            state: {
                latitude: 39.758681,
                longitude: -91.361406, 
                zoom: 9,
                width: window.innerWidth,
                height: window.innerHeight
            } 
        }
        expect(maxMinZoom(input1.zoom, input1.state)).toEqual(6.5)
        expect(maxMinZoom(input2.zoom, input2.state)).toEqual(7)
        expect(maxMinZoom(input3.zoom, input3.state)).toEqual(input3.zoom)
    })
})
