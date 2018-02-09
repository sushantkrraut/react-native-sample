import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View, Text, Alert, Dimensions } from 'react-native';
import Camera from 'react-native-camera';

//import fetch_blob from 'react-native-fetch-blob';
//import RNFS from 'react-native-fs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  previewArea: {
    flex: 1,
    position: 'absolute',
    padding: 150,
    paddingLeft: 110,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  bigblue: {
    fontSize: 20,
    borderColor: 'green',
    borderWidth: 2,
    width: 250,
    height: 250
}
});

let { width, height } = Dimensions.get('window');

export default class Cam extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false,
      isPictureTaken: false,
      path: null
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => {
          
          this.setState({
            path: data.path
          });
          console.log(data);
        })
        .catch(err => console.error(err));
    }
  };

  startRecording = () => {
    if (this.camera) {
      this.camera
        .capture({ mode: Camera.constants.CaptureMode.video })
        .then(data => console.log(data))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true,
      });
    }
  };

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
      });
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  };

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    // if (this.state.camera.flashMode === auto) {
    //   icon = require('./assets/ic_flash_auto_white.png');
    // } else if (this.state.camera.flashMode === on) {
    //   icon = require('./assets/ic_flash_on_white.png');
    // } else if (this.state.camera.flashMode === off) {
    //   icon = require('./assets/ic_flash_off_white.png');
    // }

    return icon;
  }

  render() {

    return (
      <View style={styles.container}>
        <Image style={{width: width, height: height, top:-40 ,resizeMode: Image.resizeMode.contain}} source={{uri: this.state.path}}/>
        
        {!this.state.path && <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
          cropToPreview={true}
          permissionDialogTitle="Sample title"
          permissionDialogMessage="Sample dialog message"
        />}
        {/* <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity style={styles.typeButton} onPress={this.switchType}>
            <Image source={this.typeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton} onPress={this.switchFlash}>
            <Image source={this.flashIcon} />
          </TouchableOpacity>
        </View> */}
        {!this.state.path && <View style={styles.previewArea}>
            <Text style={styles.bigblue}></Text>
        </View>}
        {!this.state.path && 
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {(!this.state.isRecording && (
            <TouchableOpacity style={styles.captureButton} onPress={this.takePicture.bind(this)}>
             
            </TouchableOpacity>
          ))}
        </View>}
      </View>
    );
  }
}