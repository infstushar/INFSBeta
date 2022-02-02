import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  PixelRatio,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  SafeAreaView,
  Alert,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { WithLocalSvg } from "react-native-svg";
import Font from "../../constants/Font";
import { Element } from "domhandler";
import { indexOf } from "lodash";

const { width, height } = Dimensions.get("window");
const scale = width / 415;

const DATA = [
  {
    id: "1",
    questionType: "singlechoice",
    question:
      "What are some of the things you can do to help support your health?",
    answer1: "Regular physical activity",
    answer2: "Eating nutritious food",
    answer3: "Talking to a friend",
    answer4: "All of these",
    correctAnswer: ["answer1"],
  },
  {
    id: "2",
    questionType: "boolean",
    question: "2",
    answer1: "Yes",
    answer2: "No",

    correctAnswer: ["answer1"],
  },
  {
    id: "3",
    questionType: "singlechoice",
    question: "3",
    answer1: "Regular physical activity",
    answer2: "Eating nutritious food",
    answer3: "Talking to a friend",
    answer4: "All of these",
    correctAnswer: ["answer3"],
  },
  {
    id: "4",
    questionType: "multichoice",
    question: "what?",
    answer1: "Regular physical activity",
    answer2: "Eating nutritious food",
    answer3: "Talking to a friend",
    answer4: "All of these",
    correctAnswer: ["answer2"],
  },
  {
    id: "5",
    questionType: "singlechoice",
    question: "5",
    answer1: "Regular physical activity",
    answer2: "Eating nutritious food",
    answer3: "Talking to a friend",
    answer4: "All of these",
    correctAnswer: ["answer1"],
  },
];

