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
  TextInput,
  Pressable,
} from "react-native";
import Colors from "../../constants/colors";
import Card from "../../components/Card";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { WithLocalSvg } from "react-native-svg";
import RoundedButton from "../../components/RoundedButton";
import Font from "../../constants/Font";
import Header from "../../components/HeaderwithBack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../../components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");
const Users = [
  {
    id: 1,
    email: "user1@email.com",
    username: "user1",
    password: "password",
    userToken: "token123",
  },
  {
    id: 2,
    email: "user2@email.com",
    username: "user2",
    password: "pass1234",
    userToken: "token12345",
  },
  {
    id: 3,
    email: "testuser@email.com",
    username: "testuser",
    password: "testpass",
    userToken: "testtoken",
  },
];

const LoginScreen = (props: {
  route: any;
  navigation: { navigate: (arg0: string) => void };
}) => {
  //const { login } = props.route.params;
  const [isSignUpClicked, setIsSignUpClicked] = useState(true);
  const [isLoginClicked, setIsLoginlicked] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");

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

  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidResponse: true,
  });

  const { signIn } = React.useContext(AuthContext);

  const loginHandle = async (userName, password) => {
    try {
      const response = await axios.post(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/api/token/`,
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        signIn(response.data);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      setData({
        ...data,
        isValidResponse: false,
      });
      setModalVisible(true);
      // Alert.alert("username or password is not right", "", [
      //   { text: "ok", onPress: () => props.navigation.navigate("Login") },
      // ]);

      // throw new Error(error);
    }
  };
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  /**
   *
   * @returns Login Code
   */
  // const Login = () => {
  //   const [radioData, setRadioData] = useState(["Remember Me"]);
  //   const [radioChecked, setRadioChecked] = useState(0);
  //   const [data, setData] = useState({
  //     username: "",
  //     password: "",
  //     check_textInputChange: false,
  //     secureTextEntry: true,
  //     isValidUser: true,
  //     isValidPassword: true,
  //   });
  //   // const [username, setUserName] = useState("");
  //   // const [password, setPassword] = useState("");

  //   const { signIn } = React.useContext(AuthContext);
  //   useEffect(() => {
  //     setRadioChecked(-1);
  //   }, []);

  //   const loginHandle = async (userName, password) => {
  //     try {
  //       const response = await axios.post(
  //         `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/api/token/`,
  //         {
  //           username: userName,
  //           password: password,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         signIn(response.data);
  //       } else {
  //         throw new Error("An error has occurred");
  //       }
  //     } catch (error) {
  //       Alert.alert("username or password is not right", "", [
  //         { text: "ok", onPress: () => props.navigation.navigate("login") },
  //       ]);
  //     }
  //   };

  //   const textInputChange = (val) => {
  //     if (val.trim().length >= 4) {
  //       setData({
  //         ...data,
  //         username: val,
  //         check_textInputChange: true,
  //         isValidUser: true,
  //       });
  //     } else {
  //       setData({
  //         ...data,
  //         username: val,
  //         check_textInputChange: false,
  //         isValidUser: false,
  //       });
  //     }
  //   };

  //   const handlePasswordChange = (val) => {
  //     if (val.trim().length >= 8) {
  //       setData({
  //         ...data,
  //         password: val,
  //         isValidPassword: true,
  //       });
  //     } else {
  //       setData({
  //         ...data,
  //         password: val,
  //         isValidPassword: false,
  //       });
  //     }
  //   };

  //   const updateSecureTextEntry = () => {
  //     setData({
  //       ...data,
  //       secureTextEntry: !data.secureTextEntry,
  //     });
  //   };

  //   const handleValidUser = (val) => {
  //     if (val.trim().length >= 4) {
  //       setData({
  //         ...data,
  //         isValidUser: true,
  //       });
  //     } else {
  //       setData({
  //         ...data,
  //         isValidUser: false,
  //       });
  //     }
  //   };

  //   return (
  //     <View style={{ marginBottom: 30 }}>
  //       {/* <View style={{ marginHorizontal: 20 }}>
  //         <View
  //           style={{
  //             height: 50,
  //             borderRadius: 15,
  //             borderWidth: 1,
  //             flexDirection: "row",
  //             borderColor: "#D1D1D1",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             paddingHorizontal: 10,
  //             overflow: "hidden",
  //           }}
  //         >
  //           <WithLocalSvg
  //             width={19}
  //             height={20}
  //             asset={require("../../assets/Iconawesome-user.svg")}
  //           />
  //           <TextInput
  //             value={data.username}
  //             keyboardType="email-address"
  //             onChangeText={(val) => textInputChange(val)}
  //             placeholder="UserName / Email"
  //             style={{
  //               width: "90%",
  //               backgroundColor: "transparent",
  //               fontSize: Font.p1,
  //               color: "black",
  //               fontFamily: "Poppins-Regular",
  //               height: 50,
  //               marginLeft: 5,
  //             }}
  //             placeholderTextColor="#B7B7B7"
  //             onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
  //           />
  //         </View>
  //       </View>

  //       {data.isValidUser ? null : (
  //         <Animatable.View animation="fadeInLeft" duration={500}>
  //           <Text
  //             style={{
  //               color: "red",
  //               fontSize: Font.p2,
  //               fontFamily: "Poppins-Regular",
  //               marginLeft: 20,
  //             }}
  //           >
  //             Username must be 4 characters long.
  //           </Text>
  //         </Animatable.View>
  //       )}
  //       <View style={{ marginTop: 10, marginHorizontal: 20 }}>
  //         <View
  //           style={{
  //             height: 50,
  //             borderRadius: 15,
  //             borderWidth: 1,
  //             flexDirection: "row",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             paddingHorizontal: 10,
  //             borderColor: "#D1D1D1",
  //             overflow: "hidden",
  //           }}
  //         >
  //           <WithLocalSvg
  //             width={16.2}
  //             height={19}
  //             asset={require("../../assets/Iconawesome-lock.svg")}
  //           />
  //           <TextInput
  //             value={data.password}
  //             secureTextEntry={true}
  //             //keyboardType="email-address"
  //             onChangeText={(val) => handlePasswordChange(val)}
  //             placeholder="Password"
  //             style={{
  //               width: "90%",
  //               backgroundColor: "transparent",
  //               fontSize: Font.p1,
  //               color: "black",
  //               fontFamily: "Poppins-Regular",
  //               height: 50,
  //               marginLeft: 5,
  //             }}
  //             placeholderTextColor="#B7B7B7"
  //           />
  //         </View>
  //         {data.isValidPassword ? null : (
  //           <Animatable.View animation="fadeInLeft" duration={500}>
  //             <Text
  //               style={{
  //                 color: "red",
  //                 fontSize: Font.p2,
  //                 fontFamily: "Poppins-Regular",
  //               }}
  //             >
  //               Password must be 8 characters long.
  //             </Text>
  //           </Animatable.View>
  //         )}
  //       </View> */}

  //       {/* <View style={{ marginTop: 20, marginHorizontal: 5 }}>
  //         {radioData.map((data, key) => {
  //           return (
  //             <View key={key}>
  //               {radioChecked == key ? (
  //                 <TouchableOpacity
  //                   style={styles.btn}
  //                   onPress={() => {
  //                     setRadioChecked(-1);
  //                   }}
  //                 >
  //                   <View
  //                     style={{
  //                       borderWidth: 2,
  //                       borderRadius: 25,
  //                       width: 18,
  //                       height: 18,
  //                       borderColor: "#838383",
  //                     }}
  //                   >
  //                     <WithLocalSvg
  //                       width={"300%"}
  //                       height={"300%"}
  //                       asset={require("../../assets/Remember_me.svg")}
  //                       style={{
  //                         position: "absolute",
  //                         top: -14,
  //                         marginRight: 40,
  //                         marginLeft: -14,
  //                       }}
  //                     />
  //                   </View>

  //                   <Text
  //                     style={{
  //                       fontFamily: "Poppins-Regular",
  //                       marginLeft: 5,
  //                       marginTop: 5,
  //                       fontSize: Font.h5,
  //                       color: "#838383",
  //                     }}
  //                   >
  //                     {data}
  //                   </Text>
  //                 </TouchableOpacity>
  //               ) : (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     setRadioChecked(key);
  //                     console.log("Key", key);
  //                   }}
  //                   style={styles.btn}
  //                 >
  //                   <View
  //                     style={{
  //                       borderWidth: 2,
  //                       borderRadius: 25,
  //                       width: 18,
  //                       height: 18,
  //                       borderColor: "#838383",
  //                     }}
  //                   ></View>
  //                   <Text
  //                     style={{
  //                       fontFamily: "Poppins-Regular",
  //                       marginLeft: 5,
  //                       marginTop: 5,
  //                       color: "#838383",
  //                       fontSize: Font.h5,
  //                     }}
  //                   >
  //                     {data}
  //                   </Text>
  //                 </TouchableOpacity>
  //               )}
  //             </View>
  //           );
  //         })}
  //       </View> */}

  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           marginTop: 10,
  //           marginBottom: 40,
  //           marginHorizontal: 10,
  //         }}
  //       >
  //         <Text
  //           onPress={() => {
  //             //props.navigation.navigate("ForgotPassword");
  //             props.navigation.navigate("ForgotUsername");
  //           }}
  //           style={{
  //             marginLeft: 10,
  //             textDecorationLine: "underline",
  //             fontFamily: "Poppins-Regular",
  //             color: "#00B5E0",
  //             fontSize: Font.h6,
  //           }}
  //         >
  //           Forgot Username?
  //         </Text>

  //         <Text
  //           onPress={() => {
  //             props.navigation.navigate("ForgotPassword");
  //           }}
  //           style={{
  //             marginRight: 10,
  //             textDecorationLine: "underline",
  //             fontFamily: "Poppins-Regular",
  //             color: "#00B5E0",
  //             fontSize: Font.h6,
  //           }}
  //         >
  //           Forgot Password?
  //         </Text>
  //       </View>
  //       <RoundedButton
  //         onPress={() => {
  //           //signIn();
  //           //props.navigation.navigate("Home");
  //           loginHandle(data.username, data.password);
  //         }}
  //         title="Login"
  //         textVisible={true}
  //         visible={true}
  //       />

  //       {isDone ? <ActivityIndicator style={{ marginTop: 20 }} /> : null}
  //     </View>
  //   );
  // };

  /**
   *
   * @returns Sign Up Code
   */
  // const SignUp = () => {
  //   const [username, setUserName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [visible, setVisible] = React.useState(false);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const showModal = () => setVisible(true);
  //   const hideModal = () => setVisible(false);

  //   const onChange = (
  //     password,
  //     score,
  //     { label, labelColor, activeBarColor }
  //   ) => {
  //     console.log(password, score, { label, labelColor, activeBarColor });
  //   };
  //   return (
  //     <View style={{ marginBottom: 30 }}>
  //       <View style={{ marginHorizontal: 20 }}>
  //         <Modal
  //           animationType="fade"
  //           transparent={true}
  //           visible={modalVisible}
  //           onRequestClose={() => {
  //             setModalVisible(!modalVisible);
  //           }}
  //         >
  //           <View
  //             style={{
  //               flex: 1,
  //               backgroundColor: "rgba(52, 52, 52, 0.8)",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <View
  //               style={{
  //                 backgroundColor: "#FFFFFF",
  //                 borderRadius: 20,
  //                 alignItems: "flex-start",
  //                 justifyContent: "center",
  //                 shadowColor: "#000",
  //                 shadowOffset: {
  //                   width: 0,
  //                   height: 2,
  //                 },
  //                 width: 320,
  //                 height: 200,

  //                 shadowRadius: 4,
  //               }}
  //             >
  //               <View style={{ flexDirection: "row", marginLeft: 20 }}>
  //                 <View style={{ width: 220, height: 50 }}>
  //                   <Text
  //                     style={{
  //                       fontFamily: "Poppins-Medium",
  //                       fontSize: Font.h6,
  //                       color: "#555555",
  //                     }}
  //                     numberOfLines={2}
  //                   >
  //                     Password must meet the following requirements:
  //                   </Text>
  //                 </View>
  //                 <WithLocalSvg
  //                   width={35}
  //                   height={35}
  //                   asset={require("../../assets/Close_icon.svg")}
  //                   onPress={() => setModalVisible(!modalVisible)}
  //                   style={{ marginLeft: 30 }}
  //                 />
  //               </View>
  //               <View style={{ marginTop: 20, marginLeft: 20 }}>
  //                 <Text
  //                   style={{
  //                     fontFamily: "Poppins-Regular",
  //                     fontSize: Font.p1,
  //                     color: "#838383",
  //                   }}
  //                 >
  //                   At least one letter
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     fontFamily: "Poppins-Regular",
  //                     fontSize: Font.p1,
  //                     color: "#838383",
  //                   }}
  //                 >
  //                   At least one capital letter
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     fontFamily: "Poppins-Regular",
  //                     fontSize: Font.p1,
  //                     color: "#838383",
  //                   }}
  //                 >
  //                   At least one number
  //                 </Text>
  //                 <Text
  //                   style={{
  //                     fontFamily: "Poppins-Regular",
  //                     fontSize: Font.p1,
  //                     color: "#838383",
  //                   }}
  //                 >
  //                   Be at least 8 characters
  //                 </Text>
  //               </View>
  //             </View>
  //           </View>
  //         </Modal>
  //         <View
  //           style={{
  //             height: hp("5.9%"),
  //             borderRadius: 15,
  //             borderWidth: 1,
  //             flexDirection: "row",
  //             borderColor: "#D1D1D1",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             paddingHorizontal: 10,
  //             overflow: "hidden",
  //           }}
  //         >
  //           <WithLocalSvg
  //             width={19}
  //             height={20}
  //             asset={require("../../assets/Iconawesome-user.svg")}
  //           />
  //           <TextInput
  //             value={username}
  //             onChangeText={(name) => setUserName(name)}
  //             keyboardType="email-address"
  //             placeholder="Full Name"
  //             style={{
  //               width: wp("60%"),
  //               backgroundColor: "transparent",
  //               fontFamily: "Poppins-Regular",
  //               color: "#B7B7B7",
  //               marginLeft: 2,
  //               fontSize: Font.p1,
  //             }}
  //             placeholderTextColor="#B7B7B7"
  //           />
  //         </View>
  //         <View
  //           style={{
  //             height: hp("5.9%"),
  //             borderRadius: 15,
  //             borderWidth: 1,
  //             flexDirection: "row",
  //             borderColor: "#D1D1D1",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             paddingHorizontal: 10,
  //             marginTop: 10,
  //             overflow: "hidden",
  //           }}
  //         >
  //           <WithLocalSvg
  //             width={21}
  //             height={14}
  //             asset={require("../../assets/Iconzocial-email.svg")}
  //           />
  //           <TextInput
  //             keyboardType="default"
  //             value={email}
  //             onChangeText={(name) => setEmail(name)}
  //             placeholder="Email Address"
  //             style={{
  //               width: wp("60%"),
  //               backgroundColor: "transparent",
  //               fontFamily: "Poppins-Regular",
  //               color: "black",
  //               marginLeft: 2,
  //               fontSize: Font.p1,
  //             }}
  //             placeholderTextColor="#B7B7B7"
  //           />
  //         </View>

  //         <View
  //           style={{
  //             height: hp("5.9%"),
  //             borderRadius: 15,
  //             borderWidth: 1,
  //             flexDirection: "row",
  //             borderColor: "#D1D1D1",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             paddingHorizontal: 20,
  //             marginTop: 10,
  //             marginBottom: 20,
  //             overflow: "hidden",
  //           }}
  //         >
  //           <WithLocalSvg
  //             width={16.2}
  //             height={19}
  //             asset={require("../../assets/Iconawesome-lock.svg")}
  //           />
  //           <TextInput
  //             keyboardType="email-address"
  //             value={password}
  //             secureTextEntry
  //             onChangeText={(name) => setPassword(name)}
  //             placeholder="Password"
  //             style={{
  //               width: wp("55%"),
  //               backgroundColor: "transparent",
  //               fontFamily: "Poppins-Regular",
  //               color: "#B7B7B7",
  //               marginLeft: 2,
  //               fontSize: Font.p1,
  //             }}
  //             placeholderTextColor="#B7B7B7"
  //           />
  //           <WithLocalSvg
  //             width={21}
  //             height={21}
  //             asset={require("../../assets/Iconionic-ios-information-circle.svg")}
  //             onPress={() => setModalVisible(true)}
  //           />
  //         </View>
  //       </View>
  //       <View style={{ alignItems: "center", justifyContent: "center" }}>
  //         <Text
  //           style={{
  //             color: "#838383",
  //             fontSize: Font.h6,
  //             alignContent: "center",
  //             fontFamily: "Poppins-Medium",
  //             lineHeight: 26,
  //           }}
  //         >
  //           By clicking ???sign up??? you agree to our
  //         </Text>
  //         <Text
  //           onPress={() => {
  //             props.navigation.navigate("TandCScreen");
  //           }}
  //           style={{
  //             color: "#00B5E0",
  //             fontSize: Font.h6,
  //             marginVertical: 10,
  //             alignContent: "center",
  //             textDecorationLine: "underline",
  //             fontFamily: "Poppins-Regular",
  //           }}
  //         >
  //           Terms & condition / Privacy Policy
  //         </Text>
  //       </View>
  //       <RoundedButton
  //         onPress={() => {
  //           props.navigation.navigate("Login");
  //         }}
  //         title="Sign Up"
  //         textVisible={true}
  //         visible={true}
  //       />

  //       {isDone ? <ActivityIndicator style={{ marginTop: 20 }} /> : null}
  //     </View>
  //   );
  // };

  /**
   * Main Screen Component Render.
   */
  return (
    // <ScrollView
    //   contentContainerStyle={{
    //     flexGrow: 1,
    //     justifyContent: "space-between",
    //     backgroundColor: "white",
    //   }}
    // >
    //   <View style={{ height: "80%" }}>
    //     <View
    //       style={{
    //         backgroundColor: Colors.primaryColor,
    //         marginBottom: 10,
    //       }}
    //     >
    //       <View
    //         style={{
    //           height: wp("100%"),
    //           width: hp("100%"),
    //           position: "absolute",
    //           top: 10,
    //           left: -50,
    //           right: 10,
    //         }}
    //       >
    //         <WithLocalSvg
    //           width={wp("126%")}
    //           height={hp("50%")}
    //           style={{ posision: "absolute", top: -wp("24%") }}
    //           preserveAspectRatio="xMinYMin slice"
    //           asset={require("../../assets/Texture(1).svg")}
    //         />
    //       </View>
    //       <View>
    //         {!isSignUpClicked ? (
    //           <Text
    //             style={{
    //               fontSize: Font.h2,
    //               marginTop: hp("5%"),
    //               color: "#FFFFFF",
    //               marginHorizontal: 20,
    //               fontFamily: "Poppins-Bold",
    //             }}
    //           >
    //             Welcome!
    //           </Text>
    //         ) : (
    //           <Text
    //             style={{
    //               fontSize: Font.h2,
    //               marginTop: hp("5%"),
    //               color: "#FFFFFF",
    //               marginHorizontal: 20,
    //               fontFamily: "Poppins-Bold",
    //             }}
    //           >
    //             Hello!
    //           </Text>
    //         )}
    //         {!isSignUpClicked ? (
    //           <Text
    //             style={{
    //               marginHorizontal: 20,
    //               color: "#FFFFFF",
    //               fontSize: Font.h5,
    //               marginVertical: 10,
    //               marginBottom: 70,
    //               fontFamily: "Poppins-Regular",
    //             }}
    //           >
    //             Please log in to access the key to nutrition and fitness
    //             education
    //           </Text>
    //         ) : (
    //           <Text
    //             style={{
    //               marginHorizontal: 20,
    //               color: "#FFFFFF",
    //               fontSize: Font.h5,
    //               marginVertical: 10,
    //               marginBottom: 70,
    //               fontFamily: "Poppins-Regular",
    //             }}
    //           >
    //             You are a few steps away from a treasure of knowledge on fitness
    //             and nutrition
    //           </Text>
    //         )}
    //       </View>
    //     </View>

    //     <View>
    //       <Card style={styles.card}>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             marginHorizontal: 20,
    //             marginVertical: 20,
    //           }}
    //         >
    //           <View>
    //             <Text
    //               style={{
    //                 fontSize: Font.h4,
    //                 color: Colors.textColor,
    //                 fontFamily: "Poppins-Regular",
    //               }}
    //               onPress={() => {
    //                 setIsLoginlicked(true);
    //                 setIsSignUpClicked(false);
    //               }}
    //             >
    //               Login
    //             </Text>
    //             {isLoginClicked ? (
    //               <View
    //                 style={{
    //                   width: wp("13%"),
    //                   height: 3,
    //                   marginTop: 5,
    //                   backgroundColor: Colors.textColor,
    //                 }}
    //               ></View>
    //             ) : null}
    //           </View>

    //           <View style={{ marginHorizontal: 20 }}>
    //             <Text
    //               style={{
    //                 fontSize: Font.h4,
    //                 color: Colors.textColor,
    //                 fontFamily: "Poppins-Regular",
    //               }}
    //               onPress={() => {
    //                 setIsLoginlicked(false);
    //                 setIsSignUpClicked(true);
    //               }}
    //             >
    //               SignUp
    //             </Text>
    //             {isSignUpClicked ? (
    //               <View
    //                 style={{
    //                   width: wp("18%"),
    //                   height: 3,
    //                   marginTop: 5,
    //                   backgroundColor: Colors.textColor,
    //                 }}
    //               ></View>
    //             ) : null}
    //           </View>
    //         </View>
    //         <View style={{ alignSelf: "baseline", width: "100%" }}>
    //           {isLoginClicked ? <Login /> : <SignUp />}
    //         </View>
    //       </Card>
    //     </View>
    //   </View>
    //   <View
    //     style={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //       marginTop: -wp("15%"),
    //     }}
    //   >
    //     <Text
    //       style={{
    //         fontFamily: "Poppins-Regular",
    //         color: "#838383",
    //         fontSize: Font.h4,
    //         marginBottom: 10,
    //         marginTop: 45,
    //       }}
    //     >
    //       Or
    //     </Text>
    //   </View>
    //   <View
    //     style={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //       flexDirection: "column",
    //     }}
    //   >
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         borderColor: "#e0e0e0",
    //         borderRadius: 25,
    //         borderWidth: 1,
    //         backgroundColor: "#3b5988",
    //         marginTop: 10,
    //         padding: 10,
    //         width: wp("64%"),
    //         height: hp("5%"),
    //       }}
    //     >
    //       <WithLocalSvg
    //         width={wp("70%")}
    //         height={hp("100%")}
    //         asset={require("../../assets/facebook.svg")}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         borderColor: "#e0e0e0",
    //         borderRadius: 25,
    //         marginTop: 20,
    //         marginBottom: 30,
    //         borderWidth: 1,
    //         backgroundColor: "#db4437",
    //         paddingRight: 20,
    //         paddingLeft: 20,
    //         paddingTop: 10,
    //         paddingBottom: 20,
    //         width: wp("64%"),
    //         height: hp("5%"),
    //       }}
    //     >
    //       <WithLocalSvg
    //         width={wp("70%")}
    //         height={hp("100%%")}
    //         asset={require("../../assets/Googleplus.svg")}
    //       />
    //     </View>
    //   </View>
    // </ScrollView>
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#FFFFFF" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
      enableOnAndroid={true}
    >
      <View style={{ backgroundColor: "#ffffff" }}>
        <View style={{ width: "100%", height: "47%" }}>
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
              style={{
                width: "50%",
                height: "50%",
                marginLeft: 40,
                marginTop: 40,
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
                width: "70%",
                height: 57,
                marginLeft: 35,
                alignContent: "center",
                alignItems: "center",
                marginVertical: 8,
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
                  marginLeft: 50,
                }}
              >
                Welcome to INFS
              </Text>
              <Text
                style={{
                  width: "45%",
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
        {data.isValidResponse ? null : (
          <Modal
            visible={modalVisible}
            transparent={true}
            style={{ width: width, height: "30%" }}
          >
            <View
              style={{
                backgroundColor: "#F2D4D8",
                marginLeft: 20,
                marginTop: "75%",
                marginRight: 20,
                width: "85%",
                alignItems: "flex-start",
                alignContent: "center",
                height: 30,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "#BB4552",
                  fontSize: 12,
                  fontFamily: "Roboto-Regular",

                  lineHeight: 17,
                  margin: 7,
                }}
              >
                Incorrect Username Password
              </Text>
              <Icon
                name="close"
                size={16}
                style={{
                  alignItems: "center",
                  marginLeft: "40%",
                  marginTop: 7,
                }}
                color="#e6faff"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </Modal>
        )}

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
              value={data.username}
              onChangeText={(val) => textInputChange(val)}
              placeholder="UserName / Email"
              style={{
                width: 327,
                height: 48,
                lineHeight: 22.4,
                borderWidth: 1,
                borderColor: "#E7EDEF",
                color: "#364F65",
                fontFamily: "Roboto-Regular",
                fontWeight: "400",
              }}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text
                style={{
                  color: "#BB4552",
                  fontSize: Font.p2,
                  fontFamily: "Roboto-Medium",
                  marginLeft: 25,
                }}
              >
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}
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
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 48,

                borderWidth: 1,
                borderColor: "#E7EDEF",
              }}
            >
              <TextInput
                value={data.password}
                onChangeText={(val) => handlePasswordChange(val)}
                style={{
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  lineHeight: 22.4,
                  color: "#364F65",
                  width: "90%",
                }}
                placeholder="******"
                secureTextEntry={passwordVisibility}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Icon
                  name={rightIcon}
                  size={16}
                  color="#A6B1BB"
                  style={{ marginTop: 15 }}
                />
              </Pressable>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{
                    color: "#BB4552",
                    fontSize: Font.p2,

                    fontFamily: "Roboto-Medium",
                  }}
                >
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={{ alignItems: "flex-start", marginLeft: 10 }}
              >
                <Text
                  onPress={() => {
                    props.navigation.navigate("SignUpScreen");
                  }}
                  style={{
                    width: 120,
                    height: 17,
                    fontSize: 12,
                    lineHeight: 16.8,
                    color: "#00B5E0",
                    fontFamily: "Roboto-Regular",
                    fontWeight: "400",
                  }}
                >
                  Create New Account?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 100 }}>
                <Text
                  onPress={() => {
                    props.navigation.navigate("ForgotPassword");
                  }}
                  style={{
                    width: 97,
                    height: 17,
                    fontSize: 12,
                    lineHeight: 16.8,
                    color: "#00B5E0",
                    fontFamily: "Roboto-Regular",
                    fontWeight: "400",
                  }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#00B5E0",
            height: 46,
            width: 327,
            borderRadius: 10,
            marginLeft: 30,
            marginTop: 50,
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
            loginHandle(data.username, data.password);
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
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "60%",
            height: 50,
            position: "absolute",
            left: "40%",
            right: 50,
            top: height - 90,
          }}
        >
          <Icon
            name="facebook"
            size={40}
            style={{ alignItems: "center" }}
            color="#00B5E0"
          />
          <Icon
            name="google"
            size={40}
            style={{ alignItems: "center", marginLeft: 20 }}
            color="#00B5E0"
          />
        </View> */}
      </View>
    </KeyboardAwareScrollView>
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
