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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WithLocalSvg } from "react-native-svg";
import Header from "../../components/HeaderwithBack";

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
const countOfData = 0;

const UnitScreenForCourses = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/units?module=` +
          props?.route?.params?.slug
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
    console.warn(props?.route?.params?.slug);
    getData();
  }, []);

  const displayText = () => {
    return data.map((item, id) => {});
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <Header
        title={props?.route?.params?.title}
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
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "Poppins-Medium",
                fontSize: normalize(17.5),
                color: "#3E3E3E",
                marginTop: 20,
              }}
            >
              {item.order} :
            </Text>
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("UnitScreen", item);
              }}
              style={{ width: width - 40, height: 90 }}
            >
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: "Poppins-Medium",
                    fontSize: normalize(17.5),
                    color: "#3E3E3E",
                    marginTop: 5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontFamily: "Poppins-Medium",
                    fontSize: 15,
                    color: "#3E3E3E",
                    marginLeft: 20,
                  }}
                >
                  Unit {item.order}
                </Text>
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
});

export default UnitScreenForCourses;
