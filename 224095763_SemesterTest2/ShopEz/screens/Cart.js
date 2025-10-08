import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Button, StyleSheet } from "react-native";
import { auth, db } from "../firebaseConfig";
import { ref, onValue, update, remove } from "firebase/database";

export default function Cart() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = ref(db, "carts/" + user.uid);
    const unsubscribe = onValue(cartRef, snapshot => {
      setCart(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, []);

  const changeQuantity = async (id, newQty) => {
    const user = auth.currentUser;
    if (!user) return;

    const itemRef = ref(db, "carts/" + user.uid + "/" + id);

    if (newQty <= 0) {
      await remove(itemRef);
    } else {
      await update(itemRef, { quantity: newQty });
    }
  };

  const items = Object.keys(cart);
  const total = items.reduce((sum, key) => sum + cart[key].price * cart[key].quantity, 0);

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={id => id}
        renderItem={({ item }) => {
          const product = cart[item];
          return (
            <View style={styles.row}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text numberOfLines={2}>{product.title}</Text>
                <Text>R {product.price} x {product.quantity}</Text>
                <View style={styles.buttons}>
                  <Button title="-" onPress={() => changeQuantity(item, product.quantity - 1)} />
                  <Button title="+" onPress={() => changeQuantity(item, product.quantity + 1)} />
                  <Button title="Remove" color="red" onPress={() => changeQuantity(item, 0)} />
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: R {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "grey" },
  image: { width: 80, height: 80, resizeMode: "contain" },

  buttons: { flexDirection: "row", marginTop: 5, gap: 5 },
  
  footer: { padding: 15, borderTopWidth: 1, borderColor: "white "},
  
  total: { fontSize: 18, fontWeight: "bold" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});
