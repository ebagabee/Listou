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

  async function findById(id: string): Promise<ListDatabase | null> {
    const query = "SELECT * FROM lists WHERE id = $id";

    const result = await database.getFirstAsync<ListDatabase>(query, {
      $id: id,
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async function findAll() {
    try {
      const query = "SELECT * FROM lists";

      const response = await database.getAllAsync(query);

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async function update(id: string, data: { name: string }) {
    const statement = await database.prepareAsync(
      "UPDATE lists SET name = $name WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
        $name: data.name,
      });
    } catch (error) {
      throw error;
    }
  }

  async function remove(id: string) {
    const statement = await database.prepareAsync(
      "DELETE FROM lists WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
      });
    } catch (error) {
      throw error;
    }
  }

  return { create, findAll, update, remove, findById };
}
