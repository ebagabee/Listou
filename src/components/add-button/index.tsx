import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function AddButton() {
  return (
    <View className="px-10">
      <TouchableOpacity className="bg-orange-500 p-6 rounded-xl">
        <Feather name="plus" size={40} color="#fff" className="text-center" />
      </TouchableOpacity>
    </View>
  );
}
