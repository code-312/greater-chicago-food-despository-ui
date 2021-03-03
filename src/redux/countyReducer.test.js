import reducer, { countyFetch } from './countyReducer'

describe('county Slice', () => {
    it('must provide initial state on first run', () => {
        const newState = { counties: {}, status: 'idle', error: null }
        // initially state is undefined and there is no action. 
        const resultState = reducer(undefined, {})
        expect(resultState).toEqual(newState)
    })
})

describe('extra reducers test', () => {
    // test extra reducers as usual reducers
    it('must change status to pending on countyFetch.pending', () => {
        const initialState = { counties: {}, status: 'idle', error: null }
        const action = { type: countyFetch.pending }
        const nextState = reducer(initialState, action)
        expect(nextState.status).toEqual('pending')
        expect(nextState.counties).toEqual(initialState.counties)
    })
    it('must return provided error message and status change to idle on countyFetch.rejected', () => {
        // after API call, .pending() runs first changing status to 'pending', followed by either .rejected() or .fulfilled()
        const state = { counties: {}, status: 'pending', error: null }
        const action = { type: countyFetch.rejected, error: {error : 'some error'} }
        const nextState = reducer(state, action)
        expect(nextState.status).toEqual('idle')
        expect(nextState.counties).toEqual(state.counties)
        expect(nextState.error).toEqual(action.error)
    })
    it('must change state.counties to provided payload and status.status to idle on countyFetch.fulfilled', () => {
        const state = { counties: {}, status: 'pending', error: null }
        const action = { type: countyFetch.fulfilled, payload: { counties: {x: 'abc'}  } }
        const nextState = reducer(state, action)
        expect(nextState.status).toEqual('idle')
        expect(nextState.counties).toEqual(action.payload)
    })
})
