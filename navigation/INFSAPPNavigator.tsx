import React, { useState } from "react";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import dummy from "../components/dummy";
import IntroSliderScreen from "../screens/StartUp/IntroSliderScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
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
import AdfTohtml from "../screens/Courses/AdfTohtml";
import UnitScreenForCourses from "../screens/Courses/UnitScreenForCourses";
import LessonScreen from "../screens/Courses/LessonScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import { AuthContext } from "../components/Context";
import Workbook from "../screens/Courses/Workbook";

const INFSAPPNavigator = (props) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const userToken = String(data.access);
        //console.log("userToken - " + userToken);

        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("refreshToken", data.refresh);
          //let token = await AsyncStorage.getItem("userToken");

          //console.log("storage userToken - " + token);
        } catch (e) {
          console.log(e);
        }
        //console.log("token : " + userToken);
        dispatch({ type: "LOGIN", token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken("abcd");
        // setIsLoading(false);
      },
    }),
    []
  );
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@isNavigatedFirstTime");
    } catch (e) {}
  };
  const Stack = createStackNavigator();
  React.useEffect(() => {
    setTimeout(async () => {
      getData();
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {/*<Stack.Screen
            name="Path"
            component={PathGeneration}
            options={{ headerShown: false }}
          />*/}
            {/* 
            {props.isIntroScreen ? (
              <Stack.Screen
                name="Intro"
                component={IntroSliderScreen}
                options={{ headerShown: false }}
              />
            ) : null} */}

            {loginState.userToken !== null ? (
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  headerTitleStyle: { fontFamily: "Poppins-Regular" },
                  headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
                }}
              />
            )}

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
              name="Workbook"
              component={Workbook}
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
              name="UnitScreenForCourses"
              component={UnitScreenForCourses}
              options={{
                headerShown: false,
                headerTitleStyle: { fontFamily: "Poppins-Regular" },
                headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
              }}
            />
            <Stack.Screen
              name="LessonScreen"
              component={LessonScreen}
              options={{
                headerShown: false,
                headerTitleStyle: { fontFamily: "Poppins-Regular" },
                headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
              }}
            />
            <Stack.Screen
              name="AdfTohtml"
              component={AdfTohtml}
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
                headerShown: false,
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
            {/* <Stack.Screen
            name="UnitTextScreenFirst"
            component={UnitTextScreenFirst}
            options={{
              headerShown: false,
              headerTitleStyle: { fontFamily: "Poppins-Regular" },
              headerBackTitleStyle: { fontFamily: "Poppins-Regular" },
            }}
          /> */}
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
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default INFSAPPNavigator;
