import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Font from "../constants/Font";
import AxiosInstance from "../screens/Auth/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const NextPrevComponent = (props) => {
  useEffect(() => {
    if (props.currentIndex !== props.length) {
      postLessonUpdate();
    }
  }, [props.currentIndex]);

  const postLessonUpdate = async () => {
    const courseSlug = await AsyncStorage.getItem("courseSlug");
    const moduleSlug = await AsyncStorage.getItem("moduleSlug");
    // console.log("courseSlug +" + courseSlug);
    // console.log("moduleSlug +" + moduleSlug);
    // console.log(
    //   "moduleSlug New +" + (await AsyncStorage.getItem("moduleSlug"))
    // );
    // console.log("props.unitSlug +" + props.unitSlug);
    // console.log("props.content.slug +" + props.content.slug);
    // const newcourseSlug = JSON.parse(courseSlug);
    // const newmoduleSlug = JSON.parse(moduleSlug);

    let postData = {
      course: courseSlug,
      module: moduleSlug,
      unit: props.unitSlug,
      lesson: props.content.slug,
      lesson_status: 1,
    };

    try {
      let response = await AxiosInstance.post(`/update-lesson`, postData);
      if (response.status == 200) {
        console.log("marked as read");
      } else {
        console.log("marked unsuccessfull");
      }
    } catch (e) {
      console.log("Error -" + e);
    }
  };

  const Next = () => {
    props.modifyIndex("next");
  };
  const Prev = () => {
    props.modifyIndex("prev");
  };
  const Quiz = () => {
    props.modifyIndex("quiz");
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: height - 80,
        width: width,
        flexDirection: "row",
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
      {props.currentIndex !== props.length - 1 ? (
        <TouchableOpacity
          style={{
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
          }}
          onPress={() => {
            Next();
            postLessonUpdate();
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
      ) : (
        <TouchableOpacity
          style={{
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
          }}
          onPress={() => {
            Quiz();
            postLessonUpdate();
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
      )}
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
