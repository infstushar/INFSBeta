import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
  PixelRatio,
  TextInput,
} from "react-native";
import Colors from "../../constants/colors";
import Card from "../../components/Card";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/HeaderwithBack";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

const ForgotPasswordScreen = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [username, setUserName] = useState("");
  const SentEmail = () => {
    return (
      // <View>
      //   <View
      //     style={{
      //       backgroundColor: Colors.forgotbgsent,
      //       height: height * 0.4,
      //     }}
      //   >
      //     <View
      //       style={{
      //         height: "100%",
      //         width: "100%",
      //         position: "absolute",
      //         top: 10,
      //         left: -50,
      //         right: 10,
      //       }}
      //     >
      //       <WithLocalSvg
      //         width={width + 100}
      //         height={height * 0.5}
      //         style={{ posision: "absolute", top: -200 }}
      //         preserveAspectRatio="xMinYMin slice"
      //         asset={require("../../assets/Texture(1).svg")}
      //       />
      //     </View>
      //     <SafeAreaView>
      //       <TouchableOpacity
      //         onPress={() => {
      //           setIsEmailSent(false);
      //         }}
      //       >
      //         <WithLocalSvg
      //           width={24}
      //           height={16}
      //           asset={require("../../assets/Icon-ionic-ios-arrow-round-back_white.svg")}
      //           style={{ marginLeft: 15, marginTop: 7 }}
      //         />
      //       </TouchableOpacity>
      //     </SafeAreaView>
      //     <Text
      //       style={{
      //         fontSize: normalize(31.5),
      //         color: "#FFFFFF",
      //         marginHorizontal: 20,
      //         fontFamily: "Poppins-Bold",
      //         marginTop: 30,
      //       }}
      //     >
      //       Email has been sent!
      //     </Text>
      //     <Text
      //       style={{
      //         marginHorizontal: 10,
      //         color: "#FFFFFF",
      //         fontSize: normalize(17.5),
      //         marginVertical: 10,
      //         marginLeft: 25,
      //         fontFamily: "Poppins-Regular",
      //         marginBottom: 20,
      //       }}
      //     >
      //       We have sent you an email with a link to{"\n"} reset your password
      //     </Text>
      //   </View>

      //   <View>
      //     <Card style={styles.card}>
      //       <View
      //         style={{
      //           justifyContent: "center",
      //           alignItems: "center",
      //         }}
      //       >
      //         <View style={{}}></View>

      //         <WithLocalSvg
      //           width="100%"
      //           height="50%"
      //           asset={require("../../assets/fpsent.svg")}
      //         />
      //         <View
      //           style={{
      //             justifyContent: "center",
      //             alignItems: "center",
      //             marginTop: height * 0.08,
      //           }}
      //         >
      //           <Text
      //             style={{
      //               fontFamily: "Poppins-Medium",
      //               color: "#3E3E3E",
      //               fontSize: normalize(21),
      //             }}
      //           >
      //             Didn't receive the link?
      //           </Text>
      //           <Text
      //             style={{
      //               textDecorationLine: "underline",
      //               marginTop: 10,
      //               color: "#00B5E0",
      //               fontFamily: "Poppins-Regular",
      //               fontSize: normalize(15.75),
      //             }}
      //             onPress={() => {
      //               // Alert.alert('Email Resend Functionality Will Be Called Here!')
      //               setIsEmailSent(false);
      //             }}
      //           >
      //             Resend
      //           </Text>
      //         </View>
      //       </View>
      //     </Card>
      //   </View>
      // </View>
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <View style={{ width: "100%", height: "50%" }}>
          <View
            style={{
              width: "100%",
              height: "16%",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                alignItems: "center",
                margin: 15,
                width: 78,
                height: 28,
                fontFamily: "Roboto-Medium",
              }}
            >
              INFS
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "84%",
              backgroundColor: "#e6faff",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{ width: 206, height: 168, marginLeft: 40, marginTop: 40 }}
            >
              <WithLocalSvg
                width="100%"
                height="100%"
                preserveAspectRatio="xMinYMin slice"
                asset={require("../../assets/LogInImage.svg")}
              />
            </View>
            <View
              style={{
                width: 166,
                height: 57,
                marginLeft: 35,
                alignContent: "center",
                alignItems: "center",
                marginVertical: 8,
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  width: 166,
                  height: 15,
                  fontSize: 12,
                  lineHeight: 15,
                  fontFamily: "Roboto-Medium",
                  color: "#364F65",
                  fontWeight: "400",
                  marginLeft: 10,
                }}
              >
                Welcome to INFS Academy
              </Text>
              <Text
                style={{
                  width: 112,
                  height: 34,
                  fontSize: 24,
                  lineHeight: 33.6,
                  color: "#203B54",
                  fontWeight: "500",
                  fontFamily: "Roboto-Medium",
                }}
              >
                Login with
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              width: 327,
              height: 78,
              margin: 25,
              borderRadius: 5,
              marginVertical: 8,
            }}
          >
            <Text
              style={{
                width: 120,
                height: 22,
                fontSize: 14,
                lineHeight: 22.4,
                color: "#364F65",
                fontFamily: "Roboto-Regular",
                fontWeight: "400",
              }}
            >
              Email Address
            </Text>
            <TextInput
              //value={data.username}
              //onChangeText={(val) => textInputChange(val)}
              placeholder="UserName / Email"
              style={{
                width: 327,
                height: 48,
                lineHeight: 22.4,
                borderWidth: 1,
                borderColor: "#E7EDEF",
              }}
              //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#0E927A",
            height: 46,
            width: 327,
            borderRadius: 10,
            marginLeft: 30,
            marginTop: 30,
            marginRight: 30,
            marginBottom: 30,
            alignItems: "center",
            shadowColor: "rgba(0, 0, 0, 0.25)",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            marginHorizontal: 10,
          }}
          onPress={() => {
            //loginHandle(data.username, data.password);
          }}
        >
          <View
            style={{
              height: 22,
              width: 267,
              marginLeft: 30,
              marginTop: 12,
              marginRight: 30,
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#FBFBFB",
                fontFamily: "Roboto-Regular",
                fontWeight: "400",
              }}
            >
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    // <ScrollView
    //   contentContainerStyle={{
    //     flexGrow: 1,
    //     justifyContent: "space-between",
    //     backgroundColor: "white",
    //   }}
    // >
    //   {!isEmailSent ? (
    //     <View>
    //       <View
    //         style={{
    //           backgroundColor: Colors.forgotbg,
    //         }}
    //       >
    //         <View
    //           style={{
    //             height: "100%",
    //             width: "100%",
    //             position: "absolute",
    //             top: 10,
    //             left: -50,
    //             right: 10,
    //           }}
    //         >
    //           <WithLocalSvg
    //             width={width + 100}
    //             height={height * 0.5}
    //             style={{ posision: "absolute", top: -200 }}
    //             preserveAspectRatio="xMinYMin slice"
    //             asset={require("../../assets/Texture(1).svg")}
    //           />
    //         </View>
    //         <View>
    //           <SafeAreaView>
    //             <TouchableOpacity
    //               onPress={() => {
    //                 props.navigation.navigate("Login");
    //               }}
    //             >
    //               <WithLocalSvg
    //                 width={24}
    //                 height={16}
    //                 asset={require("../../assets/Icon-ionic-ios-arrow-round-back_white.svg")}
    //                 style={{ marginLeft: 15, marginTop: 7 }}
    //               />
    //             </TouchableOpacity>
    //           </SafeAreaView>
    //           <Text
    //             style={{
    //               fontSize: normalize(31.5),
    //               marginTop: "10%",
    //               color: "#FFFFFF",
    //               marginHorizontal: 20,
    //               fontFamily: "Poppins-Bold",
    //             }}
    //           >
    //             Forgot Password
    //           </Text>
    //           <Text
    //             style={{
    //               marginHorizontal: 20,
    //               color: "white",
    //               fontSize: normalize(17.5),
    //               marginVertical: 10,
    //               marginBottom: 120,
    //               fontFamily: "Poppins-Regular",
    //             }}
    //           >
    //             Enter your registered email below to get a{"\n"} link to reset
    //             your password
    //           </Text>
    //         </View>
    //       </View>

    //       <View style={{ marginBottom: 20, marginTop: 30 }}>
    //         <Card style={styles.card}>
    //           <View style={{ marginTop: 20 }}></View>
    //           <WithLocalSvg
    //             width="100%"
    //             height="50%"
    //             asset={require("../../assets/Vector_1-2.svg")}
    //           />

    //           <View
    //             style={{
    //               height: 50,
    //               borderRadius: 15,
    //               borderWidth: 1,
    //               flexDirection: "row",
    //               borderColor: "#D1D1D1",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               marginHorizontal: 20,
    //               marginVertical: 20,
    //               paddingHorizontal: 10,
    //               overflow: "hidden",
    //             }}
    //           >
    //             <WithLocalSvg
    //               width={21}
    //               height={14}
    //               asset={require("../../assets/Iconzocial-email.svg")}
    //             />
    //             <TextInput
    //               value={username}
    //               onChangeText={(name) => setUserName(name)}
    //               keyboardType="email-address"
    //               placeholder="Enter Register Email Address"
    //               style={{
    //                 width: "90%",
    //                 backgroundColor: "transparent",
    //                 fontSize: normalize(14),
    //                 fontFamily: "Poppins-Regular",
    //                 color: "#B7B7B7",
    //               }}
    //               placeholderTextColor="#B7B7B7"
    //             />
    //           </View>
    //           <TouchableOpacity
    //             onPress={() => {
    //               setIsEmailSent(true);
    //             }}
    //             style={{
    //               flexDirection: "row",
    //               height: 40,
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //               marginHorizontal: 20,
    //               borderRadius: 40,
    //               backgroundColor: Colors.textColor,
    //               marginTop: 20,
    //               marginBottom: 10,
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 flex: 1,
    //                 textAlign: "center",
    //                 paddingLeft: 40,
    //                 color: "white",
    //                 fontSize: normalize(18),
    //                 fontFamily: "Poppins-Regular",
    //               }}
    //             >
    //               Submit
    //             </Text>
    //             <View
    //               style={{
    //                 alignItems: "flex-end",
    //                 justifyContent: "flex-end",
    //                 paddingRight: 10,
    //               }}
    //             ></View>
    //           </TouchableOpacity>
    //         </Card>
    //       </View>
    //     </View>
    //   ) : (
    //     <SentEmail />
    //   )}
    // </ScrollView>

    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      {/* <Header
        title={`Reset Password`}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack(null);
        }}
        style={{ marginTop: 20, marginLeft: 10 }}
      >
        <Icon name="keyboard-backspace" size={25} color="#4D6276" />
      </TouchableOpacity>

      <View style={{ width: "100%", height: "60%" }}>
        <View
          style={{
            width: "100%",
            height: "12%",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              alignItems: "center",
              margin: 15,
              width: 78,
              height: 28,
              fontFamily: "Roboto-Medium",
            }}
          >
            INFS
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "60%",
            backgroundColor: "#e6faff",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              width: "45%",
              height: "60%",
              marginLeft: 40,
              marginTop: 20,
            }}
          >
            <WithLocalSvg
              width="100%"
              height="100%"
              preserveAspectRatio="xMinYMin slice"
              asset={require("../../assets/LogInImage.svg")}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 57,
              marginLeft: 35,
              alignContent: "center",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text
              style={{
                width: "90%",
                height: 15,
                fontSize: 12,
                lineHeight: 15,
                fontFamily: "Roboto-Medium",
                color: "#364F65",
                fontWeight: "400",
                marginLeft: 60,
              }}
            >
              Enter your registered email below to get a link of
            </Text>
            <Text
              style={{
                width: "40%",
                height: 34,
                fontSize: 16,
                lineHeight: 33.6,
                color: "#203B54",
                fontWeight: "500",
                fontFamily: "Roboto-Medium",
              }}
            >
              Reset your Password
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 78,
          margin: 25,
          borderRadius: 5,
          marginTop: -70,
        }}
      >
        <Text
          style={{
            width: 120,
            height: 22,
            fontSize: 14,
            lineHeight: 22.4,
            color: "#364F65",
            fontFamily: "Roboto-Regular",
            fontWeight: "400",
          }}
        >
          Email Address
        </Text>
        <TextInput
          //value={data.username}
          //onChangeText={(val) => textInputChange(val)}
          placeholder="UserName / Email"
          style={{
            width: 327,
            height: 48,
            lineHeight: 22.4,
            borderWidth: 1,
            borderColor: "#E7EDEF",
            backgroundColor: "#FFFFFF",
          }}
          //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#00B5E0",
          height: 46,
          width: 327,
          borderRadius: 10,
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 30,
          alignItems: "center",
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          marginHorizontal: 10,
        }}
        onPress={() => {
          //loginHandle(data.username, data.password);
        }}
      >
        <View
          style={{
            height: 22,
            width: 267,
            marginLeft: 30,
            marginTop: 12,
            marginRight: 30,
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#FBFBFB",
              fontFamily: "Roboto-Regular",
              fontWeight: "400",
            }}
          >
            Submit
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: -120,
    height: height * 0.45,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  fab: {
    right: 0,
    bottom: 0,
    marginTop: -30,
    backgroundColor: "white",
    elevation: 10,
  },
  fabS: {
    right: 0,
    bottom: 0,
    marginTop: -48,
    elevation: 10,
    backgroundColor: "#4e4e4e",
  },
  submitButton: {
    bottom: 0,
    left: 0,
  },
  socialButton: {
    backgroundColor: "white",
    marginHorizontal: 5,
  },
});

export default ForgotPasswordScreen;
