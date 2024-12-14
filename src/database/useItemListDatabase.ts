import { useSQLiteContext } from "expo-sqlite";

export type ItemListDatabase = {
  id: number;
  name: string;
  priceUnit: number;
  inCart: number;
  quantity: number;
  idList: number;
};

export function useItemListDatabase() {
  const database = useSQLiteContext();

  async function create(item: Omit<ItemListDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO items (name, price_unit, in_cart, quantity, id_list) VALUES (?, ?, ?, ?, ?)"
    );

    await statement.executeAsync([
      item.name,
      item.priceUnit,
      item.inCart,
      item.quantity,
      item.idList,
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
    const updates = Object.entries(item)
      .map(([key, _]) => {
        const column = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );
        return `${column} = ?`;
      })
      .join(", ");

    const statement = await database.prepareAsync(
      `UPDATE items SET ${updates} WHERE id = ?`
    );

    await statement.executeAsync([...Object.values(item), id]);
  }

  return { create, findByListId, update };
}
