import React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

const words = ["DOG", "CAT", "LOVE", "SUN", "YES", "FUN", "NO", "HI", "GO", "HUG"]

export default function FingerspellingWords() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧠 Try Fingerspelling</Text>
            <ScrollView contentContainerStyle={styles.list}>
                {words.map((word) => (
                    <TouchableOpacity
                        key={word}
                        style={styles.wordCard}
                        onPress={() => alert(`Spell this: ${word}`)}
                    >
                        <Text style={styles.wordText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF0F5",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#B03060",
        marginVertical: 16,
    },
    list: {
        alignItems: "center",
        gap: 12,
    },
    wordCard: {
        backgroundColor: "#FF90B3",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 16,
        marginBottom: 12,
    },
    wordText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
})
