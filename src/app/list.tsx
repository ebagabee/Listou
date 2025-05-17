import { View, Text, Modal, TextInput, TouchableOpacity, FlatList } from "react-native";
import Header from "../components/header";
import FloatButton from "../components/float-button";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useListDatabase } from "../database/useListDatabase";
import { ItemListDatabase, useItemListDatabase } from "../database/useItemListDatabase";
import ItemRow from "../components/item-row";
import ExpandableItem from "../components/expandable-item";

export default function NewListScreen() {
  const { listId } = useLocalSearchParams();
  const [listName, setListName] = useState("");
  const { findById, update } = useListDatabase();
  const { create, findByListId } = useItemListDatabase();

  const [items, setItems] = useState<ItemListDatabase[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");

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
        name: newItemName || "Novo Item",
        in_cart: 0,
        quantity: parseInt(newItemQuantity) || 1,
        id_list: Number(listId),
      };
      await create(newItem);
      setNewItemName("");
      setNewItemQuantity("1");
      setModalVisible(false);
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
      console.error("Erro ao atualizar título da lista", error);
    }
  };

  return (
    <View className="h-full w-full bg-gray-50">
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

      <FloatButton onPress={() => setModalVisible(true)} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-11/12 max-w-md bg-white rounded-lg p-6 shadow-lg">
            <Text className="text-xl font-bold mb-4 text-center">Adicionar Novo Item</Text>
            
            <View className="mb-4">
              <Text className="text-base mb-2">Nome do Item</Text>
              <TextInput
                className="w-full border border-gray-300 rounded-md p-2"
                value={newItemName}
                onChangeText={setNewItemName}
                placeholder="Digite o nome do item"
              />
            </View>

            <View className="mb-4">
              <Text className="text-base mb-2">Quantidade</Text>
              <TextInput
                className="w-full border border-gray-300 rounded-md p-2"
                value={newItemQuantity}
                onChangeText={setNewItemQuantity}
                placeholder="Digite a quantidade"
                keyboardType="numeric"
              />
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-400 rounded-md py-2 px-4"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-semibold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 rounded-md py-2 px-4"
                onPress={handleAddItem}
              >
                <Text className="text-white font-semibold">Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}