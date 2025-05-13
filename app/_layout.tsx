import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const loadAuth = async () => {
      console.log("fdsf");

      // Ex: verificar token, AsyncStorage, secure store, etc.
      const storedToken = await AsyncStorage.getItem('token');
      const expirationDate = await AsyncStorage.getItem('expirationDate');
      
      console.log("token", token);
      console.log("expirationDate", expirationDate);

      if (expirationDate) {
        const expiration = parseInt(expirationDate, 10);
        if (expiration < Date.now()) {
          console.log("Token expirado");
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("expirationDate");
          setToken(null);
          setIsAuthenticated(false);
          setAuthChecked(true);
          return;
        }
      }
      
      if (storedToken) {
        console.log("sera q entrou?");
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        console.log("entrou no else do layout do token");
        setToken(null);
        setIsAuthenticated(false);
      }

      setAuthChecked(true);
    };
    loadAuth();
  }, [token]);

  useEffect(() => {
    if (!authChecked) return;

    const isInAuthRoute = segments[0] === 'login' ;
    console.log(isInAuthRoute, segments[0]);
    console.log("isAuthenticated", isAuthenticated);
    
    

    if (!isAuthenticated) {
      console.log("entrou no if do layout");
      router.replace('/login');
    }
    else {
      if (isInAuthRoute) {
        console.log("entrou no else do layout", isAuthenticated, isInAuthRoute);
        if (isAuthenticated && segments[0] === 'login') {
          router.replace('/(tabs)/home');
        }
      }
    }
  }, [authChecked, isAuthenticated, router, segments]);

  if (!loaded || !authChecked) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
