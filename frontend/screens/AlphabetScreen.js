import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Ionicons from "@expo/vector-icons/Ionicons"

const { width, height } = Dimensions.get("window")

const alphabetData = [
    { letter: "A", description: "Make a fist with your thumb resting alongside the outside of your fingers.", image: require("../assets/images/asl-a.png") },
    { letter: "B", description: "Hold your fingers straight up together, thumb folded across the palm.", image: require("../assets/images/asl-b.png") },
    { letter: "C", description: "Curve your hand into a 'C' shape, fingers together and thumb opposite.", image: require("../assets/images/asl-c.png") },
    { letter: "D", description: "Touch your thumb to the tips of your middle, ring, and pinky fingers while pointing your index up.", image: require("../assets/images/asl-d.png") },
    { letter: "E", description: "Curl your fingers downward so your fingertips touch your thumb, forming a claw-like shape.", image: require("../assets/images/asl-e.png") },
    { letter: "F", description: "Touch the tips of your thumb and index finger to form a circle, other fingers extended.", image: require("../assets/images/asl-f.png") },
    { letter: "G", description: "Hold your thumb and index finger horizontally and close together, palm facing sideways.", image: require("../assets/images/asl-g.png") },
    { letter: "H", description: "Extend your index and middle fingers together sideways, other fingers folded down.", image: require("../assets/images/asl-h.png") },
    { letter: "I", description: "Make a fist and extend only your pinky finger upward.", image: require("../assets/images/asl-i.png") },
    { letter: "J", description: "Make the sign for 'I' and draw the shape of a 'J' in the air with your pinky.", image: require("../assets/images/asl-j.png") },
    { letter: "K", description: "Raise your index and middle fingers in a 'V', thumb touches the middle finger's base.", image: require("../assets/images/asl-k.png") },
    { letter: "L", description: "Extend your thumb and index finger to form an 'L', other fingers closed.", image: require("../assets/images/asl-l.png") },
    { letter: "M", description: "Tuck your thumb under your first three fingers (index to ring), pinky rests outside.", image: require("../assets/images/asl-m.png") },
    { letter: "N", description: "Tuck your thumb under your first two fingers (index and middle), other fingers folded.", image: require("../assets/images/asl-n.png") },
    { letter: "O", description: "Curve all your fingers and thumb to touch tips forming a round 'O' shape.", image: require("../assets/images/asl-o.png") },
    { letter: "P", description: "Make a 'K' shape but turn your palm downward like dropping something.", image: require("../assets/images/asl-p.png") },
    { letter: "Q", description: "Make a 'G' shape and turn your hand palm-down.", image: require("../assets/images/asl-q.png") },
    { letter: "R", description: "Cross your index and middle fingers, other fingers folded.", image: require("../assets/images/asl-r.png") },
    { letter: "S", description: "Make a fist with your thumb across the front of your fingers.", image: require("../assets/images/asl-s.png") },
    { letter: "T", description: "Tuck your thumb between your index and middle fingers, rest other fingers over it.", image: require("../assets/images/asl-t.png") },
    { letter: "U", description: "Raise your index and middle fingers together, palm facing forward, others folded.", image: require("../assets/images/asl-u.png") },
    { letter: "V", description: "Raise your index and middle fingers to form a 'V', palm forward.", image: require("../assets/images/asl-v.png") },
    { letter: "W", description: "Raise index, middle, and ring fingers to form a 'W', palm facing out.", image: require("../assets/images/asl-w.png") },
    { letter: "X", description: "Curl your index finger to form a hook, others folded into a fist.", image: require("../assets/images/asl-x.png") },
    { letter: "Y", description: "Extend your thumb and pinky while folding other fingers (like a 'hang loose' sign).", image: require("../assets/images/asl-y.png") },
    { letter: "Z", description: "Use your index finger to trace a 'Z' shape in the air.", image: require("../assets/images/asl-z.png") },
]

export default function AlphabetScreen() {
    const navigation = useNavigation()
    const [index, setIndex] = useState(0)
    const current = alphabetData[index] || alphabetData[0]

    useEffect(() => {
        const loadProgress = async () => {
            const saved = await AsyncStorage.getItem("alphabetIndex")
            if (saved !== null) {
                const savedIndex = parseInt(saved)
                if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < alphabetData.length) {
                    setIndex(savedIndex)
                }
            }
        }
        loadProgress()
    }, [])

    useEffect(() => {
        AsyncStorage.setItem("alphabetIndex", index.toString())
    }, [index])

    const nextLetter = () => {
        if (index < alphabetData.length - 1) setIndex(index + 1)
    }

    const prevLetter = () => {
        if (index > 0) setIndex(index - 1)
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Ionicons name="arrow-back" size={24} color="#4B0082" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Image source={current.image} style={styles.image} resizeMode="contain" />
                <Text style={styles.letterTitle}>Letter {current.letter}</Text>
                <Text style={styles.description}>{current.description}</Text>

                <View style={styles.navButtons}>
                    {index > 0 && (
                        <TouchableOpacity style={styles.arrow} onPress={prevLetter}>
                            <Ionicons name="arrow-back-circle" size={48} color="#8A63D2" />
                        </TouchableOpacity>
                    )}
                    {index < alphabetData.length - 1 ? (
                        <TouchableOpacity style={styles.arrow} onPress={nextLetter}>
                            <Ionicons name="arrow-forward-circle" size={48} color="#8A63D2" />
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.endText}>🎉 You've reached the end!</Text>
                    )}
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>Tip:</Text>
                    <Text style={styles.infoText}>
                        Practice this sign slowly in front of a mirror. Try to keep your hand in frame just like the example!
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFEFF6",
        paddingTop: 60,
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 35,
        left: 13,
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
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        width: width * 0.85,
        padding: 24,
        alignItems: "center",
        elevation: 5,
        marginTop: 40,
    },
    image: {
        width: width * 0.6,
        height: height * 0.3,
        marginBottom: 20,
        backgroundColor: "#eee",
        borderRadius: 12,
    },
    letterTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4B006E",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginBottom: 12,
    },
    arrow: {
        marginHorizontal: 10,
    },
    endText: {
        fontSize: 16,
        color: "#4B006E",
        marginTop: 10,
    },
    infoBox: {
        marginTop: 24,
        backgroundColor: "#F4DDFE",
        borderRadius: 12,
        padding: 16,
        width: "100%",
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4B006E",
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
})
