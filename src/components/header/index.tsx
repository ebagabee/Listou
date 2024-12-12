import { View, Image, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

interface headerProps {
  showIcon: boolean;
}

export default function Header({ ...props }: headerProps) {
  return (
    <View className="w-full h-26 flex-row justify-between items-center px-2">
      {props.showIcon && (
        <Image
          source={require("../../assets/cart-icon.png")}
          className="w-16 h-16"
        />
      )}

      <Text className="font-bold text-2xl mr-4">Listou</Text>

      <Ionicons name="menu" size={40} />
    </View>
  );
}
