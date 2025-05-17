import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS lists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            in_cart INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            id_list INTEGER NOT NULL,
            FOREIGN KEY (id_list) REFERENCES lists (id)
        );
`);
}
