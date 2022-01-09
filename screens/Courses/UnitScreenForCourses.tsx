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
  Switch,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WithLocalSvg } from "react-native-svg";
import Collapsible from "react-native-collapsible";
import * as Animatable from "react-native-animatable";
import { Thumbnail, List, ListItem, Separator } from "native-base";
import Header from "../../components/HeaderwithBack";
import Accordion from "react-native-collapsible/Accordion";
import Font from "../../constants/Font";

import { RenderContent } from "./RenderContent";

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

  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

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

  const toggleExpanded = () => {
    // Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    // Accordion header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>{section.order} : </Text>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    // Accordion Content view
    // console.log("rendercontent : " + section.slug);
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "left" }}
        >
          <RenderContent section={section} />
        </Animatable.Text>
      </Animatable.View>
    );
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

      {/* <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            {/* <Text
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
            </TouchableHighlight> */}
      {/* <TouchableOpacity onPress={toggleExpanded}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{item.title}</Text>
              </View>
            </TouchableOpacity>

            <Collapsible collapsed={collapsed} align="center">
              <View style={styles.content}>
                <Text style={{ textAlign: "center" }}>
                  This is a dummy text of Single Collapsible View
                </Text>
              </View>
            </Collapsible> */}

      {/*//}</View>
        )}
      /> */}
      <Accordion
        activeSections={activeSections}
        // For any default active section
        sections={data}
        // Title and content of accordion
        touchableComponent={TouchableOpacity}
        // Which type of touchable component you want
        // It can be the following Touchables
        // TouchableHighlight, TouchableNativeFeedback
        // TouchableOpacity , TouchableWithoutFeedback
        expandMultiple={multipleSelect}
        // If you want to expand multiple at a time
        renderHeader={renderHeader}
        // Header Component(View) to render
        renderContent={renderContent}
        // Content Component(View) to render
        duration={400}
        // Duration for Collapse and expand
        onChange={setSections}
        // Setting the state of active sections
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
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: Font.h5,
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#F5FCFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: Font.h5,
    paddingLeft: 10,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: Font.h5,
  },
  content: {
    paddingLeft: 30,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default UnitScreenForCourses;
