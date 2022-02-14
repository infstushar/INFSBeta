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
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import AxiosInstance from "../Auth/AxiosInstance";
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
  const [workbookcontent, setWorkbookContent] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);
  var bearer = "Bearer " + AsyncStorage.getItem("userToken");

  const getData = async () => {
    try {
      let response = await AxiosInstance.get(
        props?.route?.params?.id
          ? `units?module=${props?.route?.params?.id}`
          : `units?module=${props?.route?.params?.slug}`
      );
      // const response = await fetch(
      //   props?.route?.params?.id
      //     ? `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/units?module=` +
      //         props?.route?.params?.id
      //     : `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/units?module=` +
      //         props?.route?.params?.slug,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: bearer,
      //     },
      //   }
      // );
      // const json = await response.json();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getWorkbookData = async () => {
    try {
      let response = await AxiosInstance.get(
        props?.route?.params?.id
          ? `/workbook?module=${props?.route?.params?.id}`
          : `/workbook?module=${props?.route?.params?.slug}`
      );
      // const response = await fetch(
      //   props?.route?.params?.id
      //     ? `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/workbook?module=` +
      //         props?.route?.params?.id
      //     : `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/workbook?module=` +
      //         props?.route?.params?.slug,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: bearer,
      //     },
      //   }
      // );
      // const json = await response.json();
      setWorkbookContent(response.data.records);
    } catch (error) {
      console.error(error);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getWorkbookData();
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
          <Text style={styles.headerText}>{section.order} - </Text>
          <View style={{ marginLeft: 5, marginRight: 30 }}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: Font.h5,
                marginRight: 30,
                marginTop: 3,
              }}
              numberOfLines={2}
            >
              {section.title}
            </Text>
          </View>
          {isActive ? (
            <Icon
              name="angle-up"
              size={25}
              color="#555555"
              style={{
                position: "absolute",
                right: 5,
                top: 5,
                bottom: 5,
              }}
            />
          ) : (
            <Icon
              name="angle-down"
              size={25}
              color="#555555"
              style={{
                marginBottom: 3,
                position: "absolute",
                right: 5,
                top: 5,
                bottom: 5,
              }}
            />
          )}
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <RenderContent section={section} />
      </Animatable.View>
    );
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: height }}>
      <Header
        title={props?.route?.params?.module_code}
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />

      <Text
        style={{
          marginTop: 15,
          fontFamily: "Poppins-Bold",
          fontSize: Font.h4,
          color: "#00B5E0",
          marginLeft: 15,
        }}
        numberOfLines={2}
      >
        {props?.route?.params?.title}
      </Text>
      <ScrollView>
        {data && data.records ? (
          <Accordion
            activeSections={activeSections}
            // For any default active section
            sections={data.records}
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
        ) : null}

        {workbookcontent ? (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Workbook", workbookcontent[0]);
            }}
          >
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                height: 50,
              }}
            >
              <View style={styles.inactive}>
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
                  Workbook
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
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
    margin: 10,
    height: 50,
    width: width,
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: Font.h5,
    margin: 10,
    marginTop: 5,
  },
  header: {
    backgroundColor: "#F5FCFF",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  headerText: {
    fontFamily: "Poppins-Medium",
    fontSize: Font.h5,
    marginTop: 5,
    marginLeft: 5,
  },
  content: {
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  active: { backgroundColor: "#FFFFFF" },
  inactive: {
    backgroundColor: "#EDEDED",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
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
