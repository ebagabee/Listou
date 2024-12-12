import Header from "../components/header";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import { TouchableOpacity, View } from "react-native";

const redirectToNewList = () => {
  router.push("/newList");
};

export default function Lists() {
  return (
    <View className="flex-col bg-white">
      <Header showIcon={true} />

      {/* TODO: Flatlists */}

      <TouchableOpacity className="p-6" onPress={redirectToNewList}>
        <Feather name="plus" size={20} className="text-center" />
      </TouchableOpacity>
    </View>
  );
}
