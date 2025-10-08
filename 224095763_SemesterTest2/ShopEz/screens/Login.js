import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={styles.link}>Don't have an account? Register</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#f2f2f2", padding:20 },
  title: { fontSize:28, fontWeight:"bold", marginBottom:30, color:"#0ea5e9" },
  input: { width:"100%", borderWidth:1, borderColor:"#0ea5e9", borderRadius:10, padding:12, marginBottom:15, backgroundColor:"#fff" },
  button: { backgroundColor:"#0ea5e9", padding:15, borderRadius:10, width:"100%", alignItems:"center", marginBottom:10 },
  buttonText: { color:"#fff", fontWeight:"bold", fontSize:16 },
  error: { color:"red", marginBottom:10, textAlign:"center" },
  link: { color:"#0ea5e9", marginTop:10 }
});
