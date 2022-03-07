import { HeaderTitle } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ProgressViewIOSComponent, ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import RoundedButton from "../../components/RoundedButton";
import Header from "../../components/HeaderwithBack";

const StartingQuizScreen = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        `http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000/quiz?unit=` +
          props?.route?.params?.parent_entity_id
      );
      const json = await response.json();

      setData(json.records);
      console.log("Json :" + JSON.stringify(json.records));
    } catch (error) {
      console.error(error);
    } finally {
      //   setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header
        title="Quiz"
        onPress={() => {
          props.navigation.goBack(null);
        }}
      />
      {data[0] ? (
        <View>
          <View style={{ alignItems: "flex-start", marginTop: "30%" }}>
            <WithLocalSvg
              width={"100%"}
              height={"50%"}
              asset={require("../../assets/quiz.svg")}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                alignContent: "center",
                color: "#21BDC8",
                fontFamily: "Poppins-Bold",
              }}
            >
              {data[0].title}
            </Text>

            <View>
              <Text
                style={{
                  color: "#838383",
                  fontSize: 18,
                  textAlign: "center",
                  marginHorizontal: 10,
                  marginVertical: 30,
                  fontFamily: "Poppins-Regular",
                }}
              >
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book.
              </Text>
            </View>
          </View>
          <RoundedButton
            onPress={() => {
              props.navigation.navigate("QuizForStartUpScreen", data[0]);
            }}
            title="Start"
            textVisible={true}
            visible={true}
            name="md-arrow-forward-circle"
          />
        </View>
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

export default StartingQuizScreen;
