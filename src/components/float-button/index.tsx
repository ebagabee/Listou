import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface floatButtonProps {
  onPress: () => void;
}

export default function FloatButton({ onPress }: floatButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-5 right-5 bg-orange-500 p-4 rounded-full"
    >
      <Feather name="plus" size={30} color="#FFF" />
    </TouchableOpacity>
  );
}
