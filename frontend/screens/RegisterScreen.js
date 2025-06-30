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
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

export default function RegisterScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [messageColor, setMessageColor] = useState("transparent")
    const navigation = useNavigation()

    const onRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setMessage("⚠️ Please fill in all fields.")
            setMessageColor("orange")
            return
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.")
            setMessageColor("red")
            return
        }

        const registerUrl = "http://192.168.100.6:8000/user/register"
        console.log("🛠️  Register URL:", registerUrl)

        try {
            const response = await fetch(registerUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                    confirm_password: confirmPassword,
                }),
            })
            const data = await response.json()

            if (response.ok) {
                setMessage("Registration successful! You can now log in.")
                setMessageColor("green")
                setTimeout(() => navigation.navigate("Login"), 1500)
            } else {
                setMessage( (data.detail || "Registration failed."))
                setMessageColor("red")
            }
        } catch (error) {
            console.error("Register error:", error)
            setMessage("🚫 Could not connect to server.")
            setMessageColor("red")
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

                <Text style={styles.title}>Register</Text>

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

                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <Text style={[styles.feedbackMessage, { color: messageColor }]}>
                    {message}
                </Text>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.footer}>
                        Already have an account? <Text style={styles.signup}>Login</Text>
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
    feedbackMessage: {
        marginTop: 18, fontSize: 15, fontWeight: "600",
        textAlign: "center", minHeight: 30,
    },
    footer: { marginTop: 28, color: "#333", fontSize: 14 },
    signup: { color: "#8A63D2", fontWeight: "bold" },
})