const QuizForStartUpScreen = (props) => {
  const allQuestions = DATA;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [optionSelected, setOptionSelected] = useState([null]);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option =
      allQuestions[currentQuestionIndex]["correctAnswer"][0] === "answer1"
        ? allQuestions[currentQuestionIndex]["answer1"]
        : allQuestions[currentQuestionIndex]["correctAnswer"][0] === "answer2"
        ? allQuestions[currentQuestionIndex]["answer2"]
        : allQuestions[currentQuestionIndex]["correctAnswer"][0] === "answer3"
        ? allQuestions[currentQuestionIndex]["answer3"]
        : allQuestions[currentQuestionIndex]["answer4"];

    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);

    if (selectedOption == correct_option) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const validateMultiChoiceAnswer = (selectedOption) => {
    requiredMediaByName(selectedOption)
      ? removeElment(selectedOption)
      : optionSelected.push(selectedOption);
    console.log("optionSelected" + optionSelected);
    setShowNextButton(true);
  };
  const requiredMediaByName = (name) => {
    return optionSelected.find((item) => item === name);
  };
  const removeElment = (element) => {
    const index = optionSelected.indexOf(element);
    console.log("index + " + index);
    optionSelected.splice(index, element);
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleQuit = () => {
    props.navigation.navigate("Login");
  };

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: "#3E3E3E",
              fontFamily: "Poppins-Medium",
              fontSize: Font.h4,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text
            style={{
              color: "#3E3E3E",
              fontFamily: "Poppins-Medium",
              fontSize: Font.h4,
              opacity: 0.6,
            }}
          >
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: "#3E3E3E",
            fontFamily: "Poppins-Medium",
            fontSize: Font.h5,
          }}
        >
          {allQuestions[currentQuestionIndex].question}
          {console.log(currentQuestionIndex)}
        </Text>
      </View>
    );
  };

  const renderOptions = (optionArray) => {
    return (
      <View>
        {optionArray.map((option) =>
          option ? (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionsDisabled}
              key={option}
              style={{
                borderWidth: 1,
                borderColor:
                  option == correctOption
                    ? "#34B94C"
                    : option == currentOptionSelected
                    ? "#ED2020"
                    : "#E6E7E9",
                backgroundColor: "#FFFFFF",
                //   option == correctOption
                //     ? "#00B5E0" + "20"
                //     : option == currentOptionSelected
                //     ? "red" + "20"
                //     : "yellow" + "20",
                height: 50,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
                shadowColor: "#00000029",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: Font.h6,
                  color: "#555555",
                }}
              >
                {option}
              </Text>

              {/* Show Check Or Cross Icon based on correct answer*/}
              {option == correctOption ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#34B94C",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : option == currentOptionSelected ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#ED2020",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          ) : null
        )}
      </View>
    );
  };

  const renderMultipleOptions = (optionArray) => {
    return (
      <View>
        {optionArray.map((option) =>
          option ? (
            <TouchableOpacity
              onPress={() => validateMultiChoiceAnswer(option)}
              // disabled={isOptionsDisabled}
              key={option}
              style={{
                borderWidth: 1,
                borderColor: option == optionSelected ? "#00B5E0" : "#E6E7E9",
                backgroundColor: "#FFFFFF",
                height: 50,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
                shadowColor: "#00000029",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: Font.h6,
                  color: "#555555",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ) : null
        )}
      </View>
    );
  };

  const renderNextButton = () => {
    // if (showNextButton) {
    return (
      <View>
        <TouchableOpacity
          onPress={handleNext}
          disabled={showNextButton ? false : true}
          style={{
            marginTop: 20,
            width: "80%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 35,
            borderRadius: 29,
            backgroundColor: showNextButton ? "#3498db" : "#EDEDED",
            shadowColor: "#00000029",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 3,
          }}
        >
          {allQuestions[currentQuestionIndex].questionType === "multichoice" ? (
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.h4,
                color: showNextButton ? "#FFFFFF" : "#838383",
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.h4,
                color: showNextButton ? "#FFFFFF" : "#838383",
                textAlign: "center",
              }}
            >
              Continue
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleQuit}
          style={{
            marginTop: 20,
            width: "80%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 35,
            borderRadius: 29,
            backgroundColor: "#EDEDED",
            shadowColor: "#00000029",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: Font.h4,
              color: "#838383",
              textAlign: "center",
            }}
          >
            Quit
          </Text>
        </TouchableOpacity>
      </View>
    );
    // } else {
    //   return null;
    // }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "80%",
          height: 10,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 10,
              borderRadius: 20,
              backgroundColor: "#34B94C",
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };
  const optionArray = [
    allQuestions[currentQuestionIndex]?.answer1,
    allQuestions[currentQuestionIndex]?.answer2,
    allQuestions[currentQuestionIndex]?.answer3,
    allQuestions[currentQuestionIndex]?.answer4,
  ];
  return (
    //
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* ProgressBar */}
        <View style={{ flexDirection: "row" }}>
          {/* <MaterialCommunityIcons
            name="arrow-left"
            style={{
              color: "#3E3E3E",
              fontSize: 25,
              marginRight: 20,
              marginTop: -10,
            }}
            onPress={() => {
              props.navigation.goBack(null);
            }}
          /> */}
          <WithLocalSvg
            width={20}
            height={20}
            asset={require("../../assets/Icon-ionic-ios-arrow-round-back.svg")}
            style={{ marginTop: -4, marginRight: 15 }}
            onPress={() => {
              props.navigation.goBack(null);
            }}
          />
          {renderProgressBar()}
          <WithLocalSvg
            width={50}
            height={50}
            asset={require("../../assets/Hint.svg")}
            style={{ marginTop: -15 }}
          />
        </View>

        {/* Question */}
        {renderQuestion()}

        {/* Options */}

        {allQuestions[currentQuestionIndex]?.questionType === "multichoice"
          ? renderMultipleOptions(optionArray)
          : renderOptions(optionArray)}

        {/* Next Button */}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: height - 200,
            width: width,
          }}
        >
          {renderNextButton()}
        </View>
        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#252c4a",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#252c4a",
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > allQuestions.length / 2 ? "Congratulations!" : "Oops!"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: score > allQuestions.length / 2 ? "green" : "red",
                  }}
                >
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  / {allQuestions.length}
                </Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: "#3498db",
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Quit Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});

export default QuizForStartUpScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Platform,
//   PixelRatio,
//   StatusBar,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Animated,
//   SafeAreaView,
//   Alert,
// } from "react-native";

// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { WithLocalSvg } from "react-native-svg";
// import Font from "../../constants/Font";

// const { width, height } = Dimensions.get("window");
// const scale = width / 415;

// const DATA = [
//   {
//     id: "1",
//     question:
//       "What are some of the things you can do to help support your health?",
//     answer: [
//       "Regular physical activity",
//       "Eating nutritious food",
//       "Talking to a friend",
//       "All of these",
//     ],
//     correctAnswer: "All of these",
//   },
//   {
//     id: "2",
//     question: "2",
//     answer: ["Yes", "No"],
//     correctAnswer: "No",
//   },
//   {
//     id: "3",
//     question: "3",
//     answer: ["1", "2", "3", "All of these"],
//     correctAnswer: "2",
//   },
//   {
//     id: "4",
//     question: "what?",
//     answer: [
//       "Regular physical activity",
//       "Eating nutritious food",
//       "Talking to a friend",
//       "All of these",
//     ],
//     correctAnswer: "All of these",
//   },
//   {
//     id: "4",
//     question: "5",
//     answer: [
//       "Regular physical activity",
//       "Eating nutritious food",
//       "Talking to a friend",
//       "All of these",
//     ],
//     correctAnswer: "All of these",
//   },
// ];

