import { View, Text } from "react-native";
import Header from "../components/header";
import FloatButton from "../components/float-button";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useListDatabase } from "../database/useListDatabase";

export default function NewListScreen() {
  const { listId } = useLocalSearchParams();
  const [listName, setListName] = useState("");
  const { findById, update } = useListDatabase();

  // Datas about the product
  const [id, setId] = useState();
  const [nameItem, setNameItem] = useState();
  const [priceItem, setPriceItem] = useState();
  const [quantityItem, setQuantityItem] = useState();
  const [inCart, setInCart] = useState(false);

  // Actions
  const [showOptions, setShowOptions] = useState();

  useEffect(() => {
    loadList();
  }, [listId]);

  const loadList = async () => {
    try {
      const list = await findById(listId.toString());

      if (list) {
        setListName(list.name);
      }
    } catch (error) {
      console.error("Erro ao carregar lista", error);
    }
  };

  const handleEditTitle = async (newTitle: string) => {
    try {
      await update(listId.toString(), { name: newTitle });
      setListName(newTitle);
    } catch (error) {
      console.error("Erro ao atualizar titulo da lista", error);
    }
  };

  return (
    <View className="h-full w-full">
      <Header
        title={listName}
        editable
        default={false}
        onEditTitle={handleEditTitle}
      />
      <Text>Lista ID: {listId}</Text>
      <FloatButton />
    </View>
  );
}
