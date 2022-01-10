import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

export const LessonContent = (props) => {
  const [content, setContent] = useState([]);
  const navigation = useNavigation();
  const getData = async (unit) => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons?unit=` +
          unit
      );
      const json = await response.json();
      setContent(json);
    } catch (error) {
      console.error(error);
    } finally {
      //   setLoading(false);
    }
  };
  useEffect(() => {
    // console.log(props.section);
    getData(props.slug);
  }, []);

  return <List.Item title="First item" />;

  // if (content) {
  //   return (
  //     <View>
  //       {content.map((value) => (
  //         <List.Item title="First item" />
  //       ))}
  //       {/* <Text> Loaded ...</Text> */}
  //     </View>
  //   );
  // } else return <Text> Loading ...</Text>;
};
