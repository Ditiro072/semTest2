import { TouchableOpacity, View, Text } from "react-native";

export default function CartIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "aqua", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>Cart</Text>
      </View>
    </TouchableOpacity>
  );
}
