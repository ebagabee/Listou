import { View, TextInput } from "react-native";
import {
  useItemListDatabase,
  ItemListDatabase,
} from "../../database/useItemListDatabase";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
    <View className="flex-row items-center mb-2 p-4 border border-gray-200">
      <View>
        <BouncyCheckbox
          isChecked={item.in_cart === 1}
          onPress={(checked) => handleUpdate({ in_cart: checked ? 1 : 0 })}
          fillColor="#f97316"
          iconStyle={{ borderColor: "#f97316" }}
          size={20}
        />
      </View>

      <TextInput
        className="flex-1 rounded-md p-2 bg-white -ml-2 text-xl"
        value={item.name}
        onChangeText={(text) => handleUpdate({ name: text })}
      />

      <TextInput
        className="w-24 border border-slate-400 rounded-md p-2 bg-white mr-2"
        value={item.price_unit.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          handleUpdate({ price_unit: parseFloat(text) || 0 })
        }
      />

      <TextInput
        className="w-16 border border-slate-400 rounded-md p-2 bg-white"
        value={item.quantity.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleUpdate({ quantity: parseInt(text) || 1 })}
      />
    </View>
  );
}
