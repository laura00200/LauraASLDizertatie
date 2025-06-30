import React from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    SafeAreaView,
    Dimensions,
    Platform,
    StatusBar,
    TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"

const { width } = Dimensions.get("window")

const dictionaryData = [
    { word: "Hello", image: require("../assets/images/hello.png") },
    { word: "Thank You", image: require("../assets/images/thank-you.png") },
    { word: "Yes", image: require("../assets/images/yes.png") },
    { word: "No", image: require("../assets/images/no.png") },
    { word: "Please", image: require("../assets/images/please.png") },
    { word: "Sorry", image: require("../assets/images/sorry.png") },
    { word: "I love you", image: require("../assets/images/i-love-you.png") },
]

export default function DictionaryScreen() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Home")}
            >
                <Ionicons name="arrow-back" size={24} color="#4B0082" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>Mini ASL Dictionary</Text>
                <Text style={styles.subtitle}>Explore the signs below</Text>
            </View>

            <FlatList
                data={dictionaryData}
                keyExtractor={item => item.word}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.word}>{item.word}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFEFF6",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    backButton: {
        position: "absolute",
        top: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 16,
        left: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        zIndex: 10,
    },
    backText: {
        fontSize: 18,
        color: "#4B0082",
        fontWeight: "600",
    },
    header: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 32,
        marginBottom: 12,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4B006E",
    },
    subtitle: {
        fontSize: 16,
        color: "#4B006E",
        marginTop: 4,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
        elevation: 3,
        alignItems: "center",
        padding: 16,
    },
    image: {
        width: width * 0.8,
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: "#eee",
    },
    word: {
        fontSize: 20,
        fontWeight: "600",
        color: "#4B006E",
    },
})
