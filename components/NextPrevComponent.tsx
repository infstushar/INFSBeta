import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Font from "../constants/Font";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

let countOfData = 0;

const NextPrevComponent = (props) => {
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();

  const Next = () => {
    props.modifyIndex("next");
  };
  const Prev = () => {
    props.modifyIndex("prev");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        position: "absolute",
        top: height - 80,
        width: width,
      }}
    >
      <TouchableOpacity
        style={
          props.currentIndex !== 0
            ? {
                flexDirection: "row",
                height: 40,
                width: "35%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 30,
                borderRadius: 29,
                backgroundColor: "#EDEDED",
                shadowColor: "#00000029",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 3,
                marginLeft: 40,
              }
            : { display: "none" }
        }
        onPress={() => {
          Prev();
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: "#838383",
            fontSize: Font.h6,
            fontFamily: "Poppins-Regular",
          }}
        >
          Previous Lesson
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          props.currentIndex !== props.length - 1
            ? {
                flexDirection: "row",
                height: 40,
                width: "35%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 30,
                borderRadius: 29,
                backgroundColor: "#00B5E0",
                shadowColor: "#00000029",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 3,
                marginLeft: 40,
              }
            : { display: "none" }
        }
        onPress={() => {
          //if (currentIndex < countOfData)
          Next();
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: "#FFFFFF",
            fontSize: Font.h6,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Next Lesson
        </Text>
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

export default NextPrevComponent;
