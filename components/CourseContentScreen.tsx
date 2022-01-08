import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Font from "../constants/Font";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");

const CourseContentScreen = (props) => {
  return (
    <TouchableHighlight
      onPress={() => {
        props.onPress();
      }}
    >
      <View
        style={{
          width: width,
          backgroundColor: props.bgColor,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: Font.h5,
            color: "#00B5E0",
          }}
        >
          {props.title}
        </Text>
        <View style={{ width: "80%" }}>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: Font.p1,
              color: "#838383",
            }}
            numberOfLines={2}
          >
            INFS Basic Nutrition and Fitness Course is designed specifically
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  horizontalline: {
    backgroundColor: "#00000029",
    height: 1,
    width: wp("95%"),
    marginTop: 5,
    marginLeft: 15,
  },
});

export default CourseContentScreen;
