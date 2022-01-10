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

import * as Animatable from "react-native-animatable";

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

const AccordionForModule = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/units?module=` +
          props?.source.slug
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
    let isActive = true;
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
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <Text style={styles.headerText}>{section.order} : </Text>
          <Text style={styles.headerText} numberOfLines={2}>
            {section.title}
          </Text>
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
        {/* <RenderContent section={section} /> */}
      </Animatable.View>
    );
  };
  console.log("accordion data" + JSON.stringify(data));
  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
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
    margin: 10,
    height: 50,
    width: width,
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: Font.h5,
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#F5FCFF",
    paddingLeft: 10,
    marginRight: 30,
  },
  headerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Font.h5,
  },
  content: {
    paddingLeft: 20,
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

export default AccordionForModule;
