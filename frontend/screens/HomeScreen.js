// screens/DashboardScreen.js
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"

const { width } = Dimensions.get("window")

const menuOptions = [
    {
        key: "alphabet",
        icon: "book-outline",
        title: "Learn Alphabet",
        description: "Study hand signs A to Z",
        route: "AlphabetScreen",
    },
    {
        key: "quiz",
        icon: "help-circle-outline",
        title: "Take a Quiz",
        description: "Challenge yourself with sign tests",
        route: "QuizScreen",
    },
    {
        key: "translate",
        icon: "camera-outline",
        title: "Translate",
        description: "Use camera to recognize signs",
        route: "TranslateScreen",
    },
    {
        key: "fingerspelling",
        icon: "hand-left-outline",
        title: "Learn Fingerspelling",
        description: "Practice spelling with hand signs",
        route: "FingerspellingScreen",
    },
    {
        key: "dictionary",
        icon: "bookmarks-outline",
        title: "Mini Dictionary",
        description: "View common ASL words with meanings",
        route: "DictionaryScreen",
    },
    {
        key: "community",
        icon: "people-outline",
        title: "Learn About Community",
        description: "Explore Deaf culture and resources",
        route: "CommunityScreen",
    },
]

export default function DashboardScreen() {
    const navigation = useNavigation()

    const handlePress = (route) => {
        navigation.navigate(route)
    }

    const handleLogout = () => {

        navigation.replace("Login")
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome! 👋</Text>
                <Text style={styles.headerSubtitle}>
                    What would you like to do today?
                </Text>

                {/* Logout button in header */}
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#FFF" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={menuOptions}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress(item.route)}
                    >
                        <Ionicons
                            name={item.icon}
                            size={36}
                            color="#4B006E"
                            style={styles.icon}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFEFF6",
    },
    header: {
        backgroundColor: "#A678B4",
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 16 : 40,
        paddingBottom: 28,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        position: "relative",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    headerSubtitle: {
        fontSize: 16,
        marginTop: 8,
        color: "#FFFFFF",
    },
    logoutBtn: {
        position: "absolute",
        top: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 40,
        right: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    logoutText: {
        color: "#FFF",
        marginLeft: 6,
        fontWeight: "600",
    },
    list: {
        padding: 16,
        paddingBottom: 40,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 24,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 3,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#4B006E",
    },
    description: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
})
