import { useSQLiteContext } from "expo-sqlite";

export type ListDatabase = {
  id: number;
  name: string;
};

export function useListDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ListDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO lists (name) VALUES ($name)"
    );

    try {
      const result = await statement.executeAsync({
        $name: data.name,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    }
  }

  return { create };
}
