import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';
import { studentsReducer } from './studentsReducer';
import { mapReducer } from './mapReducer';

const sceneReducer = (state = {}, { type, scene }) => {
    switch (type) {
        case ActionConst.FOCUS:
            return { ...state, scene };
        default:
            return state;
    }
};

export const appReducer = combineReducers({
    sceneReducer,
    students: studentsReducer,
    location: mapReducer
});
