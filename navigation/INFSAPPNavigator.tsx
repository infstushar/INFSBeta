import * as React from "react";
import { View, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import dummy from "../components/dummy";
import IntroSliderScreen from "../screens/StartUp/IntroSliderScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "../screens/ScreenNavigator/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import PreferenceScreen from "../screens/StartUp/PreferenceScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
import OpenQuizTaskScreen from "../screens/Quiz/OpenQuizTaskScreen";
import StartingQuizScreen from "../screens/Quiz/StartingQuizScreen";
import PathGeneration from "../screens/PathGeneration";
import DecisionScreen from "../screens/StartUp/DecisionScreen";
import QuizScreen from "../screens/Quiz/StartingQuizScreen";
import ProfileScreen from "../screens/ScreenNavigator/ProfileScreen";
import CourseScreen from "../screens/ScreenNavigator/CourseScreen";
import CardComponent from "../components/CardCoponentScreent";
import CourseDetails from "../screens/Courses/CourseDetailScreen";
import Module from "../screens/Courses/ModuleScreen";
import ModuleDetails from "../screens/Courses/ModuleDetails";
import ForgotUserScreen from "../screens/Auth/ForgotUserScreen";
import UnitScreen from "../screens/Courses/UnitScreen";
import UnitTextScreen from "../screens/Courses/UnitTextScreen";
import UnitVideoTextScreen from "../screens/Courses/UnitVideoTextScreen";
import UnitTextScreenFirst from "../screens/Courses/UnitTextScreenFirst";
import TermsAndConditions from "../screens/EntryScreen/TermsAndConditions";
import QuizForStartUpScreen from "../screens/Quiz/QuizForStartUpScreen";
import Atkit from "../screens/Courses/Atkit";

const INFSAPPNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/*<Stack.Screen
            name="Path"
            component={PathGeneration}
            options={{ headerShown: false }}
          />*/}
          <Stack.Screen
            name="Intro"
            component={IntroSliderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="CardScreen"
            component={CardComponent}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />

          <Stack.Screen
            name="TandCScreen"
            component={TermsAndConditions}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="Atkit"
            component={Atkit}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="ForgotUsername"
            component={ForgotUserScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="Decision"
            component={DecisionScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />

          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: true,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />

          <Stack.Screen
            name="Courses"
            component={CourseScreen}
            options={{
              headerShown: true,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />

          <Stack.Screen
            name="UnitVideoTextScreen"
            component={UnitVideoTextScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="QuizForStartUpScreen"
            component={QuizForStartUpScreen}
            options={{
              headerShown: true,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="Module"
            component={Module}
            options={{
              headerShown: true,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="CourseDetails"
            component={CourseDetails}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="UnitScreen"
            component={UnitScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="ModuleDetails"
            component={ModuleDetails}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="Dummy"
            component={dummy}
            options={{ title: "Path" }}
          />
          <Stack.Screen
            name="Preference"
            component={PreferenceScreen}
            options={{
              headerShown: true,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="UnitTextScreen"
            component={UnitTextScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="UnitTextScreenFirst"
            component={UnitTextScreenFirst}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="StudentDecision"
            component={OpenQuizTaskScreen}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              /*  headerRight: () => (
            <Icon color='#20BEC9' name="ios-lock-open" size={25} style={{marginRight:15}} onPress={()=>{
              Alert.alert('Reset Password Here!')
            }}></Icon>
          ),
          */
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default INFSAPPNavigator;
