import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const RequestCameraPermission  = async () => {
  await MediaLibrary.requestPermissionsAsync();
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === "granted";
};

export default RequestCameraPermission ;