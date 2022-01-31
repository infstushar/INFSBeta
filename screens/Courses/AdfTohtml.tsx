/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { useColorScheme, Platform } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { fragmentToJSON, defaultSchema as schema } from "@atlaskit/adf-schema";
import { DOMSerializer } from "prosemirror-model";
import { env } from "jsdom-jscore-rn";
import { useWindowDimensions } from "react-native";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import Font from "../../constants/Font";
import { removeElement, isTag } from "domutils";
import CounterStyle from "@jsamr/counter-style";

const systemFonts = [
  ...defaultSystemFonts,
  "Poppins-Regular",
  "Poppins-Bold",
  "Poppins-SemiBold",
];

const AdfTohtml = (props) => {
  const isDarkMode = useColorScheme() === "dark";
  const [str, setStr] = useState("");
  const [source, setSource] = useState("");

  // default schema from Atlassian adf-schema is same as prosemirror-model schema
  //create an DOM serializer from adf-schema
  const mainSerializer = DOMSerializer.fromSchema(schema);

  const getDOMDocument = (nodeObject) => {
    env(
      '<!DOCTYPE html><div id="content"></div>',
      "1",
      function (errors, window) {
        const document = window.document;
        const renderer = document.querySelector("div");
        const node = schema.nodeFromJSON(nodeObject);
        mainSerializer.serializeFragment(node, { document }, renderer);
        setStr(document.getElementById("content").innerHTML);
      }
    );

    // return { document, renderer };
  };

  const adfToHTML = (nodeObject) => {
    // create a dom object for conversion of schema to html
    getDOMDocument(nodeObject);
  };

  useEffect(() => {
    if (props.source) adfToHTML(props.source);
  }, [props.source]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setSource({
      html: `
             ${str}
             `,
    });
  }, [str]);

  const { width } = useWindowDimensions();

  const onElement = (el) => {
    const { children, name } = el;
    if (name === "ul" && children && children.length) {
      el.attribs["style"] = "list-style-type: green-tick;";
    }
  };

  const customListStyleSpecs = {
    "green-tick": {
      type: "textual",
      counterStyleRenderer: CounterStyle.cyclic("✓").withSuffix(" "),
    },
  };
  const tagsStyles = {
    body: {},
    ol: {
      fontFamily: "Poppins-Regular",
      color: "#3E3E3E",
      fontSize: Font.p1,
    },

    ul: {
      fontFamily: "Poppins-Regular",
      color: "#3E3E3E",
      fontSize: Font.p1,
      marginBottom: -8,
    },
    li: {},
    p: {
      fontSize: Font.p1,
      fontFamily: "Poppins-Regular",
      color: "#838383",
      marginLeft: 5,
      marginRight: 10,
      marginTop: -10,
    },
    h2: {
      fontFamily: "Poppins-Bold",
      fontSize: Font.h4,
      marginLeft: 5,
    },
    h1: {
      fontFamily: "Poppins-Bold",
      fontSize: Font.h1,
      marginLeft: 5,
    },
    h6: {
      fontFamily: "Poppins-Bold",
      fontSize: Font.p1,
      marginLeft: 5,
    },
    h3: {
      color: "#3E3E3E",
      fontFamily: "Poppins-Medium",
      fontSize: Font.h5,
      marginLeft: 5,
    },
    h4: {
      fontFamily: "Poppins-Medium",
      fontSize: Font.h4,
      marginLeft: 5,
    },
    h5: {
      fontFamily: "Poppins-SemiBold",
      fontSize: Font.h5,
      marginLeft: 5,
    },
    strong: {
      fontFamily: "Poppins-Medium",
      color: "#3E3E3E",
    },
    blockquote: {
      backgroundColor: "#0000001A",
      marginTop: 10,
      paddingTop: 25,
    },
  };
  const renderersProps = {
    ul: {
      markerBoxStyle: {},
      markerTextStyle: {
        color: "green",
      },
    },
  };

  const domVisitors = {
    onElement: onElement,
  };

  return (
    <RenderHtml
      contentWidth={width}
      source={source}
      classesStyles={{}}
      baseStyle={{}}
      domVisitors={domVisitors}
      tagsStyles={tagsStyles}
      customListStyleSpecs={customListStyleSpecs}
      renderersProps={renderersProps}
      systemFonts={systemFonts}
    />
  );
};

export default AdfTohtml;
