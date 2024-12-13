import { View, Text } from "react-native";
import Header from "../components/header";
import FloatButton from "../components/float-button";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useListDatabase } from "../database/useListDatabase";

export default function NewListScreen() {
  const { listId } = useLocalSearchParams();
  const [listName, setListName] = useState("Nova Lista");

  // Datas about the product
  const [id, setId] = useState();
  const [nameItem, setNameItem] = useState();
  const [priceItem, setPriceItem] = useState();
  const [quantityItem, setQuantityItem] = useState();
  const [inCart, setInCart] = useState(false);

  // Actions
  const [showOptions, setShowOptions] = useState();

  const updateListName = async (newName: string) => {
    // await update(listId, {name: newName})
    setListName(newName);
  };

  return (
    <View className="h-full w-full">
      <Header
        title="Minha Lista"
        editable
        default={false}
        onEditTitle={updateListName}
      />
      <FloatButton />
    </View>
  );
}
