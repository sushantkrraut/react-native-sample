import React from 'react';
import { Image, Container, StatusBar, ScrollView, StyleSheet, TouchableWithoutFeedback, View, Text, Alert, Dimensions } from 'react-native';
import Camera from 'react-native-camera';

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewArea: {
        flex: 7,
        backgroundColor: 'powderblue'
    },
    navigationArea: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'steelblue',
    },
    button: {
        top: 5,
        width: 60,
        height: 60,
        margin: 10
    },
    containerAdd: {
        top: 5,
        margin: 10
    },
    buttonAdd: {
        top: 10,
        width: 65,
        height: 65,
        margin: 5,
        marginLeft: 12,
        marginRight: 12,
    },
    buttonAddClicked: {
        top: -7,
        width: 90,
        height: 90,
        margin: 10,
        marginLeft: 0,
        marginRight: -1,
        
    },

    seperator: {
        backgroundColor: 'white',
        borderWidth: 0.2,
        height: 50,
        top: 13,
        borderColor: 'steelblue',
    },

    circle: {
        width: width,
        height: width - 20,
        borderRadius: width / 2,
        backgroundColor: 'white',
        bottom: -75 - (width / 2),
        //shadowColor: 'red', shadowOpacity: 1, shadowRadius: 3, shadowOffset:  {width: 0, height: 0}, elevation: 1
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    panelContainer: {
        flex: 1, flexDirection: 'row'
    },
    panelPosition1: {
        top: 100, left:10
    },
    panelPosition2: {
        top: 30, left: -10
    },
    panelPosition4: {
        top: 30, right: -20
    },
    panelPosition5: {
        top: 100, right:0
    },
});

export default class AddNavigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddClicked: false
        };
        this._onAddPressButton = this._onAddPressButton.bind(this);
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onAddPressButton() {
        let val = this.state.isAddClicked;
        this.setState({
            isAddClicked: !val,
        });
    }

    _onPressButton() {
        Alert.alert(
            'You clicked this button.'
         )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewArea}>
                <Image style={{flex: 1, width: width, height: 100}} source={require('./../images/samplescreen.png')} />
                    {this.state.isAddClicked &&
                        <View style={styles.overlay}>
                            <View style={[styles.circle]} >
                                <View style={[styles.panelContainer]}>
                                <TouchableWithoutFeedback onPress={this._onPressButton}>
                                    <Image
                                        style={[styles.button, styles.panelPosition1]}
                                        source={require('./../images/address.png')}
                                    />
                                </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                                        <Image
                                            style={[styles.button, styles.panelPosition2]}
                                            source={require('./../images/alarm.png')}
                                        />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                                        <Image
                                            style={styles.button}
                                            source={require('./../images/address.png')}
                                        />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                                        <Image
                                            style={[styles.button, styles.panelPosition4]}
                                            source={require('./../images/lock.png')}
                                        />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                                        <Image
                                            style={[styles.button, styles.panelPosition5]}
                                            source={require('./../images/help.png')}
                                        />
                                    </TouchableWithoutFeedback></View>

                            </View>
                        </View>
                    }
                </View>
                <View style={styles.navigationArea}>
                    <TouchableWithoutFeedback style={styles.navigationButton} onPress={this._onPressButton}>
                        <Image
                            style={styles.button}
                            source={require('./../images/home.png')}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.seperator}></View>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <Image
                            style={styles.button}
                            source={require('./../images/user.png')}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.seperator}></View>
                    {/* <TouchableWithoutFeedback style={styles.containerAdd} onPress={this._onAddPressButton}>
                        <Image
                            style={[!this.state.isAddClicked && styles.buttonAdd, this.state.isAddClicked && styles.buttonAddClicked]}
                            source={require('./../images/add2.png')}
                        />
                    </TouchableWithoutFeedback> */}
                    {!this.state.isAddClicked && 
                        <TouchableWithoutFeedback style={styles.containerAdd} onPress={this._onAddPressButton}>
                        <Image
                            style={styles.buttonAdd}
                            source={require('./../images/add2.png')}
                        />
                        </TouchableWithoutFeedback>
                    }
                    {this.state.isAddClicked && 
                        <TouchableWithoutFeedback style={styles.containerAdd} onPress={this._onAddPressButton}>
                        <Image
                            style={styles.buttonAddClicked}
                            source={require('./../images/remove.png')}
                        />
                        </TouchableWithoutFeedback>
                    }
                    <View style={styles.seperator}></View>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <Image
                            style={styles.button}
                            source={require('./../images/sync.png')}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.seperator}></View>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <Image
                            style={styles.button}
                            source={require('./../images/info.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

