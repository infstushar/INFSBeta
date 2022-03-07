import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ListComponent from "../components/ListComponent";
import AdfTohtml from "../screens/Courses/AdfTohtml";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Modal,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
const ModuleListComponent = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
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
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={
            props?.route?.params?.data.course_type === "workshop"
              ? props?.route?.params?.data.units
              : props?.route?.params?.data.modules
          }
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 15 }}>
              {/* <CourseContentScreen
                  title={item.title}
                  onPress={() => {
                    if (checkData(data.course_type) === 1)
                      return props.navigation.navigate("UnitScreen", data);
                    else
                      return props.navigation.navigate("ModuleDetails", item);
                  }}
                  bgColor="#F8F8F8"
                /> */}
              <View
                style={{
                  borderWidth: 0.2,
                  borderColor: "#364F65",
                  marginRight: 15,
                  marginTop: 15,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {item.module_code ? (
                    <Text
                      style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 15,
                        color: "#364F65",
                        marginTop: 5,
                        marginLeft: 5,
                      }}
                    >
                      {item.module_code} -
                    </Text>
                  ) : null}
                  <View
                    style={{
                      height: 45,
                      marginRight: 30,
                      marginTop: 5,
                      marginLeft: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 15,
                        color: "#364F65",
                      }}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View style={{ height: 64 }}>
                  <AdfTohtml source={item.short_description}></AdfTohtml>
                </View>
                <Text
                  style={{
                    color: "#00B5E0",
                    fontFamily: "Roboto-Regular",
                    fontSize: 14,
                    marginLeft: "70%",
                  }}
                  onPress={() => {
                    if (props?.route?.params?.data.course_type === "workshop")
                      return props.navigation.navigate(
                        "UnitScreen",
                        props?.route?.params?.data
                      );
                    else {
                      item["course"] = props?.route?.params?.data.slug;
                      return props.navigation.navigate("ModuleDetails", item);
                    }
                  }}
                >
                  Learn more.....
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ModuleListComponent;
