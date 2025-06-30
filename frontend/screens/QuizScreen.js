import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    SafeAreaView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"

const { width } = Dimensions.get("window")

const questions = [
    {
        type: "image",
        question: "What letter is this sign?",
        image: require("../assets/images/asl-a.png"),
        options: ["A", "B", "C", "D"],
        answer: "A",
    },
    {
        type: "text",
        question: "What does ASL stand for?",
        options: [
            "American Sign Language",
            "Active Sign Learning",
            "American Symbol Language",
            "Another Signing Logic",
        ],
        answer: "American Sign Language",
    },
    {
        type: "image",
        question: "What letter is this sign?",
        image: require("../assets/images/asl-f.png"),
        options: ["D", "F", "E", "G"],
        answer: "F",
    },
    {
        type: "text",
        question: "How can you help a deaf person in a conversation?",
        options: [
            "Speak louder",
            "Avoid eye contact",
            "Use clear gestures or sign",
            "Talk very fast",
        ],
        answer: "Use clear gestures or sign",
    },
    {
        type: "text",
        question: "Which of these is a common ASL greeting?",
        options: ["Goodbye", "Peace", "Hello", "Bye-bye"],
        answer: "Hello",
    },
    {
        type: "image",
        question: "What letter is this sign?",
        image: require("../assets/images/asl-b.png"),
        options: ["B", "H", "L", "F"],
        answer: "B",
    },
    {
        type: "text",
        question: "Which hand do you usually sign with?",
        options: [
            "Only left",
            "Your dominant hand",
            "Right hand always",
            "Both hands equally",
        ],
        answer: "Your dominant hand",
    },
    {
        type: "text",
        question: "ASL is used primarily in which country?",
        options: ["France", "Germany", "USA", "Brazil"],
        answer: "USA",
    },
    {
        type: "image",
        question: "What letter is this sign?",
        image: require("../assets/images/asl-c.png"),
        options: ["C", "O", "D", "U"],
        answer: "C",
    },
    {
        type: "text",
        question: "How do deaf people usually get someone’s attention?",
        options: ["Clapping", "Tapping gently", "Whistling", "Waving arms"],
        answer: "Tapping gently",
    },
    {
        type: "text",
        question: "Can facial expressions change meaning in ASL?",
        options: ["No", "Yes", "Only sometimes", "Not sure"],
        answer: "Yes",
    },
    {
        type: "text",
        question: "What is the best way to learn ASL?",
        options: [
            "Watching TV",
            "Reading books only",
            "Practicing with others",
            "Listening carefully",
        ],
        answer: "Practicing with others",
    },
]

export default function QuizScreen() {
    const navigation = useNavigation()
    const [showIntro, setShowIntro] = useState(true)
    const [index, setIndex] = useState(0)
    const [selected, setSelected] = useState(null)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [timer, setTimer] = useState(15)

    const current = questions[index]

    useEffect(() => {
        if (!showIntro && !showResult) {
            if (timer === 0) handleTimeout()
            const interval = setInterval(() => setTimer(t => t - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timer, showIntro, showResult])

    const handleTimeout = () => {
        setSelected("timeout")
        setTimeout(goNext, 1000)
    }

    const handleSelect = option => {
        setSelected(option)
        if (option === current.answer) setScore(s => s + 1)
        setTimeout(goNext, 1000)
    }

    const goNext = () => {
        if (index + 1 < questions.length) {
            setIndex(i => i + 1)
            setSelected(null)
            setTimer(15)
        } else {
            setShowResult(true)
        }
    }

    const resetQuiz = () => {
        setIndex(0)
        setSelected(null)
        setScore(0)
        setShowResult(false)
        setTimer(15)
        setShowIntro(true)
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            {showIntro ? (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Ionicons name="arrow-back" size={24} color="#4B0082" />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <Image
                        source={require("../assets/images/ILOVEU-removebg-preview.png")}
                        style={styles.banner}
                    />
                    <View style={styles.introCard}>
                        <Text style={styles.introTitle}>Welcome to the ASL Quiz!</Text>
                        <Text style={styles.introText}>Rules:</Text>
                        <Text style={styles.introText}>• 15 seconds per question</Text>
                        <Text style={styles.introText}>• +1 point per correct answer</Text>
                        <Text style={styles.introText}>• No going back once answered</Text>
                        <Text style={styles.introText}>• Finish before time runs out</Text>
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() => setShowIntro(false)}
                        >
                            <Ionicons
                                name="play-circle"
                                size={24}
                                color="#fff"
                                style={{ marginRight: 8 }}
                            />
                            <Text style={styles.startButtonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : !showResult ? (
                <View style={styles.quizBox}>
                    <Text style={styles.timer}>⏱ {timer}s</Text>
                    <Text style={styles.question}>{current.question}</Text>
                    {current.type === "image" && (
                        <Image
                            source={current.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
                    {current.options.map((opt, i) => {
                        const isCorrect = opt === current.answer
                        const isSelected = selected === opt
                        let bg = "#fff"
                        if (selected) {
                            if (isSelected && isCorrect) bg = "#c9f7c2"
                            else if (isSelected && !isCorrect) bg = "#f9c0c0"
                            else bg = "#eee"
                        }
                        return (
                            <TouchableOpacity
                                key={i}
                                disabled={!!selected}
                                onPress={() => handleSelect(opt)}
                                style={[styles.option, { backgroundColor: bg }]}
                            >
                                <Text style={styles.optionText}>{opt}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            ) : (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Ionicons name="arrow-back" size={24} color="#4B0082" />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultEmoji}>🥳</Text>
                        <Text style={styles.resultTitle}>Congratulations!</Text>
                        <Text style={styles.resultScore}>
                            You scored <Text style={styles.scoreHighlight}>{score}</Text> / {questions.length}
                        </Text>
                        <TouchableOpacity style={styles.tryAgainBtn} onPress={resetQuiz}>
                            <Ionicons name="refresh" size={20} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.tryAgainText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFEFF6",
        padding: 20,
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 35,
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
    banner: {
        width: "35%",
        height: 100,
        marginBottom: 40,
        borderRadius: 12,
        left: 100,
    },
    introCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        margin: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    introTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4B006E",
        marginBottom: 12,
        textAlign: "center",
    },
    introText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginVertical: 6,
    },
    startButton: {
        marginTop: 24,
        backgroundColor: "#8A63D2",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#8A63D2",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    quizBox: {
        alignItems: "center",
    },
    timer: {
        fontSize: 16,
        marginBottom: 8,
        color: "#8A63D2",
    },
    question: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#4B006E",
        textAlign: "center",
    },
    image: {
        width: width * 0.5,
        height: width * 0.5,
        marginBottom: 16,
    },
    option: {
        padding: 16,
        marginVertical: 8,
        width: "100%",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    optionText: {
        fontSize: 16,
        textAlign: "center",
        color: "#333",
    },
    resultCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        margin: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    resultEmoji: {
        fontSize: 48,
        marginBottom: 8,
    },
    resultTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4B006E",
        marginBottom: 12,
    },
    resultScore: {
        fontSize: 20,
        color: "#333",
        marginBottom: 20,
    },
    scoreHighlight: {
        color: "#8A63D2",
        fontWeight: "bold",
        fontSize: 22,
    },
    tryAgainBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#8A63D2",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    tryAgainText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})
