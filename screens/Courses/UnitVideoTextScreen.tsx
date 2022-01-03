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
  StatusBar,
} from "react-native";

//import VimeoPlayer from "../Courses/VimeoPlayer";
import getVideoId from "get-video-id";
import { ScrollView } from "react-native-gesture-handler";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";
import { WebView } from "react-native-webview";
import ReactPlayer from "react-player/vimeo";

import { VimeoPlayer } from "@mindtechapps/rn-vimeo-player";
//import VideoPlayer from "react-native-video-controls";
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

const UnitVideoTextScreen = (props) => {
  const { id } = getVideoId(props.route.params.content.video);
  return (
    <View style={{ width, height, flex: 1 }}>
      <StatusBar hidden />
      <Header
        title={`Unit ${props.route.params.order}`}
        onPress={() => {
          props.navigation.navigate("UnitScreen");
        }}
      />
      <View style={{ width, height: 350 }}>
        <VimeoPlayer videoId={id} />
      </View>

      <Text
        style={{
          flex: 1,
          textAlign: "left",
          color: "#3E3E3E",
          fontSize: Font.h5,
          marginLeft: 15,
          fontFamily: "Poppins-Regular",
        }}
      >
        Unit : {props.route.params.title}
      </Text>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          width: width,
        }}
      >
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
            props.navigation.navigate("UnitTextScreen");
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
          onPress={() => {
            //props.navigation.navigate("UnitTextScreenFirst",);
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
            Next Lesson
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default UnitVideoTextScreen;
