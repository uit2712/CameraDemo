/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, CameraRoll, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
      <Text>Waiting</Text>
    </View>
);

export default class App extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            videoData: null,
            startRecording: false,
            stopRecording: false,
            data: null,
        };
    }

    takePicture = async (camera) => {
        if (camera) {
            const options = { quality: 0.5 };
            const data = await camera.takePictureAsync(options);
            CameraRoll.saveToCameraRoll(data.uri, "photo").then(onfulfilled => {
                ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
            }).catch(error => ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT));
        }
    };

    recordVideo = async () => {
        if (this.camera) {
            const data = await this.camera.recordAsync();
            CameraRoll.saveToCameraRoll(data.uri, 'video').then(onfulfilled => {
                ToastAndroid.show(`New video path: ${onfulfilled}`, ToastAndroid.SHORT);
                this.setState({ videoData: null, startRecording: false });
            }).catch(error => ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT));
        }
    }

    stopRecording = () => {
        if (this.camera)
            this.camera.stopRecording();
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={camera => this.camera = camera}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                            return (
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.recordVideo} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> RECORD </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.stopRecording} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> STOP RECORDING </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                    }}
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
