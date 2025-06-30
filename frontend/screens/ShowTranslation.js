import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ShowTranslationScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const [translation, setTranslation] = useState("No translation received");

    useEffect(() => {
        const predictedText = route.params?.prediction;
        if (predictedText && predictedText.trim().length > 0) {
            setTranslation(predictedText);
        }
    }, [route.params]);

    const speakText = () => {
        Speech.speak(translation, {
            rate: 1.0,
            pitch: 1.0,
        });
    };

    const goBackToTranslate = () => {
        navigation.navigate("TranslateScreen");
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Ionicons name="arrow-back" size={24} color="#4B0082" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>✨ Your Translation ✨</Text>

            <View style={styles.translationBox}>
                <Text style={styles.translationText}>{translation}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={speakText}>
                <Ionicons name="volume-high" size={20} color="#fff" />
                <Text style={styles.buttonText}>Hear it Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={goBackToTranslate}>
                <Ionicons name="refresh" size={18} color="#4B0082" />
                <Text style={styles.secondaryBtnText}>Try Another</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFF0F5",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        zIndex: 1,
    },
    backText: {
        fontSize: 20,
        color: "#4B0082",
        fontWeight: "600",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4B0082",
        marginBottom: 28,
    },
    translationBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 28,
        elevation: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    translationText: {
        fontSize: 22,
        textAlign: "center",
        color: "#333",
        marginBottom: 12,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#8A63D2",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 10,
        marginTop: 20,
    },
    secondaryBtnText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#4B0082",
    },
});
