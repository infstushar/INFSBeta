/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import "react-native-gesture-handler";
import * as React from "react";
import INFSAPPNavigator from "./navigation/INFSAPPNavigator";
import { NavigationContainer } from "@react-navigation/native";
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFirst, setIsFirst] = React.useState(true);
  React.useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      const value = await AsyncStorage.getItem("@isNavigatedFirstTime");
      setIsFirst(value === null ? true : false);
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);

      //console.log("setting value for intro : " + value);
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });
  }, []);
  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <INFSAPPNavigator isIntroScreen={isFirst} />;
}
