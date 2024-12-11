import { View, Image } from "react-native";
import Header from "../components/header";
import AddButton from "../components/add-button";

export default function Lists() {
  return (
    <View>
      <Header />

      <View className="mt-10">
        <AddButton />
      </View>
    </View>
  );
}
