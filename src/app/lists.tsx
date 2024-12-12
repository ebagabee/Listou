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
      <Header default editable={false} />

      {/* TODO: Flatlists */}

      <View className="px-10">
        <TouchableOpacity
          className="p-6 bg-orange-500 mt-10"
          onPress={redirectToNewList}
        >
          <Feather name="plus" size={20} className="text-center" color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
