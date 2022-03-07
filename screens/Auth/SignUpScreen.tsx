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
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/HeaderwithBack";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

const SignUpScreen = (props) => {
  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View style={{ width: "100%", height: "50%" }}>
        <View
          style={{
            width: "100%",
            height: "13%",
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
            style={{
              width: "60%",
              height: "55%",
              marginLeft: 40,
              marginTop: 10,
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
              width: "50%",
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
                width: "100%",
                height: 15,
                fontSize: 12,
                lineHeight: 15,
                fontFamily: "Roboto-Medium",
                color: "#364F65",
                fontWeight: "400",
                marginLeft: "40%",
              }}
            >
              Welcome to INFS
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
              Sign up
            </Text>
          </View>
        </View>
      </View>

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
          placeholder="Email"
          style={{
            width: 327,
            height: 48,
            lineHeight: 22.4,
            borderWidth: 1,
            borderColor: "#E7EDEF",
          }}
          // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
      </View>
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
          User Name
        </Text>
        <TextInput
          //value={data.username}
          //onChangeText={(val) => textInputChange(val)}
          placeholder="UserName"
          style={{
            width: 327,
            height: 48,
            lineHeight: 22.4,
            borderWidth: 1,
            borderColor: "#E7EDEF",
          }}
          // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
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
            Password
          </Text>
          <TextInput
            //value={data.password}
            //onChangeText={(val) => handlePasswordChange(val)}
            placeholder="******"
            style={{
              width: 327,
              height: 48,
              lineHeight: 22.4,
              borderWidth: 1,
              borderColor: "#E7EDEF",
            }}
            secureTextEntry={true}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#00B5E0",
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
          props.navigation.navigate("Login");
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
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
