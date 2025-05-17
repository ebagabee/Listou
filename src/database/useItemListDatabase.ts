import { useSQLiteContext } from "expo-sqlite";

export type ItemListDatabase = {
  id: number;
  name: string;
  in_cart: number;
  quantity: number;
  id_list: number;
};

export function useItemListDatabase() {
  const database = useSQLiteContext();

  async function create(item: Omit<ItemListDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO items (name, in_cart, quantity, id_list) VALUES (?, ?, ?, ?)"
    );

    await statement.executeAsync([
      item.name,
      item.in_cart,
      item.quantity,
      item.id_list,
    ]);
  }

  async function findByListId(listId: string) {
    const items = await database.getAllAsync<ItemListDatabase>(
      "SELECT * FROM items WHERE id_list = ?",
      [listId]
    );

    return items;
  }

  async function update(id: number, item: Partial<ItemListDatabase>) {
    const fields = Object.keys(item);
    const values = Object.values(item);

    const updates = fields.map((field) => `${field} = ?`).join(", ");

    const statement = await database.prepareAsync(
      `UPDATE items SET ${updates} WHERE id = ?`
    );

    await statement.executeAsync([...values, id]);
  }

  return { create, findByListId, update };
}
