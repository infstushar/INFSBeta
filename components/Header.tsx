import * as React from "react";
import { Appbar } from "react-native-paper";
import {
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { WithLocalSvg } from "react-native-svg";
import Font from "../constants/Font";

const { width, height } = Dimensions.get("window");

const Header = (props) => {
  return (
    <ImageBackground
      source={require("../assets/Background3x.png")}
      resizeMode="cover"
      style={{ width: wp("100%") }}
    >
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: Font.h2,
              fontFamily: "Poppins-SemiBold",
              color: "#FFFFFF",
              marginLeft: 10,
            }}
          >
            {props.title}
          </Text>
          {/* <WithLocalSvg
            width={18}
            height={18}
            asset={require("../assets/Notification.svg")}
            style={{ marginLeft: wp("50%"), marginTop: 15 }}
          /> */}
        </View>
      </Appbar.Header>
    </ImageBackground>
  );
};

export default Header;
