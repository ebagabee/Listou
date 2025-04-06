import { View, Text, ScrollView, FlatList } from "react-native";
import Header from "../components/header";
import FloatButton from "../components/float-button";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useListDatabase } from "../database/useListDatabase";
import {
  ItemListDatabase,
  useItemListDatabase,
} from "../database/useItemListDatabase";
import ItemRow from "../components/item-row";
import ExpandableItem from "../components/expandable-item";

export default function NewListScreen() {
  const { listId } = useLocalSearchParams();
  const [listName, setListName] = useState("");
  const { findById, update } = useListDatabase();
  const { create, findByListId } = useItemListDatabase();

  const [items, setItems] = useState<ItemListDatabase[]>([]);

  useEffect(() => {
    loadList();
    loadItems();
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

  const loadItems = async () => {
    try {
      const loadedItems = await findByListId(listId.toString());
      setItems(loadedItems);
    } catch (error) {
      console.error("Erro ao carregar itens");
    }
  };

  const handleAddItem = async () => {
    try {
      const newItem = {
        name: "Novo Item",
        price_unit: 0,
        in_cart: 0,
        quantity: 1,
        id_list: Number(listId),
      };

      await create(newItem);
      await loadItems();
    } catch (error) {
      console.error("Erro ao adicionar item", error);
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

      <FlatList
        data={[
          {
            key: "toBuy",
            title: "Para Comprar",
            items: items.filter((item) => item.in_cart === 0),
          },
          {
            key: "inCart",
            title: "No Carrinho",
            items: items.filter((item) => item.in_cart === 1),
          },
        ]}
        renderItem={({ item }) => (
          <ExpandableItem title={item.title}>
            {item.items.map((listItem) => (
              <ItemRow key={listItem.id} item={listItem} onUpdate={loadItems} />
            ))}
          </ExpandableItem>
        )}
        keyExtractor={(item) => item.key}
      />

      <FloatButton onPress={handleAddItem} />
    </View>
  );
}
