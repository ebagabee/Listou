import { Slot } from "expo-router";

import "../global.css";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/initializeDatabase";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
