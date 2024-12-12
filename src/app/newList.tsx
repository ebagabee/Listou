import { View, Text } from "react-native";
import Header from "../components/header";

export default function NewListScreen() {
  return (
    <View>
      <Header title="Minha Lista" editable={true} default={false} />
    </View>
  );
}
