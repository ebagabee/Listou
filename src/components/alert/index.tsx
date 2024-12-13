import { View, Text, Pressable } from "react-native";

interface DeleteAlertProps {
  title: string;
  action: () => void;
  onCancel: () => void;
}

export default function DeleteAlert({ ...props }: DeleteAlertProps) {
  return (
    <View className="flex-col gap-4">
      <Text className="text-lg font-medium text-center">{props.title}</Text>

      <View className="flex-row gap-2 justify-center">
        <Pressable
          onPress={props.onCancel}
          className="py-2 px-4 bg-slate-300 rounded"
        >
          <Text>Cancelar</Text>
        </Pressable>

        <Pressable
          onPress={props.action}
          className="py-2 px-4 bg-red-400 rounded"
        >
          <Text className="text-white">Deletar</Text>
        </Pressable>
      </View>
    </View>
  );
}
