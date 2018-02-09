export function mapReducer(state = { isFetching: false }, action) {
    switch (action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true
            };
        case 'STOP_LOCATION_FETCH':
            return {
                isFetching: false
            };
        default:
            return state;
    }
}

