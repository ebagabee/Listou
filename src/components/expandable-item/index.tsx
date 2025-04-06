import { memo, ReactNode, useState } from "react";
import { LayoutAnimation, Pressable, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export type ExpandableItemProps = {
  title: string;
  children?: ReactNode;
};

function ExpandableItem({
  title,
  children,
}: ExpandableItemProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="bg-white rounded-lg mb-2">
      <Pressable
        onPress={toggleExpand}
        className="flex-row items-center p-4 bg-gray-50 rounded-lg"
      >
        <Text className="text-gray-800 font-medium">{title}</Text>
        {expanded ? (
          <Feather name="chevron-down" size={20} />
        ) : (
          <Feather name="chevron-up" size={20} />
        )}
      </Pressable>

      {expanded && <View className="p-4">{children}</View>}
    </View>
  );
}

export default memo(ExpandableItem);