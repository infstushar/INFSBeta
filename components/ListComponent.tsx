import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AdfTohtml from "../screens/Courses/AdfTohtml";
import Font from "../constants/Font";

const ListComponent = (props) => {
  if (props.sourceData === null || props.sourceData === undefined) return null;
  else
    return (
      <View
        style={{
          marginTop: 10,
          borderWidth: 1,
          borderColor: "#EAEAEA",
          margin: 15,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: "#3E3E3E",
            marginLeft: 15,
            fontSize: Font.h5,
            fontFamily: "Poppins-SemiBold",
            marginTop: 5,
          }}
        >
          {props.title} :
        </Text>

        <AdfTohtml
          source={props.sourceData}
          bgStyle={{
            marginTop: 20,
            paddingVertical: 15,
            backgroundColor: "#F8F8F8",
            marginLeft: 15,
          }}
        ></AdfTohtml>
      </View>
    );
};

const styles = StyleSheet.create({});

export default ListComponent;
