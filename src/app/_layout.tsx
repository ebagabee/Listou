import { Slot } from "expo-router";

import "../global.css";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/initializeDatabase";
import { StatusBar, View } from "react-native";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
      <View>
        <StatusBar 
          backgroundColor="#000000"
          barStyle="light-content"
        />
        <Slot />
      </View>
    </SQLiteProvider>
  );
}
