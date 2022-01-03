import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import CardComponentScreent from "../../components/CardCoponentScreent";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../../components/Header";

import Font from "../../constants/Font";
import FilterScreen from "../Courses/FilterScreen";

import { WithLocalSvg } from "react-native-svg";

const Data = [
  {
    Img: require("../../assets/banner5.jpeg"),
    title: "Diploma in Nutrition and Fitness",
    description:
      "A one-of-a-kind diploma course, it is a culmination of research and evidence based curriculum",
    author: "Dr Akshay Alwani",
    price: "25000",
    studentEnroll: "1000",
    hrs: "1200",
    tag: ["Nutrition", "health", "Fitness"],
  },
  {
    Img: require("../../assets/banner3.jpeg"),
    title: "Diploma in Nutrition and Fitness",
    description:
      "A comprehensive course which is designed keeping in mind the special demands of different sports,",
    author: "Dr Akshay Alwani",
    price: "25000",
    studentEnroll: "1000",
    hrs: "1200",
    tag: [{ tag1: "Nutrition" }, { tag2: "health" }, { tag3: "Fitness" }],
  },
  {
    Img: require("../../assets/banner5.jpeg"),
    title: "Diploma in Nutrition and Fitness",
    description:
      "A comprehensive course which is designed keeping in mind the special demands of different sports,",
    author: "Dr Akshay Alwani",
    price: "25000",
    studentEnroll: "1000",
    hrs: "1200",
    tag: [{ tag1: "Nutrition" }, { tag2: "health" }, { tag3: "Fitness" }],
  },
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CourseScreen = (props: {
  route: any;
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAllCoursesClicked, setIsAllCoursesClicked] = useState(true);
  const [isEnrolledClicked, setIsEnrolledClicked] = useState(false);
  const [data, setData] = useState([]);
  const [enrolledData, setenrolledData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/courses"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getEnrolledData = async () => {
    try {
      const response = await fetch(
        "http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/courses/7-days-to-amazing-lifestyle"
      );
      const json = await response.json();
      setenrolledData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsAllCoursesClicked(true);
    setIsEnrolledClicked(false);
    getData();
    getEnrolledData();
  }, []);

  const AllCourses = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.screen}>
              <CardComponentScreent
                Img={Data[1].Img}
                title={item.title}
                description={Data[1].description}
                author={item.instructor}
                price={item.price}
                studentEnroll={Data[1].studentEnroll}
                hrs={item.study_hours}
                tag={Data[0].tag[0]}
                onPress={() => {
                  props.navigation.navigate("CourseDetails", item);
                }}
              />
            </View>
          )}
        />

        {/* <ScrollView style={{ flexGrow: 1, marginTop: 1 }}>
          <View style={styles.screen}>
            {/* <CardComponentScreent
              Img={Data[1].Img}
              title={data.title}
              description={
                data?.courseoverview?.short_description?.content[0]?.content[0]
                  ?.text
              }
              author={data.instructor}
              price={data.price}
              studentEnroll={Data[1].studentEnroll}
              hrs={enrolledData.study_hours}
              tag={Data[0].tag[0]}
              onPress={() => {
                props.navigation.navigate("CourseDetails", data);
              }}
            /> 
            <CardComponentScreent
              Img={Data[1].Img}
              title={enrolledData.title}
              description={Data[1].description}
              author={enrolledData.instructor}
              price={enrolledData.price}
              studentEnroll={Data[1].studentEnroll}
              hrs={enrolledData.study_hours}
              tag={Data[0].tag[0]}
              onPress={() => {
                props.navigation.navigate("CourseDetails", enrolledData);
              }}
            />
          </View>
        </ScrollView> */}
      </View>
    );
  };

  const EnrolledCourses = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* <ScrollView style={{ flexGrow: 1, marginTop: 1 }}>
          <View style={styles.screen}>
            {console.warn(enrolledData.title)}
            <CardComponentScreent
              Img={Data[1].Img}
              title={enrolledData.title}
              description={Data[1].description}
              author={enrolledData.instructor}
              price={enrolledData.price}
              studentEnroll={Data[1].studentEnroll}
              hrs={enrolledData.study_hours}
              tag={Data[0].tag[0]}
              onPress={() => {
                props.navigation.navigate("CourseDetails", enrolledData);
              }}
            />
          </View>
        </ScrollView> */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <Header title="Courses" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <FilterScreen onPress={() => setModalVisible(!modalVisible)} />
      </Modal>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <View
          style={{
            borderRadius: 25,
            backgroundColor: "#E6E7E9",
            width: width - 50,
            height: 50,
            marginLeft: 25,
            flexDirection: "row",
          }}
        >
          {isAllCoursesClicked ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#00B5E0",
                width: width / 2 - 35,
                height: 40,
                margin: 5,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setIsAllCoursesClicked(true);
                setIsEnrolledClicked(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: "#FFFFFF",
                  fontSize: Font.p1,
                }}
              >
                All Courses
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#E6E7E9",
                width: width / 2 - 35,
                height: 40,
                margin: 5,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setIsAllCoursesClicked(true);
                setIsEnrolledClicked(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: "#838383",
                  fontSize: Font.p1,
                }}
              >
                All Courses
              </Text>
            </TouchableOpacity>
          )}

          {isEnrolledClicked ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#00B5E0",
                width: width / 2 - 35,
                height: 40,
                margin: 5,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setIsAllCoursesClicked(true);
                setIsEnrolledClicked(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: "#FFFFFF",
                  fontSize: Font.p1,
                }}
              >
                Enrolled Courses
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#E6E7E9",
                width: width / 2 - 35,
                height: 40,
                margin: 5,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setIsAllCoursesClicked(false);
                setIsEnrolledClicked(true);
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: "#838383",
                  fontSize: Font.p1,
                }}
              >
                Enrolled Courses
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* <TouchableOpacity
          style={{
            width: 40,
            backgroundColor: "#00B5E0",
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 5,
          }}
          onPress={() => setModalVisible(true)}
        >
          <WithLocalSvg
            width={21}
            height={20}
            asset={require("../../assets/filterNew.svg")}
          />
        </TouchableOpacity> */}
      </View>

      {isAllCoursesClicked ? <AllCourses /> : <EnrolledCourses />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    marginLeft: 1,
    marginRight: -8,
    flexGrow: 1,
  },
});

export default CourseScreen;
