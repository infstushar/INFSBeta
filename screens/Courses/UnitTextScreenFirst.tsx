import React from "react";
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
import { WithLocalSvg } from "react-native-svg";
import Header from "../../components/HeaderwithBack";

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

const UnitTextScreenFirst = (props) => {
  return (
    // <View style={{ width, height, flex: 1 }}>
    //   <Header
    //     title="What is Nutrition"
    //     onPress={() => {
    //       props.navigation.navigate("UnitScreen");
    //     }}
    //   />
    //   <ScrollView style={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
    //     <View style={{ margin: 15 }}>
    //       <View style={{ backgroundColor: "#FAFAFA" }}>
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-SemiBold",
    //             color: "#00B5E0",
    //             fontSize: Font.h5,
    //             lineHeight: normalize(28),
    //             textTransform: "uppercase",
    //           }}
    //         >
    //           Here are two statements.
    //         </Text>
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //           }}
    //         >
    //           Statement A - Nutrition is the food we eat.
    //         </Text>
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //           }}
    //         >
    //           Statement B - Nutrition is how food affects us.
    //         </Text>
    //       </View>
    //       <Text
    //         style={{
    //           fontFamily: "Poppins-SemiBold",
    //           color: "#00B5E0",
    //           fontSize: Font.h5,
    //           textTransform: "uppercase",
    //           marginTop: 15,
    //           marginBottom: 10,
    //         }}
    //       >
    //         what exactly is Nutrition?
    //       </Text>

    //       <Text
    //         style={{
    //           fontFamily: "Poppins-Medium",
    //           color: "#838383",
    //           fontSize: Font.h6,
    //           lineHeight: normalize(24.5),
    //           marginBottom: 10,
    //         }}
    //       >
    //         While most think Option A is true and don’t consider option B, let
    //         it be clear that Nutrition includes BOTH of these. If everyone
    //         begins to recognize that what is eaten matters as much as how it
    //         affects the body, everyone will live healthier lives.
    //       </Text>
    //       <Image
    //         source={require("../../assets/food.png")}
    //         style={{ width: 350, height: 350, resizeMode: "stretch" }}
    //       />
    //       <View
    //         style={{
    //           backgroundColor: "#FAFAFA",
    //           margin: 15,
    //           flexDirection: "row",
    //           shadowColor: "#0000001A",
    //           shadowOpacity: 1,
    //           width: normalize(350),
    //           height: 90,
    //           marginRight: 15,
    //         }}
    //       >
    //         <WithLocalSvg
    //           width={19.75}
    //           height={15.42}
    //           asset={require("../../assets/Iconawesome-quote-left.svg")}
    //         />
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             fontSize: Font.h6,
    //             paddingLeft: 5,
    //             color: "#3E3E3E",
    //             lineHeight: normalize(24.5),
    //           }}
    //         >
    //           Small chemical components of food that are needed in adequate
    //           amounts by the body to grow, reproduce and lead a normal healthy
    //           Life are nutrients.
    //         </Text>
    //       </View>
    //       <Text
    //         style={{
    //           fontFamily: "Poppins-SemiBold",
    //           color: "#00B5E0",
    //           fontSize: Font.h5,
    //           lineHeight: normalize(28),
    //           textTransform: "uppercase",
    //         }}
    //       >
    //         Everything that is consumed consists of nutrients. Broadly speaking,
    //         there are 3 types of nutrients;
    //       </Text>
    //       <View style={{ flexDirection: "row", marginRight: 10 }}>
    //         <WithLocalSvg
    //           width={10}
    //           height={7}
    //           asset={require("../../assets/dot-svgrepo-com.svg")}
    //           style={{ marginTop: 8 }}
    //         />
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //             marginLeft: 5,
    //           }}
    //         >
    //           Macronutrients -
    //         </Text>
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Regular",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //             paddingLeft: 5,
    //           }}
    //         >
    //           Proteins, Fats,and {"\n"}Carbohydrates
    //         </Text>
    //       </View>
    //       <View style={{ flexDirection: "row" }}>
    //         <WithLocalSvg
    //           width={10}
    //           height={7}
    //           asset={require("../../assets/dot-svgrepo-com.svg")}
    //           style={{ marginTop: 8 }}
    //         />
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //             marginLeft: 5,
    //           }}
    //         >
    //           Micronutrients -
    //         </Text>
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Regular",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //             paddingLeft: 5,
    //           }}
    //         >
    //           Vitamins and Minerals.
    //         </Text>
    //       </View>

    //       <View style={{ flexDirection: "row" }}>
    //         <WithLocalSvg
    //           width={10}
    //           height={7}
    //           asset={require("../../assets/dot-svgrepo-com.svg")}
    //           style={{ marginTop: 8 }}
    //         />
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Medium",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //             marginLeft: 5,
    //           }}
    //         >
    //           Inorganic Nutrients -
    //         </Text>
    //         <Text
    //           style={{
    //             fontFamily: "Poppins-Regular",
    //             color: "#3E3E3E",
    //             fontSize: Font.p1,
    //             lineHeight: normalize(24.5),
    //             paddingLeft: 5,
    //           }}
    //         >
    //           Water and Oxygen
    //         </Text>
    //       </View>
    //       <Text
    //         style={{
    //           fontFamily: "Poppins-Medium",
    //           fontSize: Font.h6,
    //           paddingLeft: 5,
    //           color: "#838383",
    //           lineHeight: normalize(24.5),
    //           marginTop: 15,
    //         }}
    //       >
    //         All of these nutrients have a definite role and are obtained from
    //         different food sources. The health of the individual is influenced
    //         by the utilization of nutrients is called the nutritional status of
    //         an individual. The nutritional status can be determined through
    //         medical checkups, by the process of collecting and interpreting
    //         dietary and medical history. The nutritional status of a person can
    //         be good, fair, or poor.{"\n"}
    //         {"\n"} Nutritional assessment aids in identifying under-nutrition,
    //         overnutrition (more on this in a while), nutritional deficiencies,
    //         individuals at the risk of developing malnutrition, individuals at
    //         the risk of developing nutritionally related diseases, the resources
    //         available to assist them to overcome nutritional problems. Curiosity
    //         about nutrition is not a new phenomenon. Scientists have been
    //         studying food and nutrition for centuries. However, the landscape of
    //         Modern Nutrition has developed in recent years. During the initial
    //         years of the 20th Century, the discovery, isolation, and synthesis
    //         of micronutrients were performed. The goal was to study diseases of
    //         deficiency. With this, the advent of nutrition science began to take
    //         shape. It is not shocking to learn that widespread diseases were a
    //         starting point of most nutrition-centered research. More research
    //         was conducted about non-communicable diseases and how nutrition
    //         plays a role in them. Over the years, nutrition scientists realized
    //         that it is not nutrients in isolation that need to be studied, it is
    //         food and diet patterns in general. This is because silent epidemics
    //         such as malnutrition, obesity, and other food-related lifestyle
    //         diseases becoming more and more common. Since the 1990s, the
    //         emphasis has been placed on scientific, evidence-based research.
    //         Therefore, a lot more large-scale nutrition studies, randomized
    //         clinical trials, cohort studies, etc. are seen. But the reality is,
    //         despite progress across all spheres in lives, diet and food patterns
    //         are still driven by primal urges and needs. Every generation comes
    //         with its own set of health hazards. While human ancestors struggled
    //         to live longer, today, people are living longer but are crippled by
    //         lifestyle disorders. What does this mean? It means that the ‘one
    //         size fits all approach does not work when it comes to nutrition. It
    //         needs to be tweaked to the needs of the present situation and should
    //         be made sustainable. And of course, it should keep the diseases at
    //         bay.
    //       </Text>
    //     </View>
    // </ScrollView>
    {
      /* <View style={{ backgroundColor: "#FAFAFA", flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 40,
            width: "35%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
            borderRadius: 29,
            backgroundColor: "#EDEDED",
            shadowColor: "#00000029",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 3,
            marginLeft: 40,
          }}
          onPress={() => {
            props.navigation.navigate("UnitVideoTextScreen");
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: "#838383",
              fontSize: Font.h6,
              fontFamily: "Poppins-Regular",
            }}
          >
            Previous Lesson
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 40,
            width: "35%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
            borderRadius: 29,
            backgroundColor: "#00B5E0",
            shadowColor: "#00000029",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 3,
            marginLeft: 40,
          }}
          onPress={() => {}}
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
            Next Lesson
          </Text>
        </TouchableOpacity>
      </View> */
    }
    // </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UnitTextScreenFirst;
