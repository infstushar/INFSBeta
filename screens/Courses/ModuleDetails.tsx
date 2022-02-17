import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
  Platform,
  PixelRatio,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Font from "../../constants/Font";
import { Chip, List, Card } from "react-native-paper";

import Header from "../../components/HeaderwithBack";
import { WithLocalSvg } from "react-native-svg";

import ListComponent from "../../components/ListComponent";

import AxiosInstance from "../Auth/AxiosInstance";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = width / 415;
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS == "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const DATA = [
  {
    id: "0",
    module: "N 101",
    title: "Basic Nutrition and Fitness Course",
    level: "Beginner",
    update: "Nov 2020",
    lang: "English",
    instructor: "Dr.Akshay Alwani",
    stud: "1000",
    hrs: "1500",
    star: "5.0",
    price: "5000",
    tag: [
      { id: "0", tag: "Nutrition" },
      { id: "1", tag: "Fitness" },
      { id: "2", tag: "Health" },
    ],
    coursecontent: [
      {
        id: "0",
        tag: "To learn how to design a workout plan and the primary components of it.",
      },
      {
        id: "1",
        tag: "To understand according to one’s goals and how to design the optimum training plan according to them.",
      },
      {
        id: "2",
        tag: "To learn about muscle fatigue and the reasons that cause it.",
      },
      {
        id: "3",
        tag: "To discuss the frequency of workouts depending on goals.",
      },
    ],
    unitcontent: [
      {
        id: "0",
        tag: "To learn about Nutrition and its components ",
      },
      {
        id: "1",
        tag: "To discover what optimum nutrition means ",
      },
      {
        id: "2",
        tag: "To understand why everyone needs knowledge about nutrition",
      },
    ],
    unitcontent1: [
      {
        id: "0",
        tag: "To discuss obesity condition",
      },
      {
        id: "1",
        tag: "To understand the lifestyle disorders related to obesity ",
      },
      {
        id: "2",
        tag: "To discuss precautions to be taken to avoid the lifestyle disorders",
      },
    ],
    unitcontent2: [
      {
        id: "0",
        tag: "To understand the history of the Nutrition Pyramid ",
      },
      {
        id: "1",
        tag: "To understand the impact of deficiency of protein in Indian diets and the need for protein",
      },
      {
        id: "2",
        tag: "To discuss the nutrition guidelines to be followed for better health and fitness",
      },
    ],

    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    eligiblity: "Applicant should be above 18 years of Age",
  },
];

