
export function fetchLocationAction() {
    return {
        type: 'START_LOCATION_FETCH'
    };
}

export function stopLocationAction() {
    return {
        type: 'STOP_LOCATION_FETCH'
    };
}
