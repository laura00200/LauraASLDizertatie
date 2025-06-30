import React, { useState } from "react"
import {
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [statusColor, setStatusColor] = useState("transparent")
    const navigation = useNavigation()

    const onLogin = async () => {
        if (!email || !password) {
            setStatusMessage("Please fill in both fields.")
            setStatusColor("orange")
            return
        }

        const loginUrl = "http://192.168.100.6:8000/user/login"
        console.log("🛠️  Login URL:", loginUrl)

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password }),
            })
            const data = await response.json()

            if (response.ok) {
                await AsyncStorage.setItem("userId", data.user_id)
                setStatusMessage(` ${data.message}`)
                setStatusColor("green")
                setTimeout(() => navigation.replace("Home", { userId: data.user_id }), 800)
            } else {
                setStatusMessage( (data.detail || "Invalid credentials."))
                setStatusColor("red")
            }
        } catch (error) {
            console.error("Login error:", error)
            setStatusMessage("Could not connect to server.")
            setStatusColor("red")
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.wrapper}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Image
                    source={require("../assets/images/asl-girl.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <Text style={[styles.statusMessage, { color: statusColor }]}>
                    {statusMessage}
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.footer}>
                        Don’t have an account? <Text style={styles.signup}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: "#FFEFF6" },
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: height * 0.08,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    image: { width: width * 0.6, height: height * 0.25, marginBottom: 30 },
    title: { fontSize: 28, fontWeight: "bold", color: "#4B006E", marginBottom: 24 },
    input: {
        width: "100%", height: 52, backgroundColor: "#fff",
        borderRadius: 26, paddingHorizontal: 20, marginBottom: 16, fontSize: 16,
    },
    button: {
        backgroundColor: "#8A63D2", width: "100%", height: 52,
        borderRadius: 26, justifyContent: "center", alignItems: "center", marginTop: 8,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    statusMessage: { marginTop: 16, fontSize: 15, textAlign: "center", fontWeight: "500" },
    footer: { marginTop: 28, color: "#333", fontSize: 14 },
    signup: { color: "#8A63D2", fontWeight: "bold" },
})
