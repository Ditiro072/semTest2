import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Login from "./screens/Login";
import Register from "./screens/Register";
import ProductList from "./screens/ProductList";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    setLoading(false);
    return unsubscribe;
  }, []);

  if (loading) {
    return <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}><ActivityIndicator size="large" /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle:{ backgroundColor:"aqua" }, headerTintColor:"white", headerTitleAlign:"center" }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Products" component={ProductList} />
            <Stack.Screen name="Details" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
