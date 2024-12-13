import Header from "../components/header";

import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from "react-native";
import { ListDatabase, useListDatabase } from "../database/useListDatabase";
import { useEffect, useState } from "react";
import DeleteAlert from "../components/alert";

export default function Lists() {
  const { create, findAll } = useListDatabase();
  const [lists, setLists] = useState<ListDatabase[]>([]);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const listDatabase = useListDatabase();

  const redirectToNewList = async () => {
    try {
      const { insertedRowId } = await create({ name: "Nova Lista" });

      router.push({
        pathname: "/list",
        params: { listId: insertedRowId },
      });
    } catch (error) {
      console.error("Erro ao criar uma nova lista", error);
    }
  };

  const getAllLists = async () => {
    try {
      const response = await listDatabase.findAll();
      if (response) {
        setLists(response as ListDatabase[]);
      }
    } catch (error) {
      console.error("Erro ao buscar listas", error);
    }
  };

  const deleteList = async (id: string) => {
    try {
      await listDatabase.remove(id);
      await getAllLists();
    } catch (error) {
      console.error("Erro ao deletar a lista");
    }
  };

  const handleDeleteList = (id: string) => {
    setSelectedId(id);
    setShowDeleteAlert(true);
  };

  const confirmDeleteList = () => {
    if (selectedId) {
      deleteList(selectedId);
    }

    setShowDeleteAlert(false);
    setSelectedId(null);
  };

  const cancelDeleteList = () => {
    setShowDeleteAlert(false);
    setSelectedId(null);
  };

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <View className="h-full w-full flex-col bg-white py-4">
      <Header default editable={false} />

      {showDeleteAlert && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-50 items-center justify-center">
          <View className="bg-white p-6 rounded-lg w-[80%]">
            <DeleteAlert
              title="Deseja deletar a lista?"
              action={confirmDeleteList}
              onCancel={cancelDeleteList}
            />
          </View>
        </View>
      )}

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="px-10 mt-4">
            <TouchableOpacity
              className="py-6 bg-slate-200 mt-2 rounded-2xl"
              onPress={() =>
                router.push({
                  pathname: "/list",
                  params: { listId: item.id },
                })
              }
            >
              <View className="flex-col justify-between items-center px-4 gap-2">
                <View className="w-full flex-row justify-between">
                  <Text className="font-medium text-2xl">{item.name}</Text>
                  <Pressable
                    onPress={() => handleDeleteList(item.id.toString())}
                  >
                    <Feather name="trash-2" size={28} color="#000" />
                  </Pressable>
                </View>

                <View className="w-full">
                  <Text>Item 1, Item 2, Item 3...</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="px-10">
        <TouchableOpacity
          className="p-6 bg-orange-500 rounded-2xl"
          onPress={redirectToNewList}
        >
          <Feather name="plus" size={20} className="text-center" color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
