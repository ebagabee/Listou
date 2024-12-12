import { View, Text } from "react-native";
import Header from "../components/header";
import FloatButton from "../components/float-button";

export default function NewListScreen() {
  return (
    <View className="h-full w-full">
      <Header title="Minha Lista" editable={true} default={false} />

      <FloatButton />
    </View>
  );
}
