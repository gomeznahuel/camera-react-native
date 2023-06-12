import { Text } from "react-native";
import Button from "../Button/Button";
import { RequestCameraPermission } from "../../utils";

const CameraPermissionDenied  = () => {
  return (
    <>
      <Text style={{ color: "#000", fontSize: 20, textAlign: "center", marginTop: 20, flex: 1, paddingTop: 20 }}>No access to camera</Text>
      <Button title="Request Permission" onPress={RequestCameraPermission} icon="camera" />
    </>
  );
}

export default CameraPermissionDenied ;