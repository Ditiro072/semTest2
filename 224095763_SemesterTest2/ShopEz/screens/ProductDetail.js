import { useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import { auth, db } from "../firebaseConfig";
import { ref, get, set, update } from "firebase/database";

export default function ProductDetail({ route }) {
  const product = route.params.product;
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Login required", "You must log in to add items to your cart.");
      return;
    }

    const cartRef = ref(db, "carts/" + user.uid + "/" + product.id);

    try {
      const snapshot = await get(cartRef);
      if (snapshot.exists()) {
        const existing = snapshot.val();
        await update(cartRef, { quantity: existing.quantity + quantity });
      } else {
        await set(cartRef, {
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity
        });
      }
      Alert.alert("SuccessfuL", "Item added to cart!");
    } catch (error) {
      Alert.alert("Error", "Could not add YOUr item to cart.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>R {product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <View style={styles.quantityRow}>
        <Button title="-" onPress={() => setQuantity(q => q > 1 ? q - 1 : 1)} />
        <Text style={styles.quantity}>{quantity}</Text>
        <Button title="+" onPress={() => setQuantity(q => q + 1)} />
      </View>

      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

 quantityRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  image: { width: "100%", height: 250, resizeMode: "contain", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 18, color: "green", marginBottom: 10 },
  desc: { fontSize: 14, marginBottom: 20 },


 
});
