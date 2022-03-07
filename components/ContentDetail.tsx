import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ListComponent from "../components/ListComponent";
import { View, Text, ImageBackground, StatusBar, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
const ContentDetail = (props) => {
  return (
    <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View>
          <Text
            style={{
              color: "#364F65",
              marginLeft: 15,
              fontSize: 21,
              fontFamily: "Roboto-Medium",
              marginTop: 10,
              fontWeight: "800",
            }}
          >
            {props?.route?.params?.title}
          </Text>
        </View>
        <Icon
          name="close"
          size={25}
          style={{ position: "absolute", right: 10, top: 10 }}
          color="#364F65"
          onPress={() => {
            props.navigation.goBack(null);
          }}
        />
      </View>
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <ListComponent
            //title={props?.route?.params?.title}
            sourceData={props?.route?.params?.content}
            setViewStyle={{
              marginLeft: 10,
              backgroundColor: "#FFFFFF",
            }}
          />
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ContentDetail;
