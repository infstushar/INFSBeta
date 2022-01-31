import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  FlatList,
  PixelRatio,
} from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { WithLocalSvg } from "react-native-svg";
import RoundedButton from "../../components/RoundedButton";
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

const QuizThemeScreenForFour = (props) => {
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTextStyle} numberOfLines={3}>
            {props.data.question}
          </Text>
        </View>

        <FlatList
          data={props.data.answer}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.answerContainer}>
              <Text style={styles.answerTextStyle}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
  },
  questionContainer: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "space-around",
    margin: width * 0.07,
  },
  answerContainer: {
    width: width * 0.9,
    height: height * 0.09,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E6E7E9",
    marginLeft: 20,
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  answerTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: normalize(15.75),
    marginLeft: 15,
    color: "#555555",
  },
  questionTextStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: normalize(21),
    color: "#3E3E3E",
  },
});

export default QuizThemeScreenForFour;
