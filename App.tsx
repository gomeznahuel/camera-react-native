import React, { useEffect, useState } from "react";
import { RequestCameraPermission } from "./src/utils";
import { CameraPermissionDenied, CameraScreen } from "./src/components";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      const permission = await RequestCameraPermission ();
      setHasCameraPermission(permission);
    };

    checkCameraPermission();
  }, []);

  if (hasCameraPermission === null) return null;
  if (hasCameraPermission === false) return <CameraPermissionDenied  />

  return <CameraScreen />;
}