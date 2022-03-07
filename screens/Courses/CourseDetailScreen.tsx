import React, { useEffect, useState, Component } from "react";
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
  Modal,
} from "react-native";
import CourseContentScreen from "../../components/CourseContentScreen";
import { ScrollView } from "react-native-gesture-handler";
import AdfTohtml from "./AdfTohtml";
import Swiper from "react-native-swiper";
import Header from "../../components/HeaderwithBack";
import { WithLocalSvg } from "react-native-svg";
import ListComponent from "../../components/ListComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Chip, List } from "react-native-paper";
import Font from "../../constants/Font";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AxiosInstance from "../Auth/AxiosInstance";
import ContentDetail from "../../components/ContentDetail";

const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: "0",
    title: "Diploma in Nutrition and Fitness",
    level: "Beginner",
    update: "Nov 2020",
    lang: "English",
    instructor: "Dr.Akshay Alwani",
    stud: "1000",
    hrs: "1500",
    star: "5.0",
    price: "25000",
    tag: [
      { id: "0", tag: "Nutrition" },
      { id: "1", tag: "Fitness" },
      { id: "2", tag: "Health" },
    ],
    coursecontent: [
      { id: "0", tag: "Online access of course material" },
      { id: "1", tag: "Online Discussion Forum" },
      { id: "2", tag: "Quizzes and End of Course Assessment" },
      { id: "3", tag: "ACertificate of Participation" },
    ],
    learningcontent: [
      { id: "0", tag: "Introduction to the Art of meditation" },
      {
        id: "1",
        tag: "Building life-changing habits and tracking them.",
      },
      { id: "2", tag: "PBreakthrough for productivity in your tasks" },
      {
        id: "3",
        tag: "Improving your relationships with family and friends",
      },
      {
        id: "4",
        tag: "An abundant and loving lifestyle",
      },
      {
        id: "5",
        tag: "Art of loving yourself",
      },
    ],
    description: `7 days to Amazing Lifestyle is a Workshop conducted for seven days, focusing on building life-changing habits and keeping track of your goals by just giving one hour to yourself on daily basis. It is a beginners workshop focusing on mindfulness.`,
    eligiblity: "Applicant should be above 18 years of Age",
    faq: [
      {
        id: "0",
        tag: "To learn how to design a workout plan and the primary components of it.",
      },
    ],
  },
];

