import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
} from "react-native";
import Colors from "../../constants/colors";
import Card from "../../components/Card";

import { TextInput, ActivityIndicator } from "react-native-paper";
import { WithLocalSvg } from "react-native-svg";
import RoundedButton from "../../components/RoundedButton";
import Font from "../../constants/Font";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

const LoginScreen = (props: {
  route: any;
  navigation: { navigate: (arg0: string) => void };
}) => {
  //const { login } = props.route.params;
  const [isSignUpClicked, setIsSignUpClicked] = useState(true);
  const [isLoginClicked, setIsLoginlicked] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    //   if (login != null) {
    //     if (login) {
    //       setIsLoginlicked(true);
    //       setIsSignUpClicked(false);
    //     }
    //   }
    setIsLoginlicked(true);
    setIsSignUpClicked(false);
  }, []);

  /**
   *
   * @returns Login Code
   */
  const Login = () => {
    const [radioData, setRadioData] = useState(["Remember Me"]);
    const [radioChecked, setRadioChecked] = useState(0);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
      setRadioChecked(-1);
    }, []);

    return (
      <View style={{ marginBottom: 30 }}>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              height: 45,
              borderRadius: 15,
              borderWidth: 1,
              flexDirection: "row",
              borderColor: "#D1D1D1",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              overflow: "hidden",
            }}
          >
            <WithLocalSvg
              width={19}
              height={20}
              asset={require("../../assets/Iconawesome-user.svg")}
            />
            <TextInput
              value={username}
              keyboardType="email-address"
              onChangeText={(name) => setUserName(name)}
              placeholder="UserName / Email"
              style={{
                width: "90%",
                backgroundColor: "transparent",
                color: "#B7B7B7",
                fontSize: Font.p1,
              }}
              placeholderTextColor="#B7B7B7"
            />
          </View>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
          <View
            style={{
              height: 45,
              borderRadius: 15,
              borderWidth: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              borderColor: "#D1D1D1",
              overflow: "hidden",
            }}
          >
            <WithLocalSvg
              width={16.2}
              height={19}
              asset={require("../../assets/Iconawesome-lock.svg")}
            />
            <TextInput
              value={password}
              secureTextEntry
              keyboardType="email-address"
              onChangeText={(name) => setPassword(name)}
              placeholder="Password"
              style={{
                width: "90%",
                backgroundColor: "transparent",
                color: "#B7B7B7",
                fontSize: Font.p1,
              }}
              placeholderTextColor="#B7B7B7"
            />
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 5 }}>
          {radioData.map((data, key) => {
            return (
              <View key={key}>
                {radioChecked == key ? (
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      setRadioChecked(-1);
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 25,
                        width: 18,
                        height: 18,
                        borderColor: "#838383",
                      }}
                    >
                      <WithLocalSvg
                        width={"300%"}
                        height={"300%"}
                        asset={require("../../assets/Remember_me.svg")}
                        style={{
                          position: "absolute",
                          top: -14,
                          marginRight: 40,
                          marginLeft: -14,
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        marginLeft: 5,
                        fontSize: Font.h5,
                        color: "#838383",
                      }}
                    >
                      {data}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setRadioChecked(key);
                      console.log("Key", key);
                    }}
                    style={styles.btn}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 25,
                        width: 18,
                        height: 18,
                        borderColor: "#838383",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        marginLeft: 5,
                        color: "#838383",
                        fontSize: Font.h5,
                      }}
                    >
                      {data}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 40,
            marginHorizontal: 10,
          }}
        >
          <Text
            onPress={() => {
              //props.navigation.navigate("ForgotPassword");
              props.navigation.navigate("ForgotUsername");
            }}
            style={{
              marginLeft: 10,
              textDecorationLine: "underline",
              fontFamily: "Poppins-Regular",
              color: "#00B5E0",
              fontSize: Font.h6,
            }}
          >
            Forgot Username?
          </Text>

          <Text
            onPress={() => {
              props.navigation.navigate("ForgotPassword");
            }}
            style={{
              marginRight: 10,
              textDecorationLine: "underline",
              fontFamily: "Poppins-Regular",
              color: "#00B5E0",
              fontSize: Font.h6,
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <RoundedButton
          onPress={() => {
            props.navigation.navigate("Home");
          }}
          title="Login"
          textVisible={true}
          visible={true}
        />

        {isDone ? <ActivityIndicator style={{ marginTop: 20 }} /> : null}
      </View>
    );
  };

  /**
   *
   * @returns Sign Up Code
   */
  const SignUp = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const onChange = (
      password,
      score,
      { label, labelColor, activeBarColor }
    ) => {
      console.log(password, score, { label, labelColor, activeBarColor });
    };
    return (
      <View style={{ marginBottom: 30 }}>
        <View style={{ marginHorizontal: 20 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  width: 320,
                  height: 200,

                  shadowRadius: 4,
                }}
              >
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                  <View style={{ width: 220, height: 50 }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: Font.h6,
                        color: "#555555",
                      }}
                      numberOfLines={2}
                    >
                      Password must meet the following requirements:
                    </Text>
                  </View>
                  <WithLocalSvg
                    width={35}
                    height={35}
                    asset={require("../../assets/Close_icon.svg")}
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{ marginLeft: 30 }}
                  />
                </View>
                <View style={{ marginTop: 20, marginLeft: 20 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: Font.p1,
                      color: "#838383",
                    }}
                  >
                    At least one letter
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: Font.p1,
                      color: "#838383",
                    }}
                  >
                    At least one capital letter
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: Font.p1,
                      color: "#838383",
                    }}
                  >
                    At least one number
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: Font.p1,
                      color: "#838383",
                    }}
                  >
                    Be at least 8 characters
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <View
            style={{
              height: hp("5.9%"),
              borderRadius: 15,
              borderWidth: 1,
              flexDirection: "row",
              borderColor: "#D1D1D1",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              overflow: "hidden",
            }}
          >
            <WithLocalSvg
              width={19}
              height={20}
              asset={require("../../assets/Iconawesome-user.svg")}
            />
            <TextInput
              value={username}
              onChangeText={(name) => setUserName(name)}
              keyboardType="email-address"
              placeholder="Full Name"
              style={{
                width: wp("60%"),
                backgroundColor: "transparent",
                fontFamily: "Poppins-Regular",
                color: "#B7B7B7",
                fontSize: Font.p1,
              }}
              placeholderTextColor="#B7B7B7"
            />
          </View>
          <View
            style={{
              height: hp("5.9%"),
              borderRadius: 15,
              borderWidth: 1,
              flexDirection: "row",
              borderColor: "#D1D1D1",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              marginTop: 10,
              overflow: "hidden",
            }}
          >
            <WithLocalSvg
              width={21}
              height={14}
              asset={require("../../assets/Iconzocial-email.svg")}
            />
            <TextInput
              keyboardType="default"
              value={email}
              onChangeText={(name) => setEmail(name)}
              placeholder="Email Address"
              style={{
                width: wp("60%"),
                backgroundColor: "transparent",
                fontFamily: "Poppins-Regular",
                color: "black",
                fontSize: Font.p1,
              }}
              placeholderTextColor="#B7B7B7"
            />
          </View>

          <View
            style={{
              height: hp("5.9%"),
              borderRadius: 15,
              borderWidth: 1,
              flexDirection: "row",
              borderColor: "#D1D1D1",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              marginTop: 10,
              marginBottom: 20,
              overflow: "hidden",
            }}
          >
            <WithLocalSvg
              width={16.2}
              height={19}
              asset={require("../../assets/Iconawesome-lock.svg")}
            />
            <TextInput
              keyboardType="email-address"
              value={password}
              secureTextEntry
              onChangeText={(name) => setPassword(name)}
              placeholder="Password"
              style={{
                width: wp("55%"),
                backgroundColor: "transparent",
                fontFamily: "Poppins-Regular",
                color: "#B7B7B7",
                fontSize: Font.p1,
              }}
              placeholderTextColor="#B7B7B7"
            />
            <WithLocalSvg
              width={21}
              height={21}
              asset={require("../../assets/Iconionic-ios-information-circle.svg")}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              color: "#838383",
              fontSize: Font.h5,
              alignContent: "center",
              fontFamily: "Poppins-Medium",
              lineHeight: 26,
            }}
          >
            By clicking “sign up” you agree to our
          </Text>
          <Text
            onPress={() => {
              props.navigation.navigate("TandCScreen");
            }}
            style={{
              color: "#00B5E0",
              fontSize: Font.h6,
              marginVertical: 10,
              alignContent: "center",
              textDecorationLine: "underline",
              fontFamily: "Poppins-Regular",
            }}
          >
            Terms & condition / Privacy Policy
          </Text>
        </View>
        <RoundedButton
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          title="Sign Up"
          textVisible={true}
          visible={true}
        />

        {isDone ? <ActivityIndicator style={{ marginTop: 20 }} /> : null}
      </View>
    );
  };

  /**
   * Main Screen Component Render.
   */
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <View style={{ height: "80%" }}>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              height: wp("100%"),
              width: hp("100%"),
              position: "absolute",
              top: 10,
              left: -50,
              right: 10,
            }}
          >
            <WithLocalSvg
              width={wp("126%")}
              height={hp("50%")}
              style={{ posision: "absolute", top: -wp("24%") }}
              preserveAspectRatio="xMinYMin slice"
              asset={require("../../assets/Texture(1).svg")}
            />
          </View>
          <View>
            {!isSignUpClicked ? (
              <Text
                style={{
                  fontSize: Font.h2,
                  marginTop: hp("5%"),
                  color: "#FFFFFF",
                  marginHorizontal: 20,
                  fontFamily: "Poppins-Bold",
                }}
              >
                Welcome!
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: Font.h2,
                  marginTop: hp("5%"),
                  color: "#FFFFFF",
                  marginHorizontal: 20,
                  fontFamily: "Poppins-Bold",
                }}
              >
                Hello!
              </Text>
            )}
            {!isSignUpClicked ? (
              <Text
                style={{
                  marginHorizontal: 20,
                  color: "#FFFFFF",
                  fontSize: Font.h5,
                  marginVertical: 10,
                  marginBottom: 70,
                  fontFamily: "Poppins-Regular",
                }}
              >
                Please log in to access the key to nutrition and fitness
                education
              </Text>
            ) : (
              <Text
                style={{
                  marginHorizontal: 20,
                  color: "#FFFFFF",
                  fontSize: Font.h5,
                  marginVertical: 10,
                  marginBottom: 70,
                  fontFamily: "Poppins-Regular",
                }}
              >
                You are a few steps away from a treasure of knowledge on fitness
                and nutrition
              </Text>
            )}
          </View>
        </View>

        <View>
          <Card style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginVertical: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: Font.h4,
                    color: Colors.textColor,
                    fontFamily: "Poppins-Regular",
                  }}
                  onPress={() => {
                    setIsLoginlicked(true);
                    setIsSignUpClicked(false);
                  }}
                >
                  Login
                </Text>
                {isLoginClicked ? (
                  <View
                    style={{
                      width: wp("13%"),
                      height: 3,
                      marginTop: 5,
                      backgroundColor: Colors.textColor,
                    }}
                  ></View>
                ) : null}
              </View>

              <View style={{ marginHorizontal: 20 }}>
                <Text
                  style={{
                    fontSize: Font.h4,
                    color: Colors.textColor,
                    fontFamily: "Poppins-Regular",
                  }}
                  onPress={() => {
                    setIsLoginlicked(false);
                    setIsSignUpClicked(true);
                  }}
                >
                  SignUp
                </Text>
                {isSignUpClicked ? (
                  <View
                    style={{
                      width: wp("18%"),
                      height: 3,
                      marginTop: 5,
                      backgroundColor: Colors.textColor,
                    }}
                  ></View>
                ) : null}
              </View>
            </View>
            <View style={{ alignSelf: "baseline", width: "100%" }}>
              {isLoginClicked ? <Login /> : <SignUp />}
            </View>
          </Card>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: -wp("15%"),
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: "#838383",
            fontSize: Font.h4,
            marginBottom: 10,
            marginTop: 45,
          }}
        >
          Or
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#e0e0e0",
            borderRadius: 25,
            borderWidth: 1,
            backgroundColor: "#3b5988",
            marginTop: 10,
            padding: 10,
            width: wp("64%"),
            height: hp("5%"),
          }}
        >
          <WithLocalSvg
            width={wp("70%")}
            height={hp("100%")}
            asset={require("../../assets/facebook.svg")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#e0e0e0",
            borderRadius: 25,
            marginTop: 20,
            marginBottom: 30,
            borderWidth: 1,
            backgroundColor: "#db4437",
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 20,
            width: wp("64%"),
            height: hp("5%"),
          }}
        >
          <WithLocalSvg
            width={wp("70%")}
            height={hp("100%%")}
            asset={require("../../assets/Googleplus.svg")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: -hp("10%"),
    marginBottom: 5,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    color: "#838383",
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
    marginTop: -hp("5%"),
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
  container: {
    paddingTop: hp("12%"),
  },
  textInput: {
    borderBottomWidth: 0.3,
    borderBottomColor: "black",
    height: hp("3%"),
    fontSize: Font.h6,
    marginVertical: hp("6%"),
    marginHorizontal: 20,
  },
});

export default LoginScreen;
