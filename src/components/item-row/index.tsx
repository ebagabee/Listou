import { View, TextInput } from "react-native";
import {
  useItemListDatabase,
  ItemListDatabase,
} from "../../database/useItemListDatabase";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { debounce } from "lodash";
import { memo, useState } from "react";

type ItemRowProps = {
  item: ItemListDatabase;
  onUpdate: () => void;
};

function ItemRow({ item, onUpdate }: ItemRowProps) {
  const { update } = useItemListDatabase();
  const [localName, setLocalName] = useState(item.name);

  const debouncedUpdate = debounce(
    async (changes: Partial<ItemListDatabase>) => {
      try {
        await update(item.id, changes);
        onUpdate();
      } catch (error) {
        console.error("Erro ao atualizar item", error);
      }
    },
    500
  );

  const handleUpdate = (changes: Partial<ItemListDatabase>) => {
    debouncedUpdate(changes);
  };

  return (
    <View className="flex-row items-center mb-2 p-4 border border-gray-200">
      <View>
        <BouncyCheckbox
          isChecked={item.in_cart === 1}
          onPress={(checked) => handleUpdate({ in_cart: checked ? 1 : 0 })}
          fillColor="#f97316"
          iconStyle={{ borderColor: "#f97316" }}
          size={25}
        />
      </View>

      <TextInput
        className="flex-1 rounded-md p-2 -ml-2 text-xl font-bold"
        value={localName}
        onChangeText={setLocalName}
        onBlur={() => handleUpdate({ name: localName })}
      />

      <TextInput
        className="w-20 border border-slate-400 rounded-md p-2 text-center text-orange-500 font-bold bg-white"
        value={item.quantity.toString()}
        keyboardType="numeric"
        editable={false}
      />
    </View>
  );
}

export default memo(ItemRow);
