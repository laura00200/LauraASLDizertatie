import React from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"

const { width } = Dimensions.get("window")

export default function CommunityScreen() {
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

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.heading}>👐 What is Sign Language?</Text>
                    <Text style={styles.paragraph}>
                        Sign language is a visual language that uses hand shapes, facial expressions,
                        and movement to convey meaning. American Sign Language (ASL) is widely used in
                        North America, while Romanian Sign Language (LSR) is used in Romania and Moldova.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>💡 Interesting Facts</Text>
                    <Text style={styles.paragraph}>
                        • Sign languages are not universal — every region has its own!{"\n"}
                        • ASL has its own grammar and sentence structure.{"\n"}
                        • Babies can learn sign language before they can speak!
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>🌟 Famous Deaf Individuals</Text>

                    <View style={styles.celebrity}>
                        <Image
                            source={require("../assets/images/helen-keller.png")}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.caption}>
                            Helen Keller – author, speaker, activist
                        </Text>
                    </View>

                    <View style={styles.celebrity}>
                        <Image
                            source={require("../assets/images/marlee-matlin.png")}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.caption}>
                            Marlee Matlin – Oscar-winning actress
                        </Text>
                    </View>

                    <View style={styles.celebrity}>
                        <Image
                            source={require("../assets/images/nyle-dimarco.png")}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.caption}>
                            Nyle DiMarco – model, activist, DWTS winner
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>📚 How Can I Learn More?</Text>
                    <Text style={styles.paragraph}>
                        You can explore YouTube channels like "ASL Meredith" or "The Daily Moth".
                        Organizations like the World Federation of the Deaf (WFD) or Romanian
                        Association for the Deaf offer courses and resources.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>🤝 Why Inclusion Matters</Text>
                    <Text style={styles.paragraph}>
                        Learning sign language helps us connect with the Deaf community. Inclusion
                        means everyone gets to participate, express themselves, and feel understood.
                        It builds empathy, respect, and a more beautiful world for everyone.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFEFF6",
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
        fontSize: 20,
        color: "#4B0082",
        fontWeight: "600",
    },
    container: {
        paddingTop: Platform.OS === "android"
            ? StatusBar.currentHeight + 32
            : 32,
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4B006E",
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 15,
        color: "#333",
        lineHeight: 22,
    },
    celebrity: {
        marginTop: 20,
        alignItems: "center",
    },
    image: {
        width: width * 0.8,
        height: 180,
        borderRadius: 16,
        marginBottom: 8,
        backgroundColor: "#DDD",
    },
    caption: {
        fontSize: 14,
        color: "#4B006E",
        fontWeight: "600",
        textAlign: "center",
    },
})
