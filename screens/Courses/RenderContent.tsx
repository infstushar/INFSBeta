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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AxiosInstance from "../Auth/AxiosInstance";

export const RenderContent = (props) => {
  const [content, setContent] = useState([]);

  const [quizContent, setQuizContent] = useState([]);

  const navigation = useNavigation();

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
  // const getAPICall = async () => {
  //   if (props.section) {
  //     await getData(props.section.slug);
  //     await getQuizData(props.section.slug);
  //   }
  //   await getCompletionData();
  // };

  useEffect(() => {
    if (props.section) {
      getData(props.section.slug);
      getQuizData(props.section.slug);
    }
  }, []);

  if (content !== undefined && Object.keys(content).length !== 0) {
    return (
      <View
        style={{
          alignItems: "flex-start",
          paddingStart: -10,
          paddingTop: 10,
          width: "95%",
          borderRadius: 15,
          backgroundColor: "rgba(255, 255, 255, 255)",
          shadowColor: "f2f2f2",
          shadowOpacity: 1,
          shadowOffset: 0,
          shadowRadius: 25,
        }}
      >
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
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
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
              <View style={{ marginLeft: 10, width: "10%" }}>
                <Text
                  style={{
                    marginTop: 10,
                    fontFamily: "Poppins-Regular",
                    fontSize: Font.h6,
                    marginLeft: 15,
                    color: "rgba(209, 218, 219, 255)",
                  }}
                  numberOfLines={3}
                >
                  {value.order}
                </Text>
              </View>
              <View style={{ marginLeft: 10, width: "65%" }}>
                <Text
                  style={{
                    marginTop: 10,
                    fontFamily: "Poppins-Regular",
                    fontSize: Font.h6,
                    marginLeft: 5,
                    color: "#3E3E3E",
                  }}
                  numberOfLines={3}
                >
                  {value.title}
                </Text>
              </View>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                {value.lesson_type === "video" ? (
                  // <WithLocalSvg
                  //   width={16}
                  //   height={16}
                  //   asset={require("../../assets/Vector.svg")}
                  //   style={{ marginTop: 15, marginLeft: 15 }}
                  // />
                  <Icon
                    name="play-circle"
                    size={18}
                    color="gray"
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
            <View
              style={{
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
                width: "95%",
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        ))}

        {quizContent ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Quiz", quizContent[0]);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
                marginBottom: 15,
                marginTop: 15,
              }}
            >
              <View style={{ width: "5%" }}>
                {/* {props.completiondata &&
                props.completiondata.includes(value.slug) ? (
                  <WithLocalSvg
                    width={16}
                    height={16}
                    asset={require("../../assets/tick.svg")}
                    style={{ marginTop: 15, marginLeft: 15 }}
                  />
                ) : null} */}
              </View>
              {/* <View style={{ width: "5%" }}>
                {/* <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/tick.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                /> */}
              {/* </View>  */}
              <View style={{ marginLeft: 10, width: "10%" }}>
                <Text
                  style={{
                    marginTop: 10,
                    fontFamily: "Poppins-Regular",
                    fontSize: Font.h6,
                    marginLeft: 15,
                    color: "rgba(209, 218, 219, 255)",
                  }}
                  numberOfLines={3}
                >
                  9
                </Text>
              </View>
              <View style={{ marginLeft: 10, width: "65%" }}>
                <Text
                  style={{
                    marginTop: 10,
                    fontFamily: "Poppins-Regular",
                    fontSize: Font.h6,
                    marginLeft: 15,
                    color: "#3E3E3E",
                  }}
                  numberOfLines={3}
                >
                  Quiz
                </Text>
              </View>
              <View>
                {/* <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/fluent_document-20-filled.svg")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                /> */}
                {/* <Image
                  source={require("../../assets/image.png")}
                  style={{ marginTop: 15, marginLeft: 15 }}
                /> */}
                <Icon
                  name="head-question"
                  size={24}
                  color="gray"
                  style={{ marginTop: 5, marginLeft: 15 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  } else return <Text> Loading ...</Text>;
};
