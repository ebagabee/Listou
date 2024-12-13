import { View, Image, Text, Pressable } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface headerProps {
  default: boolean;
  title?: string;
  editable: boolean;
  onEditTitle?: (newTitle: string) => void;
}

const redirectToListScreen = () => {
  router.back();
};

export default function Header({ ...props }: headerProps) {
  return (
    <View className="w-full h-26 flex-row justify-between items-center px-2">
      {props.default && (
        <View className="flex-row justify-center items-center w-full">
          <Text className="font-bold text-2xl mr-4 tracking-[4px]">Listou</Text>
        </View>
      )}

      {props.editable && (
        <View className="w-full flex-row justify-between items-center px-2">
          <View className="flex-row items-center gap-2">
            <Pressable onPress={redirectToListScreen}>
              <Feather name="arrow-left" color="#FF5900" size={30} />
            </Pressable>
            <Text className="font-bold text-2xl mr-4">{props.title}</Text>
          </View>

          <Pressable>
            <Feather name="edit" size={30} color="#000000" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
