import Header from "../components/header";

import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { ListDatabase, useListDatabase } from "../database/useListDatabase";
import { useEffect, useState } from "react";

export default function Lists() {
  const { create, findAll } = useListDatabase();
  const [lists, setLists] = useState<ListDatabase[]>([]);

  const listDatabase = useListDatabase();

  const redirectToNewList = async () => {
    try {
      const { insertedRowId } = await create({ name: "Nova Lista" });

      router.push({
        pathname: "/newList",
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

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <View className="flex-col bg-white">
      <Header default editable={false} />

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="px-10 mt-4">
            <TouchableOpacity className="p-6 bg-orange-500 mt-2 rounded-2xl">
              <Text className="text-white font-bold">{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="px-10">
        <TouchableOpacity
          className="p-6 bg-orange-500 mt-10 rounded-2xl"
          onPress={redirectToNewList}
        >
          <Feather name="plus" size={20} className="text-center" color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
