import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AdfTohtml from "../screens/Courses/AdfTohtml";
import Font from "../constants/Font";

const ListComponent = (props) => {
  if (props.sourceData === null || props.sourceData === undefined) return null;
  else
    return (
      <View>
        <Text
          style={{
            color: "#364F65",
            fontSize: Font.h5,
            fontFamily: "Poppins-Medium",
            marginBottom: 10,
          }}
        >
          {props.title}
        </Text>
        <View style={props.setViewStyle}>
          <AdfTohtml source={props.sourceData}></AdfTohtml>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({});

export default ListComponent;
