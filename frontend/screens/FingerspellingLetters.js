
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

const letterImages = {
    A: require("../assets/images/asl-a.png"),
    B: require("../assets/images/asl-b.png"),
    C: require("../assets/images/asl-c.png"),
    D: require("../assets/images/asl-d.png"),
    E: require("../assets/images/asl-e.png"),
    F: require("../assets/images/asl-f.png"),
    G: require("../assets/images/asl-g.png"),
    H: require("../assets/images/asl-h.png"),
    I: require("../assets/images/asl-i.png"),
    J: require("../assets/images/asl-j.png"),
    K: require("../assets/images/asl-k.png"),
    L: require("../assets/images/asl-l.png"),
    M: require("../assets/images/asl-m.png"),
    N: require("../assets/images/asl-n.png"),
    O: require("../assets/images/asl-o.png"),
    P: require("../assets/images/asl-p.png"),
    Q: require("../assets/images/asl-q.png"),
    R: require("../assets/images/asl-r.png"),
    S: require("../assets/images/asl-s.png"),
    T: require("../assets/images/asl-t.png"),
    U: require("../assets/images/asl-u.png"),
    V: require("../assets/images/asl-v.png"),
    W: require("../assets/images/asl-w.png"),
    X: require("../assets/images/asl-x.png"),
    Y: require("../assets/images/asl-y.png"),
    Z: require("../assets/images/asl-z.png"),
}

export default function LetterPracticeGrid() {
    const navigation = useNavigation()
    const letters = Object.keys(letterImages)

    return (
        <View style={styles.wrapper}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Practice Fingerspelling Letters</Text>
                <Text style={styles.subtitle}>Choose a letter and try to sign it!</Text>
                <ScrollView contentContainerStyle={styles.grid}>
                    {letters.map((letter) => (
                        <TouchableOpacity
                            key={letter}
                            style={styles.card}
                            onPress={() => navigation.navigate("LetterPracticeScreen", { letter })}
                        >
                            <Image source={letterImages[letter]} style={styles.image} resizeMode="contain" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFEFF6",
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4B006E",
        textAlign: "center",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#4B006E",
        textAlign: "center",
        marginBottom: 16,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    card: {
        width: width / 5,
        height: width / 5,
        backgroundColor: "#A678B4",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
})
