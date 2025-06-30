import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TranslateScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [cameraType, setCameraType] = useState("back");
    const [isRecording, setIsRecording] = useState(false);
    const navigation = useNavigation();

    const uploadVideoForPrediction = async (videoUri) => {
        const videoName = videoUri.split("/").pop();
        const videoType = "video/mp4";

        const formData = new FormData();
        formData.append("file", {
            uri: videoUri,
            name: videoName,
            type: videoType,
        });

        try {
            const response = await fetch("http://192.168.100.6:8000/asl/predict", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const result = await response.json();

            // Reverse label order so the first sign recorded appears first
            const labels = Object.keys(result.predicted_labels).reverse();
            const prediction = labels.join(" ");

            console.log("Prediction received:", prediction);
            navigation.navigate("ShowTranslation", { prediction });
        } catch (error) {
            console.error("Upload failed:", error);
            Alert.alert("Error", "Failed to get prediction from server.");
        }
    };

    const startRecording = async () => {
        if (!cameraRef.current) return;

        try {
            setIsRecording(true);
            const video = await cameraRef.current.recordAsync({ mute: true });
            console.log("Video recorded:", video.uri);
            await uploadVideoForPrediction(video.uri);
        } catch (error) {
            console.error("Recording failed:", error);
            Alert.alert("Error", "Recording failed");
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (cameraRef.current) {
            setIsRecording(false);
            cameraRef.current.stopRecording();
        }
    };

    const toggleCamera = () => {
        setCameraType(prev => (prev === "back" ? "front" : "back"));
    };

    if (!permission) {
        return <View><Text>Requesting permissions...</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Camera access is needed to record videos.</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={cameraType}
                    mode="video"
                    mute={true}
                />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={toggleCamera}>
                    <Ionicons name="camera-reverse" size={22} color="#fff"/>
                    <Text style={styles.buttonText}>Flip</Text>
                </TouchableOpacity>

                {!isRecording ? (
                    <TouchableOpacity style={styles.button} onPress={startRecording}>
                        <Ionicons name="recording-outline" size={22} color="#fff"/>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.buttonStop} onPress={stopRecording}>
                        <Ionicons name="stop-circle" size={22} color="#fff"/>
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 12,
    },
    cameraContainer: {
        flex: 1,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 14,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#4B0082",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        gap: 6,
    },
    buttonStop: {
        flexDirection: "row",
        backgroundColor: "#d24c63",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        gap: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    permissionText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 12,
    },
});
