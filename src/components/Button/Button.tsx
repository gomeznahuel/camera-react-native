import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./style";

interface ButtonProps {
  title?: string;
  onPress: () => void;
  icon?: keyof typeof Entypo.glyphMap;
  color?: string;
}

const Button = ({ title, onPress, icon, color }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={28} color={color ? color : "#F1F1F1"} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;