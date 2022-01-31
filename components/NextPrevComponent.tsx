import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Font from "../constants/Font";

const NextPrevComponent = (props) => {
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
          Prev();
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
          Previous
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
                marginLeft: props.currentIndex !== 0 ? 40 : width / 2 + 20,
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
          Next
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
