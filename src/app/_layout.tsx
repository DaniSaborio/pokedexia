// app/_layout.tsx
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import RadialNav from "@/components/radial-nav";
import migrations from "@/drizzle/migrations.js";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../../tamagui.config";

SplashScreen.preventAutoHideAsync();

export const DATABASE_NAME = "pokedexia";

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);
  const colorScheme = useColorScheme();

  if (error) {
    console.error("Migration error:", error);
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={colorScheme ?? "light"}
      >
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            options={{ enableChangeListener: true }}
            useSuspense
          >
            <Stack screenOptions={{ headerShown: false }} />
          </SQLiteProvider>
        </Suspense>
        <RadialNav />
        <AnimatedSplashOverlay />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
