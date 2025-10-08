import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      setMessage("Invalid email format");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully", [{ text:"OK", onPress:()=>navigation.navigate("Login") }]);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister}><Text style={styles.buttonText}>Register</Text></TouchableOpacity>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={styles.link}>Already have an account? Login</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#fff3e6", padding:20 },
  title: { fontSize:28, fontWeight:"bold", marginBottom:30, color:"#ff7f50" },
  input: { width:"100%", borderWidth:1, borderColor:"#ff7f50", borderRadius:10, padding:12, marginBottom:15, backgroundColor:"#fff" },
  button: { backgroundColor:"#ff7f50", padding:15, borderRadius:10, width:"100%", alignItems:"center", marginBottom:10 },
  buttonText: { color:"#fff", fontWeight:"bold", fontSize:16 },
  error: { color:"red", marginBottom:10, textAlign:"center" },
  link: { color:"#ff7f50", marginTop:10 }
});
