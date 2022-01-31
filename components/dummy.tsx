import React from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

const dummy = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {/* <Button
        onPress={() => {
          props.navigation.navigate("ResetPassword", { login: false });
        }}
      >
        Reset Password
      </Button>
      <Button
        onPress={() => {
          props.navigation.navigate("Login", { login: true });
        }}
      >
        LogOut

      </Button> */}
      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          fontSize: 17,
          color: "#00B5E0",
        }}
      >
        {" "}
        Upcomming event ...
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Quiz");
        }}
      >
        <Text>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default dummy;
