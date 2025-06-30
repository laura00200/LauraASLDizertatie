import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import HomeScreen from "../screens/HomeScreen"
import CommunityScreen from "../screens/Community"
import AlphabetScreen from "../screens/AlphabetScreen"
import DictionaryScreen from "../screens/DictionaryScreen"
import TranslateScreen from "../screens/TranslateScreen"
import QuizScreen from "../screens/QuizScreen"
import ShowTranslation from "../screens/ShowTranslation"
import FingerspellingScreen from "../screens/FingerspellingScreen";
import FingerspellingWords from "../screens/FingerspellingWords";
import FingerspellingLetters from "../screens/FingerspellingLetters";


const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
                <Stack.Screen name="AlphabetScreen" component={AlphabetScreen} />
                <Stack.Screen name="DictionaryScreen" component={DictionaryScreen} />
                <Stack.Screen name="TranslateScreen" component={TranslateScreen} />
                <Stack.Screen name="ShowTranslation" component={ShowTranslation} />
                <Stack.Screen name="QuizScreen" component={QuizScreen} />
                <Stack.Screen name="FingerspellingScreen" component={FingerspellingScreen} />
                <Stack.Screen name="FingerspellingWords" component={FingerspellingWords} />
                <Stack.Screen name="FingerspellingLetters" component={FingerspellingLetters} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
