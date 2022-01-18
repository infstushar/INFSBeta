import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import RoundedButton from "../../components/RoundedButton";
import OnboardingScreen1 from "./OnboardingScreen1";
import OnboardingScreen2 from "./OnboardingScreen2";
import OnboardingScreen3 from "./OnboardingScreen3";

const { width, height } = Dimensions.get("window");
const scale = width / 415;
const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS == "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const IntroSliderScreen = (props: {
  navigation: { navigate: (arg0: string, arg1: Object) => void };
}) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const scrollViewRef = useRef<ScrollView>(null);
  const [isSkipAndNext, setIsSkipAndNext] = useState(false);

  const { currentPage: pageIndex } = sliderState;

  const nextArrowHandler = (page: number) => {
    let gotoPage = 1;
    if (page == 2) {
      gotoPage = 2;
    } else if (page == 3) {
      gotoPage = 3;
    }

    if (gotoPage === 3) {
      launchHomeScreen();
    } else {
      if (page !== pageIndex) {
        setSliderState({ ...sliderState, currentPage: page });
      }
      scrollViewRef.current?.scrollTo({
        x: width * page,
        y: 0,
        animated: false,
      });
    }
  };

  const launchHomeScreen = () => {
    nextArrowHandler(2);
  };

  const skipHandler = () => {
    launchHomeScreen();
  };

  return (
    <>
      <ScrollView
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const { currentPage } = sliderState;
          const x = event.nativeEvent.contentOffset.x;
          const indexOfNextScreen = Math.round(x / width);
          if (indexOfNextScreen !== currentPage) {
            setSliderState({
              ...sliderState,
              currentPage: indexOfNextScreen,
            });
            console.log("currntPage", currentPage);
          }
          if (pageIndex === 2) {
            setIsSkipAndNext(true);
          } else {
            setIsSkipAndNext(false);
          }
        }}
        ref={scrollViewRef}
      >
        <View style={{}}>
          <OnboardingScreen1 />
          <View style={{ marginBottom: height * 0.1 }}>
            <View style={styles.pageDotView}>
              {Array.from(Array(3).keys()).map((key, index) => (
                <View
                  style={[
                    styles.paginationDots,
                    { width: pageIndex === index ? 30 : 10 },
                    { opacity: pageIndex === index ? 1 : 0.6 },
                  ]}
                  key={index}
                />
              ))}
            </View>
          </View>
        </View>
        <View>
          <OnboardingScreen2 />
          <View style={{ marginBottom: height * 0.1 }}>
            <View style={styles.pageDotView}>
              {console.log("pageIndex", pageIndex)}
              {Array.from(Array(3).keys()).map((key, index) => (
                <View
                  style={[
                    styles.paginationDots,
                    { width: pageIndex === index ? 30 : 10 },
                    { opacity: pageIndex === index ? 1 : 0.6 },
                  ]}
                  key={index}
                />
              ))}
            </View>
          </View>
        </View>

        <View>
          <OnboardingScreen3 />
          <View style={{ marginTop: 10 }}>
            <View style={styles.pageDotView}>
              {console.log("pageIndex", pageIndex)}
              {Array.from(Array(3).keys()).map((key, index) => (
                <View
                  style={[
                    styles.paginationDots,
                    { width: pageIndex === index ? 30 : 10 },
                    { opacity: pageIndex === index ? 1 : 0.6 },
                  ]}
                  key={index}
                />
              ))}
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={styles.accountText}>Already have an account?</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  onPress={() => {
                    props.navigation.navigate("Login", { login: true });
                  }}
                  style={styles.logInText}
                >
                  Login here
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {!isSkipAndNext ? (
        <View style={styles.skipNextContainer}>
          {!isSkipAndNext ? (
            <Text style={styles.skipButtonText} onPress={skipHandler}>
              Skip
            </Text>
          ) : null}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <RoundedButton
              onPress={() => {
                const index = pageIndex + 1;
                nextArrowHandler(index);
              }}
              title="Next"
              textVisible={true}
              visible={false}
            />
          </View>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View style={{ alignItems: "flex-start", marginRight: 10 }}>
            {!isSkipAndNext ? (
              <Text style={styles.skipButtonText} onPress={skipHandler}>
                Skip
              </Text>
            ) : null}
          </View>

          <RoundedButton
            onPress={() => {
              //props.navigation.navigate("Preference", { login: false });
              props.navigation.navigate("Login", { login: true });
            }}
            title="Get Started"
            textVisible={true}
            visible={false}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  skipContainer: {
    alignItems: "flex-end",
  },
  paginationDots: {
    height: 10,
    width: 10,
    marginHorizontal: 5,
    borderRadius: 10 / 2,
    backgroundColor: "#00B5E0",
  },
  roundedButton: {
    borderRadius: 29,
    overflow: "hidden",
    marginVertical: 20,
    justifyContent: "center",
    borderColor: "#00B5E0",
  },
  titleText: {
    fontSize: normalize(26.25),
    color: "#555555",
    fontFamily: "Poppins-Medium",
  },
  infoText: {
    color: "#838383",
    fontSize: normalize(17.5),
    textAlign: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    marginBottom: 30,
    marginStart: 20,
    marginEnd: 20,
    letterSpacing: 0,
  },
  skipButtonText: {
    color: "#838383",
    fontSize: normalize(17.5),
    textDecorationLine: "underline",
    marginRight: 10,
    fontFamily: "Poppins-Regular",
  },
  textureImage: {
    position: "absolute",
    top: -(height / 7),
    marginLeft: 10,
    height: "2%",
  },
  fullPageView: {
    flex: 1,
    alignItems: "center",
    width: width,
  },
  pageDotView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  skipNextContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    flexDirection: "row",
    marginBottom: height * 0.04,
  },
  accountText: {
    color: "#6F7070",
    fontSize: normalize(21),
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: height * 0.015,
  },
  logInText: {
    textDecorationLine: "underline",
    fontFamily: "Poppins-Regular",
    color: "#00b5e0",
    fontSize: normalize(15.75),
    marginBottom: 50,
  },
});
export default IntroSliderScreen;
