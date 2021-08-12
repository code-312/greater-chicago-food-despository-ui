import reducer, { initialFilterState, updateFilters } from './filterReducer.js'

describe('filter Slice', () => {
    it('must provide initial state on first run', () => {
        const newFilterState = initialFilterState
        // initially state is undefined and there is no action. 
        const resultFilterState = reducer(undefined, {})
        expect(resultFilterState).toEqual(newFilterState)
    })
    it('must update filterState when hovered over a zipcode or a county', () => {
        // input payloads
        const payload1 = {
            selectedCounty: ['in', 'COUNTY', ''],
            highlightCounty: ["in", "COUNTY", "167"],
            highlightZipcode: ['in', 'ZCTA', null],
            filterZipcodeByCounty: ['in', 'COUNTY', '17167'],
            x: 272,
            y: 491,
            hoveredCounty: {
                CENSUSAREA: 868.302,
                COUNTY: "167",
                GEO_ID: "0500000US17167",
                LSAD: "County",
                NAME: "Sangamon",
                STATE: "17"
            },
            hoveredZipCode: null
        } 
        const payload2 = {
            selectedCounty: ['in', 'COUNTY', ''],
            highlightCounty: ["in", "COUNTY", "003"],
            highlightZipcode: ['in', 'ZCTA', '62990'],
            filterZipcodeByCounty: ['in', 'COUNTY', '17003'],
            x: 220,
            y: 273,
            hoveredCounty: {
                CENSUSAREA: 235.509,
                COUNTY: "003",
                GEO_ID: "0500000US17003",
                LSAD: "County",
                NAME: "Alexander",
                STATE: "17"
            },
            hoveredZipCode: {
                COUNTY: "17003",
                GIST_ID: 29,
                SHAPE_AREA: 0.0117392435931,
                SHAPE_LEN: 0.96394668181,
                ZCTA: "62990"
            }
        } 

        // reducer takes payload and pass it through updateFilters and returns payload as new state (expected result) which is same as the payload itself.
        const newFilterState1 = reducer(initialFilterState, updateFilters(payload1))
        expect(newFilterState1).toEqual(payload1)
        const newFilterState2 = reducer(initialFilterState, updateFilters(payload2))
        expect(newFilterState2).toEqual(payload2)
     })
})
