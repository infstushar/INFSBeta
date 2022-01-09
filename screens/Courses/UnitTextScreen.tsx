import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Font from "../../constants/Font";
import AdfTohtml from "../Courses/AdfTohtml";
import { WithLocalSvg } from "react-native-svg";
import Header from "../../components/HeaderwithBack";
import ListComponent from "../../components/ListComponent";

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

const UnitTextScreen = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons/` +
          props?.route?.params?.slug
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.warn(props?.route?.params?.slug);
    getData();
  }, []);
  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <Header
        title={data.title}
        onPress={() => {
          props.navigation.goBack("UnitScreen");
        }}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
          marginLeft: 15,
          marginRight: 10,
        }}
      >
        <AdfTohtml
          source={data.content}
          bgStyle={{
            backgroundColor: "#F8F8F8",
            marginTop: 20,
            paddingVertical: 15,

            marginLeft: 15,
          }}
        ></AdfTohtml>
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