// const QuizForStartUpScreen = (props) => {
//   const allQuestions = DATA;
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
//   const [correctOption, setCorrectOption] = useState(null);
//   const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showNextButton, setShowNextButton] = useState(false);
//   const [showScoreModal, setShowScoreModal] = useState(false);

//   const validateAnswer = (selectedOption) => {
//     let correct_option = allQuestions[currentQuestionIndex]["correctAnswer"];
//     setCurrentOptionSelected(selectedOption);
//     setCorrectOption(correct_option);
//     setIsOptionsDisabled(true);

//     if (selectedOption == correct_option) {
//       setScore(score + 1);
//     }
//     setShowNextButton(true);
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex == allQuestions.length - 1) {
//       setShowScoreModal(true);
//     } else {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setCurrentOptionSelected(null);
//       setCorrectOption(null);
//       setIsOptionsDisabled(false);
//       setShowNextButton(false);
//     }
//     Animated.timing(progress, {
//       toValue: currentQuestionIndex + 1,
//       duration: 1000,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleQuit = () => {
//     props.navigation.navigate("Login");
//   };

//   const restartQuiz = () => {
//     setShowScoreModal(false);
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setCurrentOptionSelected(null);
//     setCorrectOption(null);
//     setIsOptionsDisabled(false);
//     setShowNextButton(false);
//     Animated.timing(progress, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: false,
//     }).start();
//   };

//   const renderQuestion = () => {
//     return (
//       <View
//         style={{
//           marginVertical: 40,
//         }}
//       >
//         {/* Question Counter */}
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "flex-end",
//           }}
//         >
//           <Text
//             style={{
//               color: "#3E3E3E",
//               fontFamily: "Poppins-Medium",
//               fontSize: Font.h4,
//               opacity: 0.6,
//               marginRight: 2,
//             }}
//           >
//             {currentQuestionIndex + 1}
//           </Text>
//           <Text
//             style={{
//               color: "#3E3E3E",
//               fontFamily: "Poppins-Medium",
//               fontSize: Font.h4,
//               opacity: 0.6,
//             }}
//           >
//             / {allQuestions.length}
//           </Text>
//         </View>

//         {/* Question */}
//         <Text
//           style={{
//             color: "#3E3E3E",
//             fontFamily: "Poppins-Medium",
//             fontSize: Font.h5,
//           }}
//         >
//           {allQuestions[currentQuestionIndex].question}
//           {console.log(currentQuestionIndex)}
//         </Text>
//       </View>
//     );
//   };

//   const renderOptions = () => {
//     return (
//       <View>
//         {allQuestions[currentQuestionIndex]?.answer.map((option) => (
//           <TouchableOpacity
//             onPress={() => validateAnswer(option)}
//             disabled={isOptionsDisabled}
//             key={option}
//             style={{
//               borderWidth: 1,
//               borderColor:
//                 option == correctOption
//                   ? "#34B94C"
//                   : option == currentOptionSelected
//                   ? "#ED2020"
//                   : "#E6E7E9",
//               backgroundColor: "#FFFFFF",
//               //   option == correctOption
//               //     ? "#00B5E0" + "20"
//               //     : option == currentOptionSelected
//               //     ? "red" + "20"
//               //     : "yellow" + "20",
//               height: 50,
//               borderRadius: 15,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//               paddingHorizontal: 20,
//               marginVertical: 10,
//               shadowColor: "#00000029",
//               shadowOffset: { width: -2, height: 4 },
//               shadowOpacity: 0.2,
//               shadowRadius: 4,
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: "Poppins-Medium",
//                 fontSize: Font.h6,
//                 color: "#555555",
//               }}
//             >
//               {option}
//             </Text>

//             {/* Show Check Or Cross Icon based on correct answer*/}
//             {option == correctOption ? (
//               <View
//                 style={{
//                   width: 30,
//                   height: 30,
//                   borderRadius: 30 / 2,
//                   backgroundColor: "#34B94C",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="check"
//                   style={{
//                     color: "white",
//                     fontSize: 20,
//                   }}
//                 />
//               </View>
//             ) : option == currentOptionSelected ? (
//               <View
//                 style={{
//                   width: 30,
//                   height: 30,
//                   borderRadius: 30 / 2,
//                   backgroundColor: "#ED2020",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="close"
//                   style={{
//                     color: "white",
//                     fontSize: 20,
//                   }}
//                 />
//               </View>
//             ) : null}
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   const renderNextButton = () => {
//     // if (showNextButton) {
//     return (
//       <View>
//         <TouchableOpacity
//           onPress={handleNext}
//           disabled={showNextButton ? false : true}
//           style={{
//             marginTop: 20,
//             width: "80%",
//             height: 50,
//             justifyContent: "center",
//             alignItems: "center",
//             marginLeft: 35,
//             borderRadius: 29,
//             backgroundColor: showNextButton ? "#3498db" : "#EDEDED",
//             shadowColor: "#00000029",
//             shadowOffset: { width: -2, height: 4 },
//             shadowOpacity: 1,
//             shadowRadius: 3,
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: "Poppins-Medium",
//               fontSize: Font.h4,
//               color: showNextButton ? "#FFFFFF" : "#838383",
//               textAlign: "center",
//             }}
//           >
//             Continue
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleQuit}
//           style={{
//             marginTop: 20,
//             width: "80%",
//             height: 50,
//             justifyContent: "center",
//             alignItems: "center",
//             marginLeft: 35,
//             borderRadius: 29,
//             backgroundColor: "#EDEDED",
//             shadowColor: "#00000029",
//             shadowOffset: { width: -2, height: 4 },
//             shadowOpacity: 1,
//             shadowRadius: 3,
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: "Poppins-Medium",
//               fontSize: Font.h4,
//               color: "#838383",
//               textAlign: "center",
//             }}
//           >
//             Quit
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//     // } else {
//     //   return null;
//     // }
//   };

//   const [progress, setProgress] = useState(new Animated.Value(0));
//   const progressAnim = progress.interpolate({
//     inputRange: [0, allQuestions.length],
//     outputRange: ["0%", "100%"],
//   });

//   const renderProgressBar = () => {
//     return (
//       <View
//         style={{
//           width: "80%",
//           height: 10,
//           borderRadius: 20,
//           backgroundColor: "#00000020",
//         }}
//       >
//         <Animated.View
//           style={[
//             {
//               height: 10,
//               borderRadius: 20,
//               backgroundColor: "#34B94C",
//             },
//             {
//               width: progressAnim,
//             },
//           ]}
//         ></Animated.View>
//       </View>
//     );
//   };

//   return (
//     //
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}
//     >
//       <StatusBar hidden />
//       <View
//         style={{
//           flex: 1,
//           paddingVertical: 40,
//           paddingHorizontal: 16,
//           backgroundColor: "#FAFAFA",
//           position: "relative",
//         }}
//       >
//         {/* ProgressBar */}
//         <View style={{ flexDirection: "row" }}>
//           {/* <MaterialCommunityIcons
//             name="arrow-left"
//             style={{
//               color: "#3E3E3E",
//               fontSize: 25,
//               marginRight: 20,
//               marginTop: -10,
//             }}
//             onPress={() => {
//               props.navigation.goBack(null);
//             }}
//           /> */}
//           <WithLocalSvg
//             width={20}
//             height={20}
//             asset={require("../../assets/Icon-ionic-ios-arrow-round-back.svg")}
//             style={{ marginTop: -4, marginRight: 15 }}
//             onPress={() => {
//               props.navigation.goBack(null);
//             }}
//           />
//           {renderProgressBar()}
//           <WithLocalSvg
//             width={50}
//             height={50}
//             asset={require("../../assets/Hint.svg")}
//             style={{ marginTop: -15 }}
//           />
//         </View>

