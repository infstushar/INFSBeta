import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { Card, Chip } from "react-native-paper";
import { WithLocalSvg } from "react-native-svg";
import Font from "../constants/Font";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import getVideoId from "get-video-id";
import { VimeoPlayer } from "@mindtechapps/rn-vimeo-player";

const { width, height } = Dimensions.get("window");

const CardCoponentScreent = (props) => {
  // const { id } = getVideoId(props.Img);
  return (
    <Card
      style={styles.card}
      onPress={() => {
        props.onPress();
      }}
    >
      <Card.Content>
        <Image source={props.Img} style={styles.imageContainer}></Image>

        {/* <View style={styles.imageContainer}>
          <VimeoPlayer videoId={id} />
    </View>*/}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 50,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#37B84C",
            marginLeft: width * 0.73,
            marginTop: 2,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: Font.p2,
              fontFamily: "Poppins-Medium",
              color: "#FFFFFF",
            }}
          >
            4.5
          </Text>

          <WithLocalSvg
            width={12}
            height={12}
            asset={require("../assets/Iconionic-ios-star.svg")}
            style={{ marginLeft: 3 }}
          />
        </View>

        <View style={{ marginTop: hp("21%"), flexGrow: 1 }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: Font.h5,
                  color: "#3E3E3E",
                  lineHeight: 25,
                  paddingBottom: 10,
                }}
              >
                {props.title}
              </Text>
            </View>
            <View style={{ width: wp("80%"), height: hp("8.6%") }}>
              <Text numberOfLines={3} style={styles.cardTextStyleForRegular}>
                {props.description}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <Image
                source={require("../assets/abc.jpeg")}
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
                  lineHeight: 24,
                  marginLeft: 5,
                }}
              >
                Instructor:
              </Text>
              <Text style={styles.cardTextStyleforMedium}>{props.author}</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 35,
                  position: "absolute",
                  right: 10,
                  top: 5,
                }}
              >
                <WithLocalSvg
                  width={12}
                  height={14}
                  asset={require("../assets/Iconawesome-rupee-sign.svg")}
                  style={{ marginTop: 5 }}
                />
                <Text style={styles.priceTextStyle}>
                  {Math.floor(props.price)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <WithLocalSvg
                width={22}
                height={14}
                asset={require("../assets/Iconmaterial-group(2).svg")}
                style={{ marginTop: 3 }}
              />
              <Text style={styles.cardTextStyleforMedium}>
                {props.studentEnroll} Students Enrolled
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <WithLocalSvg
                width={18}
                height={19}
                asset={require("../assets/Iconionic-ios-stopwatch(1).svg")}
                style={{}}
              />
              <Text style={styles.cardTextStyleforMedium}>
                {props.hrs / 30} Credits
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 15 }}>
          <Chip
            style={styles.chipContainerStyle}
            textStyle={styles.tagtextStyle}
          >
            {props.tag}
          </Chip>
          <Chip
            style={styles.chipContainerStyle}
            textStyle={styles.tagtextStyle}
          >
            Fitness
          </Chip>
          <Chip
            style={styles.chipContainerStyle}
            textStyle={styles.tagtextStyle}
          >
            Health
          </Chip>
          <Chip
            style={styles.chipContainerStyle}
            textStyle={styles.tagtextStyle}
          >
            Health
          </Chip>
        </View>
        <View style={{ height: height * 0.5 }}></View>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "#0000001A",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 1,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 20,
    width: wp("94%"),
    height: hp("59%"),
    flexGrow: 1,
  },
  imageContainer: {
    width: wp("94%"),
    height: hp("25%"),
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: "stretch",
  },
  tagtextStyle: {
    fontSize: Font.p1,
    fontFamily: "Poppins-Regular",
    color: "#3E3E3E",
  },
  chipContainerStyle: {
    marginRight: 5,
    height: 25,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  ratingContainerStyle: {
    width: 50,
    height: 20,
    alignItems: "center",
    backgroundColor: "#37B84C",
    marginLeft: width * 0.73,
    marginTop: 2,
    flexGrow: 1,
  },
  cardTextStyleforMedium: {
    fontFamily: "Poppins-Medium",
    fontSize: Font.p1,
    color: "#3E3E3E",
    paddingLeft: 5,
    lineHeight: 24,
  },
  priceTextStyle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Font.h5,
    color: "#3E3E3E",
    marginLeft: 1,
    lineHeight: 24,
  },
  cardTextStyleForRegular: {
    fontFamily: "Poppins-Regular",
    fontSize: Font.p1,
    color: "#838383",
    lineHeight: 24,
  },
});

export default CardCoponentScreent;
