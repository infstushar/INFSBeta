import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Font from "../../constants/Font";
import AdfTohtml from "../Courses/AdfTohtml";

const { width, height } = Dimensions.get("window");

const scale = width / 415;
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS == "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const UnitTextScreen = (props) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: height }}>
      <ScrollView
        contentContainerStyle={{
          marginLeft: 15,
          marginRight: 10,
        }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setAccepted(true);
          }
        }}
      >
        <View style={{ height: 5 }} />
        <AdfTohtml
          source={props.source.content}
          bgStyle={{
            backgroundColor: "#F8F8F8",
            marginTop: 20,
            paddingVertical: 15,
            marginLeft: 15,
          }}
        ></AdfTohtml>

        <View style={{ height: 200 }}></View>
      </ScrollView>
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

export default UnitTextScreen;
