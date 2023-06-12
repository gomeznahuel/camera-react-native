import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../Button/Button";
import { RequestCameraPermission } from "../../utils";

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Image saved!");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return (
      <>
        <Text style={{ color: "#000", fontSize: 20, textAlign: "center", marginTop: 20, flex: 1, paddingTop: 20 }}>No access to camera</Text>
        <Button title="Request Permission" onPress={RequestCameraPermission} icon="camera" />
      </>
    );
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
          ratio="16:9"
          pictureSize="1920x1080"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              icon="retweet"
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
            <Button
              icon="flash"
              color={flash === FlashMode.on ? "gray" : "#FFF"}
              onPress={() =>
                setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
              }
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button title="Retake" onPress={() => setImage(null)} icon="back" />
            <Button title="Save" onPress={saveImage} icon="save" />
          </View>
        ) : (
          <Button title="Take Picture" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});
