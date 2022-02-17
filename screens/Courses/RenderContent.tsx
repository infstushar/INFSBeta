import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

import AxiosInstance from "../Auth/AxiosInstance";
import { set } from "lodash";

export const RenderContent = (props) => {
  const [content, setContent] = useState([]);
  const [completion, setCompletion] = useState([]);
  const [quizContent, setQuizContent] = useState([]);

  const navigation = useNavigation();

  //const completedLessonArray = [];
  props.section["completedLessons"] = [];

  const courseId = props?.course;
  const moduleId = props?.module;
  const unitSlug = props.section.slug;

  const getData = async (unit) => {
    try {
      await AxiosInstance.get(`/lessons?unit=${unit}`).then((response) => {
        setContent(response.data.records);
      });
    } catch (error) {
      console.error("lesson error-" + error);
    } finally {
      //   setLoading(false);
    }
  };

  const getCompletionData = async () => {
    try {
      //console.log("courseSlug - " + courseSlug);

      await AxiosInstance.get(`/catalog-tracking/${courseId}`).then(
        (response) => {
          setCompletion(response.data.response);
        }
      );
      // setCompletion(response.data.response);
    } catch (error) {
      console.error(" copmletion - " + error);
    }
  };

  const getQuizData = async (unit) => {
    try {
      await AxiosInstance.get(`/quiz?unit=${unit}`).then((response) => {
        setQuizContent(response.data.records);
      });
    } catch (error) {
      setQuizContent(undefined);
      console.error("Quiz error-" + error);
    }
  };
  const getAPICall = async () => {
    if (props.section) {
      await getData(props.section.slug);
      await getQuizData(props.section.slug);
    }
    await getCompletionData();
  };

  // const getCompletedLessons = () => {
  //   var tempVar =
  //     completion && completion !== undefined
  //       ? completion[courseId] && completion[courseId] !== undefined
  //         ? completion[courseId][moduleId] &&
  //           completion[courseId][moduleId] !== undefined
  //           ? completion[courseId][moduleId][unitSlug] &&
  //             completion[courseId][moduleId][unitSlug] !== undefined
  //             ? completion[courseId][moduleId][unitSlug]["completed_lessons"]
  //             : null
  //           : null
  //         : null
  //       : null;

  //   // if (tempVar !== null) {
  //   //   props.section["completedLessons"].push(tempVar);
  //   //   console.log("Id Props 1- " + JSON.stringify(props));
  //   // }
  //   if (tempVar !== null) {
  //     // setCompletionLesson(tempVar);
  //   }
  // };

  useEffect(() => {
    getAPICall();
    //getCompletedLessons();
    //console.log(`Course + ${courseId} - Module +${moduleId}`);
  }, []);

  if (content !== undefined && Object.keys(content).length !== 0) {
    return (
      <View style={{ marginLeft: -10 }}>
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
              <View style={{ width: "5%" }}>
                {props.completiondata &&
                props.completiondata.includes(value.slug) ? (
                  <WithLocalSvg
                    width={16}
                    height={16}
                    asset={require("../../assets/tick.svg")}
                    style={{ marginTop: 15, marginLeft: 15 }}
                  />
                ) : null}
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
                  // <WithLocalSvg
                  //   width={16}
                  //   height={16}
                  //   asset={require("../../assets/fluent_document-20-filled.svg")}
                  //   style={{ marginTop: 15, marginLeft: 15 }}
                  // />
                  <Image
                    source={require("../../assets/image.png")}
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
              <View style={{ width: "5%" }}>
                {/* <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/tick.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                /> */}
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
                {/* <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/fluent_document-20-filled.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                /> */}
                <Image
                  source={require("../../assets/image.png")}
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