const ModuleDetails = (props) => {
  const [data, setData] = useState([]);

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      let response = await AxiosInstance.get(
        `/modules/${props?.route?.params?.id}`
      );
      // try {
      //   const response = await fetch(
      //     `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/modules/` +
      //       props?.route?.params?.id,
      //     {
      //       method: "GET",
      //       headers: {
      //         Authorization: bearer,
      //       },
      //     }
      //   );
      //   const json = await response.json();
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

  const renderItem = ({ item }) => (
    <Chip
      style={{
        marginRight: 5,
        height: 25,
        alignItems: "center",
        marginTop: 10,

        backgroundColor: "#F4F4F4",
      }}
      textStyle={{
        fontSize: Font.p1,
        fontFamily: "Poppins-Regular",
        color: "#3E3E3E",
      }}
    >
      {item.tag}
    </Chip>
  );

  const renderItemforUnit = ({ item }) => (
    <View style={styles.column}>
      <View style={styles.row}>
        <WithLocalSvg
          width={10}
          height={7}
          asset={require("../../assets/dot-svgrepo-com.svg")}
          style={{ marginTop: 5, marginLeft: 5 }}
        />
        <View style={styles.bulletText}>
          <Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: Font.p1,
                color: "#3E3E3E",
              }}
            >
              {item.tag}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
  const renderItemforlearn = ({ item }) => (
    <View style={styles.column}>
      <View style={styles.row}>
        <WithLocalSvg
          width={10}
          height={7}
          asset={require("../../assets/Path1128.svg")}
          style={{ marginTop: 7, marginLeft: 5 }}
        />
        <View style={styles.bulletText}>
          <Text>
            <Text style={styles.boldText}>{item.tag}</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        title={data.title}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />
      <View
        style={{
          width: width,
          height: 200,
        }}
      >
        <Image
          source={require("../../assets/banner5.jpeg")}
          style={{ width: width, height: "100%" }}
        />
      </View>
      <ScrollView>
        <View style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
            <WithLocalSvg
              width={12}
              height={12}
              asset={require("../../assets/Icon-ionic-ios-star-(1).svg")}
              style={{ marginTop: 5 }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
                marginLeft: 10,
              }}
            >
              {DATA[0].star}.
            </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
                marginLeft: 10,
              }}
            >
              100 reviews
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: Font.h4,
              color: "#3E3E3E",
              paddingBottom: 10,
              marginLeft: 10,
            }}
          >
            {data.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
                marginLeft: 10,
              }}
            >
              {DATA[0].level}
            </Text>
            <View style={styles.hairline} />
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#838383",
                paddingLeft: 5,
              }}
            >
              Last updated on :{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
              }}
            >
              {DATA[0].update}
            </Text>
            <View style={styles.hairline} />
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
                paddingLeft: 5,
              }}
            >
              {DATA[0].lang}
            </Text>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 5, marginLeft: 10 }}>
            <Image
              source={require("../../assets/abc.jpeg")}
              style={{
                borderRadius: 30,
                width: 30,
                height: 30,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",

                borderWidth: 1,
                borderColor: "#FFFFFF",
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: Font.p1,
                color: "#838383",
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              Instructor:
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
                paddingLeft: 5,
                marginLeft: 5,
                marginTop: 5,
              }}
            >
              {data.instructor}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
            <WithLocalSvg
              width={28}
              height={18}
              asset={require("../../assets/Icon-material-group.svg")}
              style={{ marginTop: 2 }}
            />
            <Text
              style={{
                paddingLeft: 5,
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#3E3E3E",
                marginTop: 5,
              }}
            >
              {DATA[0].stud} Students Enrolled
            </Text>
            <View style={{ flexDirection: "row" }}>
              <WithLocalSvg
                width={21}
                height={22}
                asset={require("../../assets/Icon-ionic-ios-stopwatch.svg")}
                style={{ marginLeft: 15, marginTop: 2 }}
              />
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: Font.p1,
                  color: "#3E3E3E",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                {data.study_hours / 30} Credits
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 10, marginLeft: 10 }}>
            <FlatList
              data={DATA[0].tag}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
            />
          </View>
          <Text
            style={{
              fontSize: Font.h5,
              fontFamily: "Poppins-Medium",
              color: "#3E3E3E",
              marginLeft: 10,
            }}
          >
            What you ‘ll learn
          </Text>
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: "#F8F8F8",
              marginLeft: 10,
            }}
          >
            <FlatList
              data={DATA[0].coursecontent}
              renderItem={renderItemforlearn}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: "#3E3E3E",
                fontFamily: "Poppins-Medium",
                fontSize: Font.h5,
                marginLeft: 10,
              }}
            >
              Module Content
            </Text>
            {/* <Text
              style={{
                color: "#838383",
                fontFamily: "Poppins-Regular",
                fontSize: Font.p1,
                marginLeft: 12,
              }}
            >
              {data.units.length} Units
            </Text> */}
            <View style={styles.horizontalline} />
          </View>
          <FlatList
            data={data.units}
            keyExtractor={(id) => id}
            renderItem={({ item }) => (
              <View>
                <List.Section>
                  <List.Accordion
                    title={item.title}
                    style={{
                      backgroundColor: "#EDEDED",
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                    titleStyle={{
                      fontFamily: "Poppins-Medium",
                      fontSize: Font.h6,
                      color: "#3E3E3E",
                    }}
                    titleNumberOfLines={2}
                  >
                    <List.Item
                      title={DATA[0].description}
                      titleStyle={{
                        fontFamily: "Poppins-Regular",
                        fontSize: Font.p1,
                        color: "#3E3E3E",
                        marginRight: 5,
                        marginLeft: 10,
                      }}
                      titleNumberOfLines={3}
                    />
                  </List.Accordion>
                </List.Section>
              </View>
            )}
          />

          <View>
            <ListComponent
              title={"Module Description"}
              sourceData={data.short_description}
              setViewStyle={{ marginTop: 10, marginLeft: 10 }}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#3E3E3E",
                marginTop: 5,
                fontSize: Font.h5,
                fontFamily: "Poppins-Medium",
                marginLeft: 15,
              }}
            >
              Module Eligibility
            </Text>
            <Text
              style={{
                fontSize: Font.p1,
                fontFamily: "Poppins-Regular",

                marginLeft: 15,
                color: "#838383",
              }}
            >
              {DATA[0].eligiblity}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 40,
            width: "45%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            borderRadius: 29,
            backgroundColor: "#00B5E0",
            shadowColor: "#00000029",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 3,
            marginLeft: width * 0.28,
          }}
          onPress={() => {
            data["course"] = props?.route?.params?.course;
            props.navigation.navigate("UnitScreenForCourses", data);
            //props.navigation.navigate("Example");
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
            Start My Learning
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
  },
  hairline: {
    backgroundColor: "#838383",
    height: 13,
    width: 2,
    marginTop: 5,
    marginLeft: 5,
  },
  column: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1,
    marginTop: 5,
  },
  bullet: {
    width: 20,
    marginTop: 5,
    marginLeft: 15,
  },
  bulletText: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
  },
  boldText: {
    fontFamily: "Poppins-Regular",
    fontSize: Font.h6,
    color: "#3E3E3E",
  },
  horizontalline: {
    backgroundColor: "#00000029",
    height: 1,
    width: "92%",
    marginTop: 5,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  touchable: {
    backgroundColor: "#181829",
    height: 50,
  },
  title: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  message: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  icon: {
    height: 24,
    width: 24,
  },
  button: {
    padding: 16,
  },
});

export default ModuleDetails;