//         {/* Question */}
//         {renderQuestion()}

//         {/* Options */}
//         {renderOptions()}

//         {/* Next Button */}
//         <View
//           style={{
//             position: "absolute",
//             height: 40,
//             left: 0,
//             top: height - 230,
//             width: width,
//           }}
//         >
//           {renderNextButton()}
//         </View>
//         {/* Score Modal */}
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={showScoreModal}
//         >
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: "#252c4a",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: "#252c4a",
//                 width: "90%",
//                 borderRadius: 20,
//                 padding: 20,
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontSize: 30, fontWeight: "bold" }}>
//                 {score > allQuestions.length / 2 ? "Congratulations!" : "Oops!"}
//               </Text>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                   marginVertical: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     color: score > allQuestions.length / 2 ? "green" : "red",
//                   }}
//                 >
//                   {score}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     color: "black",
//                   }}
//                 >
//                   / {allQuestions.length}
//                 </Text>
//               </View>
//               {/* Retry Quiz button */}
//               <TouchableOpacity
//                 onPress={restartQuiz}
//                 style={{
//                   backgroundColor: "#3498db",
//                   padding: 20,
//                   width: "100%",
//                   borderRadius: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     color: "white",
//                     fontSize: 20,
//                   }}
//                 >
//                   Quit Quiz
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//   },
// });

// export default QuizForStartUpScreen;
