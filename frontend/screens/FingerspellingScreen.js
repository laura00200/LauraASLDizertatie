
import React, { useRef, useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Alert,
    Image,
    Platform,
    StatusBar,
} from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

// J and Z removed
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
}

const words = ["DOG", "CAT", "LOVE", "SUN", "YES", "FUN", "NO", "HUG"]

export default function FingerspellingScreen() {
    const navigation = useNavigation()
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef(null)
    const [cameraType, setCameraType] = useState("front")
    const [isRecording, setIsRecording] = useState(false)

    const [mode, setMode] = useState(null)         // null | 'letter' | 'word'
    const [selectedLetter, setSelectedLetter] = useState(null)
    const [selectedWord, setSelectedWord] = useState(null)
    const [predictedSequence, setPredictedSequence] = useState([])
    const [wordLetterIndex, setWordLetterIndex] = useState(0)

    useEffect(() => {
        // reset whenever mode or selectedWord changes
        setSelectedLetter(null)
        setPredictedSequence([])
        setWordLetterIndex(0)
    }, [mode, selectedWord])

    const toggleCamera = () => {
        setCameraType(prev => (prev === "front" ? "back" : "front"))
    }

    const startRecording = async () => {
        if (!cameraRef.current || isRecording) return
        try {
            setIsRecording(true)
            const video = await cameraRef.current.recordAsync({ mute: true })
            setIsRecording(false)
            const labels = await uploadVideoForPrediction(video.uri)
            const pred = labels[0] || "?"
            if (mode === "letter" && selectedLetter) {
                setPredictedSequence([pred])
            } else if (mode === "word" && selectedWord) {
                setPredictedSequence(seq => {
                    const next = [...seq]
                    next[wordLetterIndex] = pred
                    return next
                })
            }
        } catch (e) {
            console.error(e)
            Alert.alert("Error", "Recording failed")
            setIsRecording(false)
        }
    }

    const stopRecording = () => cameraRef.current?.stopRecording()

    const uploadVideoForPrediction = async uri => {
        const name = uri.split("/").pop()
        const form = new FormData()
        form.append("file", { uri, name, type: "video/mp4" })
        try {
            const res = await fetch("http://192.168.100.6:8000/asl/predict", {
                method: "POST",
                body: form,
                headers: { "Content-Type": "multipart/form-data" },
            })
            const json = await res.json()
            return Object.keys(json.predicted_labels)
        } catch {
            return []
        }
    }

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text>Requesting camera permission...</Text>
            </View>
        )
    }
    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Camera access needed to practice
                </Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            {/* Camera Preview */}
            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={cameraType}
                    mode="video"
                    mute
                />
            </View>

            {/* Controls */}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={toggleCamera}>
                    <Ionicons name="camera-reverse" size={22} color="#fff" />
                    <Text style={styles.buttonText}>Flip</Text>
                </TouchableOpacity>
                {!isRecording ? (
                    <TouchableOpacity style={styles.button} onPress={startRecording}>
                        <Ionicons name="recording-outline" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.buttonStop} onPress={stopRecording}>
                        <Ionicons name="stop-circle" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Bottom Panel */}
            <View style={styles.bottomPanel}>

                {/* 🎯 NEW: Back to Home when at mode selector */}
                {mode === null && (
                    <TouchableOpacity
                        style={styles.innerBackBtn}
                        onPress={() => navigation.replace("Home")}
                    >
                        <Ionicons
                            name="arrow-back-outline"
                            size={20}
                            color="#4B006E"
                        />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                )}

                {!mode ? (
                    // choose between single-letter or full word
                    <View style={styles.modeSelector}>
                        <TouchableOpacity
                            style={styles.modeBtn}
                            onPress={() => setMode("letter")}
                        >
                            <Text style={styles.modeText}>Practice ASL Letters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modeBtn, { backgroundColor: "#FF90B3" }]}
                            onPress={() => setMode("word")}
                        >
                            <Text style={styles.modeText}>Try Fingerspelling</Text>
                        </TouchableOpacity>
                    </View>
                ) : mode === "letter" ? (
                    // single-letter flow
                    <ScrollView contentContainerStyle={styles.gridContent}>
                        {!selectedLetter ? (
                            <>
                                <TouchableOpacity
                                    style={styles.innerBackBtn}
                                    onPress={() => setMode(null)}
                                >
                                    <Ionicons
                                        name="arrow-back-outline"
                                        size={20}
                                        color="#4B006E"
                                    />
                                    <Text style={styles.backText}>Choose Mode</Text>
                                </TouchableOpacity>
                                <View style={styles.grid}>
                                    {Object.keys(letterImages).map(ltr => (
                                        <TouchableOpacity
                                            key={ltr}
                                            style={styles.card}
                                            onPress={() => {
                                                setSelectedLetter(ltr)
                                                setPredictedSequence([])
                                            }}
                                        >
                                            <Text style={styles.cardText}>{ltr}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity
                                    style={styles.backBtn}
                                    onPress={() => setSelectedLetter(null)}
                                >
                                    <Ionicons
                                        name="arrow-back-outline"
                                        size={20}
                                        color="#4B006E"
                                    />
                                    <Text style={styles.backText}>Back to Letters</Text>
                                </TouchableOpacity>
                                <Text style={styles.quizTitle}>
                                    Mimic the letter: {selectedLetter}
                                </Text>
                                <View style={styles.centerContent}>
                                    <Image
                                        source={letterImages[selectedLetter]}
                                        style={styles.largeImage}
                                        resizeMode="contain"
                                    />
                                    <View
                                        style={[
                                            styles.resultBox,
                                            predictedSequence[0] === selectedLetter
                                                ? styles.correct
                                                : styles.incorrect,
                                        ]}
                                    >
                                        <Text style={styles.resultText}>
                                            {predictedSequence[0] === selectedLetter
                                                ? "Correct!"
                                                : `Prediction: ${predictedSequence[0] || "?"}`}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.backBtn}
                                    onPress={() => {
                                        setPredictedSequence([])
                                        startRecording()
                                    }}
                                >
                                    <Ionicons
                                        name="refresh-circle"
                                        size={20}
                                        color="#4B006E"
                                    />
                                    <Text style={styles.backText}>Retry</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                ) : (
                    // word-by-letter flow
                    <ScrollView contentContainerStyle={styles.gridContent}>
                        {!selectedWord ? (
                            <>
                                <TouchableOpacity
                                    style={styles.innerBackBtn}
                                    onPress={() => setMode(null)}
                                >
                                    <Ionicons
                                        name="arrow-back-outline"
                                        size={20}
                                        color="#4B006E"
                                    />
                                    <Text style={styles.backText}>Choose Mode</Text>
                                </TouchableOpacity>

                                <Text style={styles.quizTitle}>🧠 Fingerspell These</Text>
                                <View style={styles.grid}>
                                    {words.map(w => (
                                        <TouchableOpacity
                                            key={w}
                                            style={[styles.card, { backgroundColor: "#FF90B3" }]}
                                            onPress={() => {
                                                setMode("word")
                                                setSelectedWord(w)
                                                setPredictedSequence([])
                                                setWordLetterIndex(0)
                                            }}
                                        >
                                            <Text style={styles.cardText}>{w}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        ) : wordLetterIndex < selectedWord.length ? (
                            <>
                                <TouchableOpacity
                                    style={styles.backBtn}
                                    onPress={() => setSelectedWord(null)}
                                >
                                    <Ionicons
                                        name="arrow-back-outline"
                                        size={20}
                                        color="#4B006E"
                                    />
                                    <Text style={styles.backText}>Back to Words</Text>
                                </TouchableOpacity>

                                {/* Top row: letters */}
                                <View style={styles.wordRow}>
                                    {selectedWord.split("").map((ch, i) => (
                                        <Text key={i} style={styles.wordLetter}>{ch}</Text>
                                    ))}
                                </View>
                                {/* Image row */}
                                <View style={styles.wordImageRow}>
                                    {selectedWord.split("").map((ch, i) => (
                                        <Image
                                            key={i}
                                            source={letterImages[ch]}
                                            style={styles.wordLetterImage}
                                            resizeMode="contain"
                                        />
                                    ))}
                                </View>

                                {/* Mimic current letter */}
                                <Text style={styles.quizTitle}>
                                    Mimic letter {wordLetterIndex + 1} of{" "}
                                    {selectedWord.length}: {selectedWord[wordLetterIndex]}
                                </Text>
                                <View style={styles.centerContent}>
                                    <Image
                                        source={letterImages[selectedWord[wordLetterIndex]]}
                                        style={styles.largeImage}
                                        resizeMode="contain"
                                    />
                                    {/* always-visible prediction */}
                                    <View
                                        style={[
                                            styles.resultBox,
                                            predictedSequence[wordLetterIndex] === selectedWord[wordLetterIndex]
                                                ? styles.correct
                                                : styles.incorrect,
                                        ]}
                                    >
                                        <Text style={styles.resultText}>
                                            {predictedSequence[wordLetterIndex] === selectedWord[wordLetterIndex]
                                                ? "Correct!"
                                                : `Prediction: ${predictedSequence[wordLetterIndex] || "?"}`}
                                        </Text>
                                    </View>
                                </View>

                                {/* Retry + Next row */}
                                {predictedSequence[wordLetterIndex] && (
                                    <View style={styles.actionRow}>
                                        <TouchableOpacity
                                            style={styles.backBtn}
                                            onPress={() => {
                                                setPredictedSequence(seq => {
                                                    const next = [...seq]
                                                    next[wordLetterIndex] = undefined
                                                    return next
                                                })
                                                startRecording()
                                            }}
                                        >
                                            <Ionicons
                                                name="refresh-circle"
                                                size={20}
                                                color="#4B006E"
                                            />
                                            <Text style={styles.backText}>Retry</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.nextBtn}
                                            onPress={() => setWordLetterIndex(idx => idx + 1)}
                                        >
                                            <Text style={styles.nextText}>Next Letter</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        ) : (
                            <>
                                <Text style={styles.quizTitle}>
                                    ✅ Completed {selectedWord}!
                                </Text>
                                <TouchableOpacity
                                    style={styles.nextBtn}
                                    onPress={() => setSelectedWord(null)}
                                >
                                    <Text style={styles.nextText}>Back to Words</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: "#FFEFF6" },
    permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    permissionText: { fontSize: 16, textAlign: "center", marginBottom: 12 },

    cameraContainer: {
        height: height * 0.4,
        margin: 12,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#000",
    },
    camera: { flex: 1 },

    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 6,
        marginHorizontal: 12,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#4B0082",
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        gap: 6,
    },
    buttonStop: {
        flexDirection: "row",
        backgroundColor: "#d24c63",
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        gap: 6,
    },
    buttonText: { color: "#fff", fontSize: 14, fontWeight: "600" },

    bottomPanel: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },

    // Back‐to‐Home & Choose‐Mode
    innerBackBtn: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    backText: { fontSize: 16, color: "#4B006E", marginLeft: 6, fontWeight: "500" },

    modeSelector: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    modeBtn: {
        flex: 1,
        marginHorizontal: 8,
        paddingVertical: 14,
        backgroundColor: "#4B0082",
        borderRadius: 20,
        alignItems: "center",
    },
    modeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

    gridContent: { paddingBottom: 40 },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
    card: {
        width: width / 4,
        height: width / 4,
        backgroundColor: "#A678B4",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    cardText: { color: "#fff", fontSize: 18, fontWeight: "600" },

    quizTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4B006E",
        marginBottom: 16,
        textAlign: "center",
    },

    // Word display
    wordRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 8,
    },
    wordLetter: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        letterSpacing: 8,
    },
    wordImageRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    wordLetterImage: {
        width: width * 0.2,
        height: width * 0.2,
    },

    centerContent: { alignItems: "center", marginBottom: 20 },
    largeImage: { width: width * 0.5, height: width * 0.5 },

    resultBox: {
        padding: 10,
        borderRadius: 12,
        minWidth: width * 0.4,
        alignItems: "center",
    },
    correct: { backgroundColor: "#a0e7a0" },
    incorrect: { backgroundColor: "#f2a0a0" },
    resultText: { fontSize: 18, fontWeight: "bold", color: "#2e7d32" },

    actionRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 16,
    },
    nextBtn: {
        backgroundColor: "#8A63D2",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
})
