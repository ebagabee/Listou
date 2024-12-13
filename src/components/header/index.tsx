import { View, Image, Text, Pressable, TextInput } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect } from "react";

interface headerProps {
  default: boolean;
  title?: string;
  editable: boolean;
  onEditTitle?: (newTitle: string) => void;
}

export default function Header({ ...props }: headerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  useEffect(() => {
    setTempTitle(props.title || "");
  }, [props.title]);

  const redirectToListScreen = () => {
    router.back();
  };

  const handleEditPress = () => {
    if (isEditing && props.onEditTitle) {
      props.onEditTitle(tempTitle);
    }
    setIsEditing(!isEditing);
  };

  const handleChangeText = (text: string) => {
    setTempTitle(text);
  };

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

            {isEditing ? (
              <TextInput
                value={tempTitle}
                onChangeText={handleChangeText}
                className="font-bold text-2xl mr-4 min-w-[150px]"
                autoFocus
              />
            ) : (
              <Text className="font-bold text-2xl mr-4">{props.title}</Text>
            )}
          </View>

          <Pressable onPress={handleEditPress}>
            <Feather
              name={isEditing ? "check" : "edit"}
              size={30}
              color="#000000"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
