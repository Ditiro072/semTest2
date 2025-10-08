import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import CartIcon from "../components/CartIcon";

export default function ProductList({ navigation }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(allProducts);
    } else {
      const newList = allProducts.filter((item) => item.category === selectedCategory);
      setFilteredProducts(newList);
    }
  }, [selectedCategory, allProducts]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch {
      setMessage("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setAllCategories(["all", ...data]);
    } catch {
      setAllCategories(["all"]);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topRow}>
        <CartIcon onPress={() => navigation.navigate("Cart")} />
        <Button title="Logout" onPress={() => signOut(auth)} />
      </View>

      <View style={styles.categoryRow}>
        {allCategories.map((name) => (
          <TouchableOpacity
            key={name}
            style={[styles.categoryButton, selectedCategory === name && styles.activeButton]}
            onPress={() => setSelectedCategory(name)}
          >
            <Text style={{ color: selectedCategory === name ? "white" : "black" }}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {message ? <Text style={{ color: "red", textAlign: "center" }}>{message}</Text> : null}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text numberOfLines={2} style={styles.titleText}>{item.title}</Text>
              <Text style={styles.priceText}>R {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({



  card: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderColor: "blue" },
  image: { width: 80, height: 80, resizeMode: "contain" },
  titleText: { fontWeight: "600" },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", padding: 10 },
  categoryButton: { borderWidth: 1, borderColor: "white", padding: 8, borderRadius: 6, marginRight: 8, marginBottom: 6 },
  activeButton: { backgroundColor: "purple", borderColor: "black" },
  priceText: { marginTop: 6, color: "black" },
});
