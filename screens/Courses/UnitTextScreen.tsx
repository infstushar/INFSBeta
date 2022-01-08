import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Font from "../../constants/Font";
import AdfTohtml from "../Courses/AdfTohtml";
import { WithLocalSvg } from "react-native-svg";
import Header from "../../components/HeaderwithBack";
import ListComponent from "../../components/ListComponent";

const { width, height } = Dimensions.get("window");

const scale = width / 415;
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS == "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const UnitTextScreen = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons/` +
          props?.route?.params?.slug
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.warn(props?.route?.params?.slug);
    getData();
  }, []);
  return (
    // <View style={{ width, height, flex: 1 }}>
    //   <Header
    //     title="What is Health"
    //     onPress={() => {
    //       props.navigation.goBack("UnitScreen");
    //     }}
    //   />
    //   <ScrollView style={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
    //     <View style={{ margin: 15 }}>
    //       <Text
    //         style={{
    //           fontFamily: "Poppins-Medium",
    //           color: "#3E3E3E",
    //           fontSize: Font.h6,
    //         }}
    //       >
    //         The World Health Organization (WHO) describes health as
    //       </Text>
    //       <View
    //         style={{
    //           backgroundColor: "#FAFAFA",
    //           margin: 15,
    //           flexDirection: "row",
    //         }}
    //       >
    //         <WithLocalSvg
    //           width={19.75}
    //           height={15.42}
    //           asset={require("../../assets/Iconmetro-quote.svg")}
    //         />
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             fontSize: Font.h5,
    //             paddingLeft: 5,
    //             color: "#3E3E3E",
    //             lineHeight: normalize(28),
    //           }}
    //         >
    //           a state of complete physical, mental, and social well-being and
    //           not merely the absence of disease or infirmity.
    //         </Text>
    //       </View>
    //       <Text
    //         style={{
    //           fontFamily: "Poppins-Medium",
    //           fontSize: Font.h6,
    //           lineHeight: normalize(24.5),
    //           color: "#838383",
    //           paddingLeft: 2,
    //         }}
    //       >
    //         If a person has no illness and is in a good physical state but
    //         dealing with psychological disorders or is going through physical,
    //         emotional, or psychological strain then that person is not
    //         considered a healthy person.
    //       </Text>

    //       <View style={{ margin: 10 }}>
    //         <Image
    //           source={require("../../assets/component.png")}
    //           style={{
    //             width: normalize(350),
    //             height: normalize(350),
    //             resizeMode: "stretch",
    //           }}
    //         />
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <Text
    //             style={{
    //               fontFamily: "Poppins-SemiBold",
    //               fontSize: Font.h6,
    //               lineHeight: normalize(24.5),
    //               color: "#3E3E3E",
    //               paddingLeft: 2,
    //               marginBottom: normalize(20),
    //             }}
    //           >
    //             Figure1:
    //           </Text>
    //           <Text
    //             style={{
    //               fontFamily: "Poppins-Regular",
    //               fontSize: Font.h6,
    //               color: "#3E3E3E",
    //               paddingLeft: 2,
    //             }}
    //           >
    //             Components of Health as per the WHO definition
    //           </Text>
    //         </View>
    //       </View>

    //       <Text
    //         style={{
    //           fontFamily: "Poppins-Medium",
    //           fontSize: Font.h6,
    //           lineHeight: normalize(24.5),
    //           color: "#838383",
    //         }}
    //       >
    //         Now, this is a highly simplified definition and doesn’t represent
    //         the concept of health entirely. Health can be considered as the
    //         ability to adapt to physical, environmental, and social challenges.
    //         After all, isn’t it the adaptations that have helped humans evolve?
    //         Even though we have progressed technologically to a great extent but
    //         ‘health’ has been compromised in the process. While our ancestors
    //         may not have had the sharpest brain, they did have a much more
    //         active lifestyle, they used to move hundreds of kilometers to find
    //         food, water, and shelter. Evolution changed everything,
    //         technological advances have put us in a state of no to very few
    //         activities to perform the same task. The modern man is smart,
    //         technologically adept, and knows much more than his forefathers, but
    //         is sadly confined to a screen. Health is compromised as a result of
    //         leading a stagnant lifestyle where one eats a lot and sits a lot
    //         more. All these changes have happened in a short period (i.e.
    //         decades, rather than centuries) and the human bodies have not had
    //         the time to adapt yet. Evolutionary adaptations happen after
    //         thousands of years, but these technological advances came after the
    //         mid-1900s, so we didn’t get too much time to adapt, thus our body’s
    //         functions are still the same as our ancestors, but we have less
    //         physical work now. Generally speaking, a healthy person has
    //         well-functioning internal systems. The indications of the same are
    //         shared in figure 2. Review the list and identify if one can be
    //         called ‘healthy’.
    //       </Text>
    //       <View style={{ margin: 10 }}>
    //         <Image
    //           source={require("../../assets/Health.png")}
    //           style={{
    //             width: normalize(350),
    //             height: normalize(450),
    //             resizeMode: "stretch",
    //           }}
    //         />
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <Text
    //             style={{
    //               fontFamily: "Poppins-SemiBold",
    //               fontSize: Font.h6,
    //               lineHeight: normalize(24.5),
    //               color: "#3E3E3E",
    //               paddingLeft: 2,
    //             }}
    //           >
    //             Figure2:
    //           </Text>
    //           <Text
    //             style={{
    //               fontFamily: "Poppins-Regular",
    //               fontSize: Font.h6,
    //               lineHeight: normalize(24.5),
    //               color: "#3E3E3E",
    //               paddingLeft: 2,
    //             }}
    //           >
    //             Indicators of Good Health
    //           </Text>
    //         </View>
    //       </View>
    //       <Text
    //         style={{
    //           fontFamily: "Poppins-Medium",
    //           fontSize: Font.h6,
    //           lineHeight: normalize(24.5),
    //           color: "#838383",
    //         }}
    //       >
    //         It is important to note that just ‘looking’ healthy need not make a
    //         person healthy. Health must always be looked at holistically. Now,
    //         an important question arises - Are health and fitness the same
    //         thing? The answer is NO.
    //       </Text>
    //     </View>
    //   </ScrollView>
    //   {/* <View style={{ backgroundColor: "#FAFAFA" }}>
    //     <TouchableOpacity
    //       style={{
    //         flexDirection: "row",
    //         height: 40,
    //         width: "35%",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         marginTop: 20,
    //         marginBottom: 20,
    //         borderRadius: 29,

    //         backgroundColor: "#00B5E0",
    //         shadowColor: "#00000029",
    //         shadowOffset: { width: 0, height: 2 },
    //         shadowOpacity: 1,
    //         shadowRadius: 3,
    //         marginLeft: width * 0.32,
    //       }}
    //       onPress={() => {
    //         props.navigation.navigate("UnitVideoTextScreen");
    //       }}
    //     >
    //       <Text
    //         style={{
    //           flex: 1,
    //           textAlign: "center",
    //           color: "#FFFFFF",
    //           fontSize: Font.h6,
    //           fontFamily: "Poppins-SemiBold",
    //         }}
    //       >
    //         Next Lesson
    //       </Text>
    //     </TouchableOpacity>
    //   </View> */}
    // </View>
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <Header
        title={data.title}
        onPress={() => {
          props.navigation.goBack("UnitScreen");
        }}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
          marginLeft: 15,
          marginRight: 10,
        }}
      >
        <AdfTohtml
          source={data.content}
          bgStyle={{
            backgroundColor: "#F8F8F8",
          }}
        ></AdfTohtml>
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
});

export default UnitTextScreen;
