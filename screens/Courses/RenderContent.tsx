import React, { useEffect, useState } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import Font from "../../constants/Font";
import { WithLocalSvg } from "react-native-svg";

export const RenderContent = (props) => {
  const [content, setContent] = useState([]);
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
    if (props.section) getData(props.section.slug);
  }, []);

  if (content) {
    return (
      <View>
        {content.map((value) => (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: Font.h6,
              }}
            >
              {value.order} :
            </Text>

            <TouchableHighlight
              onPress={() => {
                //navigation.navigate("UnitTextScreen", value);
                if (value.lesson_type === "video")
                  props.navigation.navigate("UnitVideoTextScreen", value);
              }}
            >
              <View style={{ marginLeft: 15, marginTop: 15 }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: "Poppins-Medium",
                    fontSize: Font.h5,
                    color: "#3E3E3E",
                    marginTop: 5,
                  }}
                  numberOfLines={2}
                >
                  {value.title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <WithLocalSvg
                    width={12}
                    height={14}
                    asset={require("../../assets/Iconopen-document.svg")}
                    style={{ marginLeft: 20 }}
                  />
                  <Text style={{ marginLeft: 5, textTransform: "capitalize" }}>
                    {value.lesson_type}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        ))}
        {/* <Text> Loaded ...</Text> */}
      </View>
    );
  } else return <Text> Loading ...</Text>;
};
