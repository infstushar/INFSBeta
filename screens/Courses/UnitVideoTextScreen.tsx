import React, { useEffect, useState } from "react";
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
  const { id } = getVideoId(props.source.content.video);

  return (
    <View style={{ width, height }}>
      <View style={{ width, height: 350 }}>
        <VimeoPlayer videoId={id} />
      </View>

      <View>
        <Text
          style={{
            color: "#3E3E3E",
            fontSize: Font.h5,
            marginLeft: 15,
            fontFamily: "Poppins-SemiBold",
            marginTop: 15,
          }}
        >
          {props.source.title}
        </Text>
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
});

export default UnitVideoTextScreen;
