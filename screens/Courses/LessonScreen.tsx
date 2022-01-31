import { HeaderTitle } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import UnitTextScreen from "./UnitTextScreen";
import UnitVideoTextScreen from "./UnitVideoTextScreen";
import Header from "../../components/HeaderwithBack";
import Font from "../../constants/Font";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import NextPrevComponent from "../../components/NextPrevComponent";

const { width, height } = Dimensions.get("window");

const LessonSreen = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [index, setIndex] = useState(props?.route?.params?.index);
  const navigation = useNavigation();
  const contentLength = props?.route?.params?.content.length;

  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons/` +
          props?.route?.params?.content[index].slug
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [index]);

  const modifyIndex = (action) => {
    if (action === "next") {
      let newIndex = index + 1;
      if (newIndex < contentLength) setIndex(newIndex);
    } else {
      let newIndex = index - 1;
      if (newIndex >= 0) setIndex(newIndex);
    }
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <Header
        title={`Lesson ${data.order}`}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />

      {data.lesson_type === "video" ? (
        <UnitVideoTextScreen source={data} />
      ) : (
        <UnitTextScreen source={data} />
      )}
      <NextPrevComponent
        modifyIndex={modifyIndex}
        length={contentLength}
        currentIndex={index}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LessonSreen;
