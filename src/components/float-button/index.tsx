import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function FloatButton() {
  return (
    <TouchableOpacity className="absolute bottom-5 right-5 bg-orange-500 p-4 rounded-full">
      <Feather name="plus" size={30} color="#FFF" />
    </TouchableOpacity>
  );
}
