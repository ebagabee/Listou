import { useSQLiteContext } from "expo-sqlite";

export type ItemListDatabase = {
  id: number;
  name: string;
  priceUnit: number;
  inCart: number;
  quantity: number;
};

export function useItemListDatabase() {
  const database = useSQLiteContext();
}
