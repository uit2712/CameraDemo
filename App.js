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

    takePicture = async (camera) => {
        if (camera) {
            const options = { quality: 0.5 };
            const data = await camera.takePictureAsync(options);
            CameraRoll.saveToCameraRoll(data.uri, "photo").then(onfulfilled => {
                ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
            }).catch(error => ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT));
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
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
                                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> SNAP </Text>
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
