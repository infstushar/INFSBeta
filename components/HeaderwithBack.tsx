import * as React from "react";
import { Appbar } from "react-native-paper";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { WithLocalSvg } from "react-native-svg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Font from "../constants/Font";
import { AuthContext } from "./Context";

const HeaderwithBack = (props) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ImageBackground
      source={require("../assets/Background3x.png")}
      resizeMode="cover"
      style={{ width: wp("100%") }}
    >
      <StatusBar hidden />
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <View style={{ width: wp("42%"), flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              props.onPress();
            }}
          >
            <WithLocalSvg
              width={24}
              height={16}
              asset={require("../assets/Icon-ionic-ios-arrow-round-back_white.svg")}
              style={{ marginLeft: 15, marginTop: 7 }}
            />
          </TouchableOpacity>
          <View style={{ width: wp("60%") }}>
            <Text
              style={{
                fontSize: Font.h4,
                fontFamily: "Poppins-SemiBold",
                color: "#FFFFFF",
                marginLeft: 10,
              }}
              numberOfLines={1}
            >
              {props.title}
            </Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              signOut();
            }}
          >
            <Icon
              name="logout"
              size={25}
              color="white"
              style={{
                marginLeft: wp("20%"),
                marginTop: 7,
              }}
            />
          </TouchableOpacity> */}

          {/* <WithLocalSvg
            width={18}
            height={18}
            asset={require("../assets/Notification.svg")}
            style={{ marginLeft: wp("20%"), marginTop: 7 }}
          /> */}
        </View>
      </Appbar.Header>
    </ImageBackground>
  );
};

export default HeaderwithBack;
