import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Button, Animated } from "react-native";

function CollapseView(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 80,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 1000,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  return (
    <View style={{ overflow: "hidden" }}>
      <Animated.View style={{ maxHeight: animationHeight }}>
        <Text style={styles.paragraph} numberOfLines={maxLines}>
          {props.descrption}
        </Text>
      </Animated.View>
      <Button title="Toggle Collapsed" onPress={toggleCollapsed} />
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CollapseView;
