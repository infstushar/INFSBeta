import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AdfTohtml from "../screens/Courses/AdfTohtml";
import Font from "../constants/Font";
import CollapseView from "../components/CollapseView";

const ListComponent = (props) => {
  if (props.sourceData === null || props.sourceData === undefined) return null;
  else
    return (
      <View style={props.setViewStyle}>
        <Text
          style={{
            color: "#3E3E3E",
            marginLeft: 15,
            fontSize: Font.h5,
            fontFamily: "Poppins-SemiBold",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          {props.title}
        </Text>

        <AdfTohtml source={props.sourceData}></AdfTohtml>
      </View>
    );
};

const styles = StyleSheet.create({});

export default ListComponent;
