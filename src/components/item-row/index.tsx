import { View, TextInput, TouchableOpacity } from "react-native";
import {
  useItemListDatabase,
  ItemListDatabase,
} from "../../database/useItemListDatabase";

type ItemRowProps = {
  item: ItemListDatabase;
  onUpdate: () => void;
};

export default function ItemRow({ item, onUpdate }: ItemRowProps) {
  const { update } = useItemListDatabase();

  const handleUpdate = async (changes: Partial<ItemListDatabase>) => {
    try {
      await update(item.id, changes);
      onUpdate();
    } catch (error) {
      console.error("Erro ao atualizar item", error);
    }
  };

  return (
    <View className="flex-row items-center space-x-2 mb-2">
      <TouchableOpacity
        onPress={() => handleUpdate({ in_cart: item.in_cart ? 0 : 1 })}
        className="w-6 h-6 border border-gray-300 rounded-md items-center justify-center"
      >
        {item.in_cart ? (
          <View className="w-4 h-4 bg-blue-500 rounded-sm" />
        ) : null}
      </TouchableOpacity>

      <TextInput
        className="flex-1 border border-gray-300 rounded-md p-2"
        value={item.name}
        onChangeText={(text) => handleUpdate({ name: text })}
      />

      <TextInput
        className="w-24 border border-gray-300 rounded-md p-2"
        value={item.price_unit.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          handleUpdate({ price_unit: parseFloat(text) || 0 })
        }
      />

      <TextInput
        className="w-16 border border-gray-300 rounded-md p-2"
        value={item.quantity.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleUpdate({ quantity: parseInt(text) || 1 })}
      />
    </View>
  );
}