const CourseDetailScreen = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const getData = async () => {
    try {
      let response = await AxiosInstance.get(
        `/courses/${props?.route?.params?.slug}`
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
      await AsyncStorage.setItem("courseSlug", props?.route?.params?.slug).then(
        () => {
          console.log("course saved successfully");
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      getData();
    });
  }, []);
  const courseTitle = data.title;
  const checkData = (item) => {
    // const lengnth = Object.keys(data.modules).length;
    // if (lengnth === 0) return 0;
    // else return 1;
    if (item === "workshops") return 1;
    else return 0;
  };

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
        fontSize: Font.p2,
        fontFamily: "Poppins-Regular",
        color: "#3E3E3E",
      }}
    >
      {item.tag}
    </Chip>
  );
  const dataModalSlide = (title, content) => {
    return <ContentDetail title={title} content={content} />;
  };
  const renderItemforCourseContent = ({ item }) => (
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
            <Text style={styles.boldText}>{item.tag}</Text>
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
          height={10}
          asset={require("../../assets/Path1128.svg")}
          style={{ marginTop: 7, marginLeft: 15 }}
        />
        <View style={styles.bulletText}>
          <Text>
            <Text style={styles.boldText}>{item.tag}</Text>
          </Text>
        </View>
      </View>
    </View>
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
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        title={data.title}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />
      <ScrollView
        style={{ flexGrow: 1, marginBottom: 5 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={{
            width: width,
            height: 200,
          }}
        >
          <Image
            source={require("../../assets/banner5.jpeg")}
            style={{
              width: "95%",
              height: "100%",
              borderRadius: 10,

              margin: 10,
            }}
          />
        </View>

        <View style={{ marginLeft: 15, marginBottom: 10, marginVertical: 5 }}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
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
                color: "#364F65",
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
                color: "#364F65",
                marginLeft: 5,
              }}
            >
              100 reviews
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: Font.h4,
              color: "#364F65",
              paddingBottom: 10,

              marginTop: 10,
            }}
          >
            {data.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textStyleForheaderMedium}>{DATA[0].level}</Text>
            <View style={styles.hairline} />
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#838383",
              }}
            >
              Last updated on :{" "}
            </Text>
            <Text style={styles.textStyleForheaderMedium}>
              {DATA[0].update}
            </Text>
            <View style={styles.hairline} />
            <Text style={styles.textStyleForheaderMedium}>{DATA[0].lang}</Text>
          </View>

          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            <Image
              source={require("../../assets/abc.jpeg")}
              style={{
                borderRadius: 30,
                width: 25,
                height: 25,
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
                color: "#364F65",
                paddingLeft: 5,
                marginLeft: 5,
                marginTop: 5,
              }}
            >
              {data.instructor}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <WithLocalSvg
              width={28}
              height={18}
              asset={require("../../assets/Icon-material-group.svg")}
              style={{ marginTop: 5 }}
            />

            <Text
              style={{
                paddingLeft: 5,
                fontFamily: "Poppins-Medium",
                fontSize: Font.p1,
                color: "#364F65",
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
                style={{ marginTop: 3, marginLeft: 10 }}
              />
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: Font.p1,
                  color: "#364F65",
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                {data.study_hours / 30} Credits
              </Text>
            </View>
          </View>
          {/*<FlatList
            data={DATA[0].tag}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
          />*/}
        </View>
        <View style={{ margin: 15 }}>
          <ListComponent
            title={"Here’s what you ‘ll learn"}
            sourceData={data.courseoverview?.what_will_you}
            setViewStyle={{
              paddingVertical: 5,
              backgroundColor: "#F8F8F8",
            }}
          />
        </View>

        <Text
          style={{
            color: "#364F65",
            marginLeft: 15,
            fontFamily: "Roboto-Medium",
            fontSize: Font.h5,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Course insights
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ContentDetail", {
              content: data.courseoverview?.includes,
              title: "This Course includes",
            });
          }}
          style={{
            backgroundColor: "#F9FAFB",
            margin: 10,
            height: 50,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: 24,
              width: 24,
              backgroundColor: "#5A819C",
              marginTop: 12,
              marginLeft: 8,
              borderColor: "#cccccc",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: 12,
                fontWeight: "500",
                color: "#FFFFFF",
                marginLeft: 7,
                marginTop: 3,
                lineHeight: 15,
              }}
            >
              1
            </Text>
          </View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 10,
              fontFamily: "Roboto-Medium",
              //fontFamily: "Poppins-Regular",
              fontSize: Font.h6,
              lineHeight: 15,
              color: "#364F65",
            }}
          >
            Course Includes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ContentDetail", {
              content: data.courseoverview?.long_description,
              title: "Course Description",
            });
          }}
          style={{
            backgroundColor: "#F9FAFB",
            margin: 10,
            height: 50,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: 24,
              width: 24,
              backgroundColor: "#5A819C",
              marginTop: 12,
              marginLeft: 8,
              borderColor: "#cccccc",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 12,
                fontWeight: "500",
                color: "#FFFFFF",
                marginLeft: 7,
                marginTop: 3,
                lineHeight: 15,
              }}
            >
              2
            </Text>
          </View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 10,
              fontFamily: "Roboto-Medium",
              //fontFamily: "Poppins-Regular",
              fontSize: Font.h6,
              lineHeight: 15,
              color: "#364F65",
            }}
          >
            Course Description
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ModuleListComponent", {
              content: data.courseoverview?.eligibility,
              title: "Modules",
              data: data,
            });
          }}
          style={{
            backgroundColor: "#F9FAFB",
            margin: 10,
            height: 50,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: 24,
              width: 24,
              backgroundColor: "#5A819C",
              marginTop: 12,
              marginLeft: 8,
              borderColor: "#cccccc",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 14,
                fontWeight: "500",
                color: "#FFFFFF",
                marginLeft: 7,
                marginTop: 3,
                lineHeight: 15,
              }}
            >
              3
            </Text>
          </View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 10,
              fontFamily: "Roboto-Medium",
              //fontFamily: "Poppins-Regular",
              fontSize: Font.h6,
              lineHeight: 15,
              color: "#364F65",
            }}
          >
            Modules
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ContentDetail", {
              content: data.courseoverview?.eligibility,
              title: "Course Eligibility",
            });
          }}
          style={{
            backgroundColor: "#F9FAFB",
            margin: 10,
            height: 50,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: 24,
              width: 24,
              backgroundColor: "#5A819C",
              marginTop: 12,
              marginLeft: 8,
              borderColor: "#cccccc",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 12,
                fontWeight: "500",
                color: "#FFFFFF",
                marginLeft: 7,
                marginTop: 3,
                lineHeight: 15,
              }}
            >
              4
            </Text>
          </View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 10,
              fontFamily: "Roboto-Medium",
              //fontFamily: "Poppins-Regular",
              fontSize: Font.h6,
              lineHeight: 15,
              color: "#364F65",
            }}
          >
            Course Eligibility
          </Text>
        </TouchableOpacity>

        {/* <ListComponent
          title={"This Course Includes"}
          sourceData={data.courseoverview?.includes}
          setViewStyle={{
            borderWidth: 1,
            borderColor: "#EAEAEA",
            margin: 15,
          }}
        /> */}

        {/* <View style={{ marginTop: 10 }}>
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
            data={checkData(data.course_type) === 1 ? data.units : data.modules}
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
        {/*<View
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
                        return props.navigation.navigate("UnitScreen", data);
                      else {
                        item["course"] = data.slug;
                        return props.navigation.navigate("ModuleDetails", item);
                      }
                    }}
                  >
                    Learn more.....
                  </Text>
                </View>
              </View>
            )}
          />
        </View> */}
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 28,
            width: 28,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: width / 2,
            marginTop: 20,
            borderRadius: 90,
            backgroundColor: "#00B5E0",
            shadowColor: "#00000029",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 3,
          }}
          onPress={() => {}}
        >
          <WithLocalSvg
            width={14}
            height={15}
            asset={require("../../assets/Icon-ionic-ios-arrow-dropdown-circle.svg")}
            style={{ marginTop: 5 }}
          />
        </TouchableOpacity> */}

        {/* <View>
          <ListComponent
            title={"Course Description"}
            sourceData={data.courseoverview?.long_description}
            setViewStyle={{ margin: 10 }}
          />
        </View>
        <View>
          <ListComponent
            title={"Course Eligibility"}
            sourceData={data.courseoverview?.eligibility}
            setViewStyle={{ marginTop: 5, marginLeft: 10 }}
          />
        </View> */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: "#364F65",
              marginLeft: 15,
              fontSize: Font.h5,
              fontFamily: "Roboto-Medium",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            Accreditation
          </Text>
          <View
            style={{
              borderWidth: 0.2,
              borderColor: "#364F65",
              margin: 15,
              padding: 10,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", margin: 5 }}>
              <Image
                source={require("../../assets/dipp.jpeg")}
                style={{
                  height: 60,
                  width: 110,
                  resizeMode: "stretch",
                }}
              />

              <Image
                source={require("../../assets/iso.jpeg")}
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: "stretch",
                  marginLeft: 60,
                }}
              />
            </View>
            <Image
              source={require("../../assets/cpd-doc-infs.png")}
              style={{
                height: 60,
                width: 205,
                resizeMode: "stretch",
                marginTop: 10,
              }}
            />
          </View>
        </View>
        {/* <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: "#3E3E3E",
              marginLeft: 15,
              fontSize: Font.h5,
              fontFamily: "Roboto-SemiBold",
            }}
          >
            Testimonials
          </Text>
          <Card
            style={{
              borderWidth: 1,
              borderRadius: 10,
              margin: 10,
              height: height * 0.35,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Swiper
              dot={
                <View
                  style={{
                    height: 10,
                    width: 10,
                    marginHorizontal: 5,
                    borderRadius: 10 / 2,
                    backgroundColor: "#00B5E0",
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    height: 10,
                    width: 20,
                    marginHorizontal: 5,
                    borderRadius: 10 / 2,
                    backgroundColor: "#00B5E0",
                  }}
                />
              }
            >
              <View>
                <Card.Content>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../assets/abc.jpeg")}
                      style={{
                        borderRadius: 30,
                        width: 70,
                        height: 70,
                        backgroundColor: "#FFFFFF",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 5,
                        borderWidth: 1,
                        borderColor: "#FFFFFF",
                        marginTop: 10,
                      }}
                    />
                    <View style={{ marginTop: 15 }}>
                      <Text
                        style={{
                          color: "#3E3E3E",
                          marginLeft: 15,
                          fontSize: Font.h5,
                          fontFamily: "Roboto-Medium",
                        }}
                      >
                        Virendra Tilekar
                      </Text>
                      <Text
                        style={{
                          color: "#3E3E3E",
                          marginLeft: 15,
                          fontSize: Font.p1,
                          fontFamily: "Roboto-Regular",
                        }}
                      >
                        Foundation Course,
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: 50,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#37B84C",
                        marginLeft: 50,
                        marginTop: 20,
                        flexGrow: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Font.p2,
                          fontFamily: "Roboto-Medium",
                          color: "#FFFFFF",
                        }}
                      >
                        4.5
                      </Text>

                      <WithLocalSvg
                        width={12}
                        height={12}
                        asset={require("../../assets/Iconionic-ios-star.svg")}
                        style={{ marginLeft: 3 }}
                      />
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: Font.p1,
                      fontFamily: "Roboto-Regular",
                      color: "#838383",
                    }}
                  >
                    There are many variations of passages of Ipsum available,
                    but the majority have suffered alteration in some form, by
                    injected humour, or randomised words which don’t look even
                    slightly believable.
                  </Text>
                </Card.Content>
              </View>
              <View>
                <Card.Content>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../assets/abc.jpeg")}
                      style={{
                        borderRadius: 30,
                        width: 70,
                        height: 70,
                        backgroundColor: "#FFFFFF",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 5,
                        borderWidth: 1,
                        borderColor: "#FFFFFF",
                        marginTop: 10,
                      }}
                    />
                    <View style={{ marginTop: 15 }}>
                      <Text
                        style={{
                          color: "#3E3E3E",
                          marginLeft: 15,
                          fontSize: Font.h5,
                          fontFamily: "Roboto-Medium",
                        }}
                      >
                        Virendra Tilekar
                      </Text>
                      <Text
                        style={{
                          color: "#3E3E3E",
                          marginLeft: 15,
                          fontSize: Font.p1,
                          fontFamily: "Roboto-Regular",
                        }}
                      >
                        Foundation Course,
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",

                        alignItems: "center",
                        width: 50,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#37B84C",
                        marginLeft: 50,
                        marginTop: 20,
                        flexGrow: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Font.p2,
                          fontFamily: "Roboto-Medium",
                          color: "#FFFFFF",
                        }}
                      >
                        4.5
                      </Text>

                      <WithLocalSvg
                        width={12}
                        height={12}
                        asset={require("../../assets/Iconionic-ios-star.svg")}
                        style={{ marginLeft: 3 }}
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: Font.p1,
                      fontFamily: "Roboto-Regular",
                      color: "#838383",
                    }}
                  >
                    There are many variations of passages of Ipsum available,
                    but the majority have suffered alteration in some form, by
                    injected humour, or randomised words which don’t look even
                    slightly believable.
                  </Text>
                </Card.Content>
              </View>
            </Swiper>
          </Card>
        </View>

        <Text
          style={{
            color: "#3E3E3E",
            marginLeft: 15,
            fontSize: Font.h5,
            fontFamily: "Roboto-SemiBold",
            marginTop: 10,
          }}
        >
          FAQ's
        </Text>
        <View style={{ width: width, height: "30%" }}>
          <ScrollView>
            <List.Section>
              <List.Accordion
                title="Diploma in Nutrition and Fitness?"
                titleStyle={{
                  fontSize: Font.p1,
                  fontFamily: "Roboto-Medium",
                  color: "#3E3E3E",
                }}
                style={{ backgroundColor: "#F4F4F4" }}
              >
                <FlatList
                  data={DATA[0].faq}
                  renderItem={renderItemforUnit}
                  keyExtractor={(item) => item.id}
                />
              </List.Accordion>

              <List.Accordion
                title="Content Prep course?"
                titleStyle={{
                  fontSize: Font.p1,
                  fontFamily: "Roboto-Medium",
                  color: "#3E3E3E",
                }}
                style={{ backgroundColor: "#F4F4F4" }}
              >
                <FlatList
                  data={DATA[0].faq}
                  renderItem={renderItemforUnit}
                  keyExtractor={(item) => item.id}
                />
              </List.Accordion>
              <List.Accordion
                title="Calisthenics Trainer Certification?"
                titleStyle={{
                  fontSize: Font.p1,
                  fontFamily: "Roboto-Medium",
                  color: "#3E3E3E",
                }}
                style={{ backgroundColor: "#F4F4F4" }}
              >
                <FlatList
                  data={DATA[0].faq}
                  renderItem={renderItemforUnit}
                  keyExtractor={(item) => item.id}
                />
              </List.Accordion>
              </List.Section>
          </ScrollView>
              </View>*/}
      </ScrollView>
      {/*  <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 30,
        }}
      >
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: Font.h5,
              color: "#3E3E3E",
            }}
          >
            Course Cost
          </Text>
          <View style={{ flexDirection: "row" }}>
            <WithLocalSvg
              width={12}
              height={14}
              asset={require("../../assets/Iconawesome-rupee-sign.svg")}
              style={{ marginTop: 5 }}
            />
            <Text
              style={{
                fontFamily: "Roboto-SemiBold",
                fontSize: Font.h5,
                color: "#3E3E3E",
                marginTop: 2,
                marginLeft: 3,
              }}
            >
              {Math.floor(data.price)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 40,
            width: "35%",
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
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",

              color: "#FFFFFF",
              fontSize: Font.h5,
              fontFamily: "Roboto-SemiBold",
            }}
          >
            Enroll Now
          </Text>
        </TouchableOpacity>
          </View>*/}
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 30,
          height: 40,
          backgroundColor: "rgba(52, 52, 52, alpha)",
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
            if (checkData(data.course_type) === 1)
              return props.navigation.navigate("UnitScreen", data);
            else {
              data.modules[0]["course"] = data.slug;
              return props.navigation.navigate(
                "UnitScreenForCourses",
                data.modules[0]
              );
              //return props.navigation.navigate("CustomHeaderScreen");
              //return props.navigation.navigate("CoursesDetailsScrollable");
            }
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: Font.h6,
              fontFamily: "Roboto-Bold",
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
    backgroundColor: "#364F65",
    height: 13,
    width: 2,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
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
    paddingRight: 10,
  },
  bulletText: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
  },
  boldText: {
    fontFamily: "Poppins-Regular",
    fontSize: Font.p1,
    color: "#364F65",
    marginLeft: 15,
  },
  horizontalline: {
    backgroundColor: "#FFFFFF",
    height: 1,
    width: width,
    marginTop: 5,
    marginLeft: 15,
    shadowColor: "#00000029",
    shadowOpacity: 1,
  },
  textStyleForheaderMedium: {
    fontFamily: "Poppins-Medium",
    fontSize: Font.p1,
    color: "#364F65",
  },
});

export default CourseDetailScreen;
