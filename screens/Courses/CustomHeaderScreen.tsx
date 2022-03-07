import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { useNavigation } from "@react-navigation/native";
import AxiosInstance from "../Auth/AxiosInstance";
import AdfTohtml from "./AdfTohtml";
import ListComponent from "../../components/ListComponent";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Chip, List } from "react-native-paper";
import Font from "../../constants/Font";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const windowHeight = Dimensions.get("window").height;
const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const styles = StyleSheet.create({
  headerCotainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "skyblue",
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 20,
    height: 20,
  },
  headerText: {
    color: "white",
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
    fontSize: 20,
    backgroundColor: "skyblue",
  },
  tabTextContainerStyle: {
    backgroundColor: "transparent",
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: "skyblue",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "white",
  },
  tabTextActiveStyle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "white",
  },
  tabWrapperStyle: {
    paddingVertical: 10,
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
  },
  contentContiner: {
    width: "70%",
    borderWidth: 1,
    padding: 10,
  },
  contentText: { margin: 10 },
});

const CustomHeaderScreen = () => {
  const naviagation = useNavigation();

  const back = () => naviagation.goBack();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      let response = await AxiosInstance.get(
        `/courses/basic-nutrition-and-fitness-course`
        // `/courses/${props?.route?.params?.slug}`
      );
      // const response = await fetch(
      //   `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/courses/` +
      //     props?.route?.params?.slug,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: bearer,
      //     },
      //   }
      // );
      //const json = await response.json();
      //   await AsyncStorage.setItem("courseSlug", props?.route?.params?.slug).then(
      //     () => {
      //       console.log("course saved successfully");
      //     }
      //   );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const text = {
    biography: `The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price.
    The assassin droid IG-11 was also dispatched to terminate him. After working together to storm the encampment the infant was being held in, the Mandalorian and IG-11 found the Child. IG-11 then attempted to terminate the Child. The Mandalorian shot the droid before the he was able to assassinate the Child.
    Shortly after, the Mandalorian took the Child back to his ship. On the way they were attacked by a trio of Trandoshan bounty hunters, who attempted to kill the Child. After the Mandalorian defeated them, he and the Child camped out in the desert for the night. While the Mandalorian sat by the fire, the Child ate one of the creatures moving around nearby. He then approached the bounty hunter and attempted to use the Force to heal one of the Mandalorian's wounds. The Mandalorian stopped him and placed him back into his pod. The next day, the pair made it to the Razor Crest only to find it being scavenged by Jawas. The Mandalorian attacked their sandcrawler for the scavenged parts and attempted to climb it while the Child followed in his pod. However, the Mandalorian was knocked down to the ground`,
    powers: "Powers and Abilities",
    appearances: "Appearances",
  };
  const renderContent = (x) => (
    <View style={styles.contentContiner}>
      <Text style={styles.contentText}>{x}</Text>
    </View>
  );
  const checkData = (item) => {
    // const lengnth = Object.keys(data.modules).length;
    // if (lengnth === 0) return 0;
    // else return 1;
    if (item === "workshops") return 1;
    else return 0;
  };

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.headerCotainer}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={back}>
            <Image
              style={styles.headerImage}
              resizeMode="contain"
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1200px-VisualEditor_-_Icon_-_Close_-_white.svg.png",
              }}
            />
          </TouchableOpacity>
          <Animated.View style={{ opacity }}>
            <Text style={styles.headerText}>{data.title}</Text>
          </Animated.View>
        </View>
      </View>
    );
  };

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      backgroundImage={require("../../assets/banner5.jpeg")}
      backgroundColor="skyblue"
      header={renderHeader}
      title={data.title}
      titleStyle={styles.titleStyle}
      tabs={[
        {
          title: "What you will learn",
          content: renderContent(
            <View style={{ margin: 10 }}>
              <ListComponent
                title={"Course Description"}
                sourceData={data.courseoverview?.what_will_you}
                setViewStyle={{
                  paddingVertical: 5,
                  backgroundColor: "#F8F8F8",
                }}
              />
            </View>
          ),
        },
        {
          title: "Course Includes",
          content: renderContent(
            <ListComponent
              title={"Course Description"}
              sourceData={data.courseoverview?.what_will_you}
              setViewStyle={{ margin: 10 }}
            />
          ),
        },
        {
          title: "Course Content",
          content: renderContent(
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: "#3E3E3E",
                  marginLeft: 15,
                  fontFamily: "Poppins-Medium",
                  fontSize: Font.h5,
                }}
              >
                Course Content
              </Text>

              <FlatList
                data={
                  checkData(data.course_type) === 1 ? data.units : data.modules
                }
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View style={{ marginLeft: 15 }}>
                    {/* <CourseContentScreen
                    title={item.title}
                    onPress={() => {
                      if (checkData(data.course_type) === 1)
                        return props.navigation.navigate("UnitScreen", data);
                      else
                        return props.navigation.navigate("ModuleDetails", item);
                    }}
                    bgColor="#F8F8F8"
                  /> */}
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#EAEAEA",
                        marginRight: 15,
                        marginTop: 15,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {item.module_code ? (
                          <Text
                            style={{
                              fontFamily: "Poppins-Medium",
                              fontSize: Font.h6,
                              color: "#3E3E3E",
                              marginTop: 5,
                              marginLeft: 5,
                            }}
                          >
                            {item.module_code} -
                          </Text>
                        ) : null}
                        <View
                          style={{
                            height: 45,
                            marginRight: 30,
                            marginTop: 5,
                            marginLeft: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Poppins-Medium",
                              fontSize: Font.h6,
                              color: "#3E3E3E",
                            }}
                            numberOfLines={2}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </View>
                      <View style={{ height: 65 }}>
                        <AdfTohtml source={item.short_description}></AdfTohtml>
                      </View>
                      <Text
                        style={{
                          color: "#00B5E0",
                          fontFamily: "Poppins-Regular",
                          fontSize: Font.p1,
                          marginLeft: width - 170,
                        }}
                        onPress={() => {
                          if (checkData(data.course_type) === 1)
                            return props.navigation.navigate(
                              "UnitScreen",
                              data
                            );
                          else {
                            item["course"] = data.slug;
                            return props.navigation.navigate(
                              "ModuleDetails",
                              item
                            );
                          }
                        }}
                      >
                        Learn more.....
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          ),
        },
        {
          title: "Course Eligibility",
          content: renderContent(text.appearances),
        },
        {
          title: "Acrediation",
          content: renderContent(text.appearances),
        },
      ]}
      tabTextContainerStyle={styles.tabTextContainerStyle}
      tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
      tabText={styles.tabText}
      tabTextActiveStyle={styles.tabTextActiveStyle}
      tabWrapperStyle={styles.tabWrapperStyle}
      tabsContainerStyle={styles.tabsContainerStyle}
      scrollEvent={event(
        [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
        {
          useNativeDriver: true,
        }
      )}
    />
  );
};
export default CustomHeaderScreen;
