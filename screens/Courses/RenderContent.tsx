import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AxiosInstance from "../Auth/AxiosInstance";

export const RenderContent = (props) => {
  const [content, setContent] = useState([]);
  const [completion, setCompletion] = useState([]);
  const [quizContent, setQuizContent] = useState([]);
  const navigation = useNavigation();
  const getData = async (unit) => {
    try {
      let response = await AxiosInstance.get(`/lessons?unit=${unit}`);
      // const response = await fetch(
      //   `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons?unit=` +
      //     unit,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: bearer,
      //     },
      //   }
      // );
      // const json = await response.json();
      setContent(response.data.records);
    } catch (error) {
      console.error("lesson error-" + error);
    } finally {
      //   setLoading(false);
    }
  };
  const getCompletionData = async () => {
    const courseSlug = await AsyncStorage.getItem("courseSlug");
    try {
      console.log("courseSlug - " + courseSlug);
      let response = await AxiosInstance.get(`/catalog-tracking/${courseSlug}`);
      setCompletion(response.data.response);
      console.log("Completion - " + completion);
    } catch (error) {
      console.error(error);
    } finally {
      //   setLoading(false);
    }
  };
  const getQuizData = async (unit) => {
    try {
      let response = await AxiosInstance.get(`/quiz?unit=${unit}`);
      // const response = await fetch(
      //   `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/quiz?unit=` +
      //     unit,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: bearer,
      //     },
      //   }
      // );
      // const json = await response.json();
      setQuizContent(response.data.records);
    } catch (error) {
      console.error("Quiz error-" + error);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    if (props.section) {
      getData(props.section.slug);
      getQuizData(props.section.slug);
    }
    getCompletionData();
  }, []);

  // const moduleTitle = props.module;

  const unitSlug = props.section.slug;
  if (content !== undefined && Object.keys(content).length !== 0) {
    return (
      <View>
        {content.map((value, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LessonScreen", {
                value,
                content,
                index,
                unitSlug,
              });
            }}
          >
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <View style={{ width: "10%" }}>
                <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/tick.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                />
              </View>
              <View style={{ marginLeft: 10, width: "75%" }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: "Poppins-Medium",
                    fontSize: Font.h5,
                    color: "#3E3E3E",
                    marginTop: 9,
                    marginRight: 10,
                  }}
                  numberOfLines={3}
                >
                  {value.title}
                </Text>
              </View>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                {value.lesson_type === "video" ? (
                  <WithLocalSvg
                    width={16}
                    height={16}
                    asset={require("../../assets/Vector.svg")}
                    style={{ marginTop: 15, marginLeft: 15 }}
                  />
                ) : (
                  <WithLocalSvg
                    width={16}
                    height={16}
                    asset={require("../../assets/fluent_document-20-filled.svg")}
                    style={{ marginTop: 15, marginLeft: 15 }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {quizContent ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Quiz", quizContent[0]);
            }}
          >
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <View style={{ width: "10%" }}>
                <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/tick.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                />
              </View>
              <View style={{ marginLeft: 10, width: "75%" }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: "Poppins-Medium",
                    fontSize: Font.h5,
                    color: "#3E3E3E",
                    marginTop: 9,
                    marginRight: 10,
                  }}
                  numberOfLines={3}
                >
                  Quiz
                </Text>
              </View>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/fluent_document-20-filled.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  } else return <Text> Loading ...</Text>;
};
