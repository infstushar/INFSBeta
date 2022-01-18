import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
  TouchableHighlight,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CollapseView from "../../components/CollapseView";
import { ScrollView } from "react-native-gesture-handler";
import { WithLocalSvg } from "react-native-svg";
import Header from "../../components/HeaderwithBack";
import { Checkbox } from "react-native-paper";
import Font from "../../constants/Font";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = width / 415;
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS == "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const UnitScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/lessons?unit=` +
          props?.route?.params?.slug
      );
      const json = await response.json();
      setData(json);
      setContent(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const displayText = () => {
    return data.map((item, id) => {});
  };
  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <Header
        title={props.route.params.title}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />
      {/* <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 20 }}>
        <WithLocalSvg
          width={21}
          height={21}
          asset={require("../../assets/Chatbox.svg")}
        />
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: normalize(14),
            color: "#00B5E0",
            paddingBottom: 10,
            marginLeft: 10,
            textDecorationLine: "underline",
          }}
        >
          Discussion Forum
        </Text>
      </View> */}

      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", marginLeft: 20 }}>
            <TouchableHighlight
              onPress={() => {
                console.warn(item.lesson_type);
                props.navigation.navigate("LessonScreen", {
                  item,
                  content,
                  index,
                });
              }}
            >
              <View
                style={{ flexDirection: "row", marginRight: 10, marginTop: 10 }}
              >
                {item.lesson_type === "video" ? (
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
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roundButton: {
    height: 10,
    width: 10,
    borderRadius: 1000,
  },
});

export default UnitScreen;
