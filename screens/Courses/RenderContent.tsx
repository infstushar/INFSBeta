import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export const RenderContent = (props) => {
  const [content, setContent] = useState([]);
  const navigation = useNavigation();
  const getData = async (unit) => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons?unit=` +
          unit
      );
      const json = await response.json();
      setContent(json.records);
    } catch (error) {
      console.error(error);
    } finally {
      //   setLoading(false);
    }
  };
  useEffect(() => {
    if (props.section) getData(props.section.slug);
  }, []);

  if (content !== undefined && Object.keys(content).length !== 0) {
    console.log("data content  " + JSON.stringify(content));

    return (
      <View>
        {content.map((value, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LessonScreen", { value, content, index });
            }}
          >
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              {value.lesson_type === "video" ? (
                <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/Vector.svg")}
                  style={{ marginTop: 15 }}
                />
              ) : (
                <WithLocalSvg
                  width={16}
                  height={16}
                  asset={require("../../assets/fluent_document-20-filled.svg")}
                  style={{ marginTop: 15 }}
                />
              )}

              <View style={{ marginLeft: 5, marginRight: 10 }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: "Poppins-Medium",
                    fontSize: Font.h5,
                    color: "#3E3E3E",
                    marginTop: 9,
                    marginRight: 10,
                  }}
                  numberOfLines={3}
                >
                  {value.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  } else return <Text> Loading ...</Text>;
};
