import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/HeaderwithBack";
import AdfTohtml from "../Courses/AdfTohtml";
import AxiosInstance from "../Auth/AxiosInstance";

const Workbook = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    try {
      let response = await AxiosInstance.get(
        `/workbook?module=${props?.route?.params?.module_id}`
      );
      // const response = await fetch(
      //   `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/workbook?module=` +
      //     props?.route?.params?.module_id
      // );
      // const json = await response.json();
      setData(response.data.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ backgroundColor: "#FAFAFA" }}>
      <Header
        title="Workbook"
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />
      {data[0] ? (
        <ScrollView
          style={{ marginLeft: 10, marginRight: 10, marginBottom: 50 }}
        >
          <AdfTohtml source={data[0].short_description}></AdfTohtml>
        </ScrollView>
      ) : null}
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

export default Workbook;
