import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { Scene, Actions, Router } from 'react-native-router-flux';
import ShowMap from './src/components/ShowMap';
import Intro from './src/components/Intro';
import RegisterStudent from './src/components/RegisterStudent';
import StudentDetails from './src/components/StudentDetails';
import GMaps from './src/components/GMaps';
import Cam from './src/components/Cam';
import AddNavigator from './src/components/AddNavigator';

import { appReducer } from './src/reducers';

const Scenes = Actions.create(
    <Scene key='root'>
        <Scene            
            key='Intro' hideNavBar
            component={Intro} title="Intro"
        />
        <Scene        initial      
            key='registerStudent' hideNavBar
            component={RegisterStudent} title="Register Student"
        />
        <Scene key='studentDetails' component={StudentDetails} hideNavBar />
        <Scene key='mapLocation' component={ShowMap} title="Current Location" />
        <Scene key='gMaps' component={GMaps} title="Google Maps" />
        <Scene key='cam' component={Cam} title="Camera" />
        <Scene key='addNavigator' component={AddNavigator} title="AddNavigator" />
    </Scene>
);
const ConnectedRouter = connect()(Router);
const store = createStore(appReducer);

store.subscribe(() => {
    console.log(store.getState());
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter scenes={Scenes} />
            </Provider>
        );
    }
}
