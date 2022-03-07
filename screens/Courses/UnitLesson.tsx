import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import { Tab, TabView } from "react-native-elements";
import AxiosInstance from "../Auth/AxiosInstance";
import Header from "../../components/HeaderwithBack";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";
//import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialTabs from "react-native-material-tabs";

const UnitLesson = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [content, setContent] = useState([]);
  const [completion, setCompletion] = useState([]);
  const courseId = props?.route?.params?.courseId;
  const moduleId = props?.route?.params?.moduleId;
  const [quizContent, setQuizContent] = useState([]);
  const unitId = props?.route?.params?.value.slug;
  const unitSlug = props?.route?.params?.value.slug;

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
  const getCompletionData = async () => {
    try {
      //   console.log("courseSlug - " + courseSlug);
      await AxiosInstance.get(`/catalog-tracking/${courseId}`).then(
        (response) => {
          setCompletion(response.data.response);
          // console.log(
          //   "Completion API call for UnitScreenForCourse" +
          //     JSON.stringify(response.data)
          // );
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props?.route?.params?.value.slug) {
      getData(props?.route?.params?.value.slug);
      getQuizData(props?.route?.params?.value.slug);
    }
    getCompletionData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      getCompletionData();
    });

    return willFocusSubscription;
  }, []);

  const getCompletedLessons = () => {
    var tempVar =
      completion && completion !== undefined
        ? completion[courseId] && completion[courseId] !== undefined
          ? completion[courseId][moduleId] &&
            completion[courseId][moduleId] !== undefined
            ? completion[courseId][moduleId][unitId] &&
              completion[courseId][moduleId][unitId] !== undefined
              ? completion[courseId][moduleId][unitId]["completed_lessons"]
              : null
            : null
          : null
        : null;

    // if (tempVar !== null) {
    //   props.section["completedLessons"].push(tempVar);
    //   console.log("Id Props 1- " + JSON.stringify(props));
    // }
    if (tempVar !== null) {
      //console.log(unitId + " completed lessons : " + JSON.stringify(tempVar));
      return tempVar;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "f2f2f2",
      }}
    >
      <Header
        title={`Unit - ${props?.route?.params?.value.order}`}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 255)",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            // fontFamily: "Poppins-Medium",
            fontSize: Font.h5,
            fontWeight: "600",
            color: "#484848",
            marginTop: 15,
            marginLeft: 15,
            marginBottom: 15,
          }}
        >
          {props?.route?.params?.value.title}
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          margin: 20,
        }}
      >
        <MaterialTabs
          items={["Lessons", "Quiz"]}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
          barColor="transparent"
          indicatorColor="#00B5E0"
          activeTextColor="#00B5E0"
          inactiveTextColor="gray"
        />
      </View>
      {
        <View
          style={{
            borderRadius: 15,
            backgroundColor: "rgba(255, 255, 255, 255)",
            margin: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            paddingBottom: 10,
          }}
        >
          {selectedTab == 0
            ? content.map((value, index) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("LessonScreen", {
                      value,
                      content,
                      index,
                      unitSlug,
                      quizContent,
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
                    <View style={{ width: "10%" }}>
                      {getCompletedLessons() &&
                      getCompletedLessons().includes(value.slug) ? (
                        <WithLocalSvg
                          width={16}
                          height={16}
                          asset={require("../../assets/tick.svg")}
                          style={{ marginTop: 15, marginLeft: 15 }}
                        />
                      ) : (
                        <View style={{ marginLeft: 17 }}>
                          <Text
                            style={{
                              marginTop: 10,
                              //fontFamily: "Poppins-Regular",
                              fontSize: Font.h6,

                              color: "rgba(209, 218, 219, 255)",
                            }}
                            numberOfLines={3}
                          >
                            {value.order}
                          </Text>
                        </View>
                      )}
                    </View>
                    {/* <View style={{ marginLeft: 10, width: "10%" }}>
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
                    </View> */}
                    <View style={{ marginLeft: 15, width: "65%" }}>
                      <Text
                        style={{
                          marginTop: 10,
                          //fontFamily: "Poppins-Regular",
                          fontSize: Font.h6,
                          marginLeft: 5,
                          color: "#484848",
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
                  {index !== content.length - 1 ? (
                    <View
                      style={{
                        borderBottomColor: "#f2f2f2",
                        borderBottomWidth: 1,
                        width: "95%",
                        marginLeft: 10,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              ))
            : null}

          {selectedTab == 1 ? (
            quizContent ? (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Quiz", quizContent[0]);
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
                        //fontFamily: "Poppins-Regular",
                        fontSize: Font.h6,
                        marginLeft: 15,
                        color: "rgba(209, 218, 219, 255)",
                      }}
                      numberOfLines={3}
                    >
                      1
                    </Text>
                  </View>
                  <View style={{ marginLeft: 10, width: "65%" }}>
                    <Text
                      style={{
                        marginTop: 10,
                        //fontFamily: "Poppins-Regular",
                        fontSize: Font.h6,
                        marginLeft: 10,
                        color: "#484848",
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
            ) : null
          ) : null}
        </View>
      }
    </View>
  );
};
export default UnitLesson;
