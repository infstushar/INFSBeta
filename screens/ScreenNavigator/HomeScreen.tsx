import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CourseScreen from "./CourseScreen";
import PathGeneration from "../../screens/PathGeneration";
import ProfileScreen from "../ScreenNavigator/ProfileScreen";
import { WithLocalSvg } from "react-native-svg";

const Tab = createMaterialBottomTabNavigator();
function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details!</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="Course" component={CourseScreen} />
    </HomeStack.Navigator>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Courses"
      shifting={false}
      barStyle={{ backgroundColor: "white" }}
      activeColor={Colors.textColor}
      inactiveColor="#838383"
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Path"
        component={PathGeneration}
        options={{
          title: "Path",
          tabBarIcon: ({ color }) => (
            <WithLocalSvg
              width={26}
              height={20}
              asset={require("../../assets/Path.svg")}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Courses"
        component={CourseScreen}
        options={{
          title: "Courses",
          tabBarIcon: ({ color }) => (
            <WithLocalSvg
              width={20}
              height={22}
              asset={require("../../assets/Course.svg")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeStackScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <WithLocalSvg
              width={25}
              height={25}
              asset={require("../../assets/Profile.svg")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const HomeScreen = () => {
  return <BottomTabs />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
