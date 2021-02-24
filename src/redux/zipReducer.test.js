import reducer, { zipFetch } from './zipReducer'

describe('zip Slice', () => {
    it('must provide initial state on first run', () => {
        const newState = { zipcodes: {}, status: 'idle', error: null }
        // initially state is undefined and there is no action. 
        const resultState = reducer(undefined, {})
        expect(resultState).toEqual(newState)
    })
})

describe('extra reducers test', () => {
    // test extra reducers as usual reducers
    it('must change status to pending on zipFetch.pending', () => {
        const initialState = { zipcodes: {}, status: 'idle', error: null }
        const action = { type: zipFetch.pending }
        const nextState = reducer(initialState, action)
        expect(nextState.status).toEqual('pending')
        expect(nextState.zipcodes).toEqual(initialState.zipcodes)
    })
    it('must return provided error message and status change to idle on zipFetch.rejected', () => {
        // after API call, .pending() runs first changing status to 'pending', followed by either .rejected() or .fulfilled()
        const state = { zipcodes: {}, status: 'pending', error: null }
        const action = { type: zipFetch.rejected, error: {error : 'some error'} }
        const nextState = reducer(state, action)
        expect(nextState.status).toEqual('idle')
        expect(nextState.zipcodes).toEqual(state.zipcodes)
        expect(nextState.error).toEqual(action.error)
    })
    it('must change state.zipcodes to provided payload and status.status to idle on zipFetch.fulfilled', () => {
        const state = { zipcodes: {}, status: 'pending', error: null }
        const action = { type: zipFetch.fulfilled, payload: { zipcodes: {x: 'abc'}  } }
        const nextState = reducer(state, action)
        expect(nextState.status).toEqual('idle')
        expect(nextState.zipcodes).toEqual(action.payload)
    })
})
