import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
  TouchableHighlight,
  Alert,
  FlatList,
  StatusBar,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WithLocalSvg } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import AxiosInstance from "../Auth/AxiosInstance";
import Header from "../../components/HeaderwithBack";
import Accordion from "react-native-collapsible/Accordion";
import Font from "../../constants/Font";
import { useIsFocused } from "@react-navigation/native";

import { RenderContent } from "./RenderContent";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = width / 415;
// const normalize = (size) => {
//   const newSize = size * scale;
//   if (Platform.OS == "ios") {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
//   }
// };

const UnitScreenForCourses = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [workbookcontent, setWorkbookContent] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [completionLesson, setCompletionLesson] = useState([]);
  const [completion, setCompletion] = useState([]);
  const [courseSlug, setCourseSlug] = useState();

  const courseId = props?.route?.params?.course;
  const moduleId = props?.route?.params?.id
    ? props?.route?.params?.id
    : props?.route?.params?.slug;

  const getData = async () => {
    try {
      let response = await AxiosInstance.get(
        props?.route?.params?.id
          ? `units?module=${props?.route?.params?.id}`
          : `units?module=${props?.route?.params?.slug}`
      );

      await AsyncStorage.setItem(
        "moduleSlug",
        props?.route?.params?.id
          ? props?.route?.params?.id
          : props?.route?.params?.slug
      );

      // console.log("unit API call for UnitScreenForCourse");
      setData(response.data);
    } catch (error) {
      console.error("type; " + error);
    } finally {
      setLoading(false);
    }
  };

  const getWorkbookData = async () => {
    try {
      let response = await AxiosInstance.get(
        props?.route?.params?.id
          ? `/workbook?module=${props?.route?.params?.id}`
          : `/workbook?module=${props?.route?.params?.slug}`
      );

      setWorkbookContent(response.data.records);
      // console.log(
      //   "workbook API call for UnitScreenForCourse" + workbookcontent
      // );
    } catch (error) {
      console.error("workbook Error:-" + error);
    } finally {
      //   setLoading(false);
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

  const getCompletedLessons = (unitId) => {
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
      setCompletionLesson(tempVar);
      return tempVar;
    }
  };

  useEffect(() => {
    getData();
    getWorkbookData();

    const willFocusSubscription = props.navigation.addListener("focus", () => {
      getCompletionData();
    });

    return willFocusSubscription;
  }, []);

  //const moduleTitle = data?.records[0]?.parent_entity_id;
  const toggleExpanded = () => {
    // Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    // Accordion header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            height: 50,
            marginBottom: 15,
          }}
        >
          {/* <Text style={styles.headerText}>{section.order} - </Text> */}
          <View style={{ marginLeft: 5, marginRight: 30 }}>
            <Text
              style={{
                marginRight: 30,
                marginTop: 5,
                fontFamily: "Poppins-Regular",
                fontSize: Font.h6,
                marginLeft: 5,
                color: "#3E3E3E",
              }}
              numberOfLines={2}
            >
              {section.title}
            </Text>
          </View>
          {isActive ? (
            <Icon
              name="angle-up"
              size={25}
              color="#555555"
              style={{
                position: "absolute",
                right: 5,
                top: 5,
                bottom: 5,
              }}
            />
          ) : (
            <Icon
              name="angle-down"
              size={25}
              color="#555555"
              style={{
                marginBottom: 3,
                position: "absolute",
                right: 5,
                top: 5,
                bottom: 5,
              }}
            />
          )}
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    // console.log("section.slug -" + section.slug);
    let completionLesson = getCompletedLessons(section.slug);
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <RenderContent
          section={section}
          course={courseId}
          module={moduleId}
          completiondata={completionLesson}
        />
      </Animatable.View>
    );
  };
  let completedLessonArray;
  //console.log("lesson - " + completionLesson);
  // if (completion)
  //   console.log("Completion at render" + JSON.stringify(completion));
  return (
    <View style={{ backgroundColor: "#FFFFFF", height: height }}>
      <Header
        title={props?.route?.params?.module_code}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />

      <Text
        style={{
          marginTop: 15,
          fontFamily: "Poppins-Bold",
          fontSize: Font.h4,
          color: "#00B5E0",
          marginLeft: 15,
        }}
        numberOfLines={2}
      >
        {props?.route?.params?.title}
      </Text>
      <ScrollView>
        {data && data.records
          ? // <Accordion
            //   activeSections={activeSections}
            //   // For any default active section
            //   sections={data.records}
            //   // Title and content of accordion
            //   touchableComponent={TouchableOpacity}
            //   // Which type of touchable component you want
            //   // It can be the following Touchables
            //   // TouchableHighlight, TouchableNativeFeedback
            //   // TouchableOpacity , TouchableWithoutFeedback
            //   expandMultiple={multipleSelect}
            //   // If you want to expand multiple at a time
            //   renderHeader={renderHeader}
            //   // Header Component(View) to render
            //   renderContent={renderContent}
            //   // Content Component(View) to render
            //   duration={400}
            //   // Duration for Collapse and expand
            //   onChange={setSections}
            //   // Setting the state of active sections
            // />
            //console.log("data + " + JSON.stringify(data.records))

            data.records.map((value) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("UnitLesson", {
                    value,
                    completedLessonArray: getCompletedLessons(value.slug),
                    moduleId,
                    courseId,
                  })
                }
                style={[
                  styles.inactive,
                  {
                    margin: 10,
                    height: 50,
                  },
                ]}
              >
                <Text
                  style={{
                    marginRight: 20,
                    marginTop: 5,
                    //fontFamily: "Poppins-Regular",
                    fontSize: Font.h6,
                    marginLeft: 10,
                    color: "#484848",
                  }}
                  numberOfLines={2}
                >
                  {value.title}
                </Text>
              </TouchableOpacity>
            ))
          : null}

        {workbookcontent ? (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Workbook", workbookcontent[0]);
            }}
          >
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                height: 50,
              }}
            >
              <View style={styles.inactive}>
                <View
                  style={{
                    flexDirection: "row",
                    height: "100%",
                  }}
                >
                  {/* <Image
                    source={require("../../assets/image.png")}
                    style={{ marginTop: 15, marginLeft: 10 }}
                  /> */}
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
                    Workbook
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
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
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    margin: 10,
    height: 50,
    width: width,
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: Font.h6,
    margin: 10,
    marginTop: 5,
  },
  header: {
    backgroundColor: "#EDEDED",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 60,
    alignContent: "center",
  },
  headerText: {
    fontFamily: "Poppins-Regular",
    fontSize: Font.h6,
    marginTop: 5,
    marginLeft: 5,
    color: "#3E3E3E",
  },
  content: {
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  active: { backgroundColor: "#f2fbfd" },
  inactive: {
    backgroundColor: "#EDEDED",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default UnitScreenForCourses;
