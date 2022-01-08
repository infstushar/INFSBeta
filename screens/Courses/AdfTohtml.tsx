/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import type { Node } from "react";
import { useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

import { fragmentToJSON, defaultSchema as schema } from "@atlaskit/adf-schema";
import { DOMSerializer } from "prosemirror-model";
import { env } from "jsdom-jscore-rn";

import { useWindowDimensions } from "react-native";
import RenderHtml, { ignoredStyles } from "react-native-render-html";
import Font from "../../constants/Font";
import { removeElement, isTag } from "domutils";

const AdfTohtml = (props) => {
  const isDarkMode = useColorScheme() === "dark";
  const [str, setStr] = useState("");
  const [source, setSource] = useState("");
  console.log(props.source);

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

  function onElement(element) {
    // Remove the first two children of an ol tag.
    if (element.tagName === "ul") {
      let i = 0;
      for (const child of element.children) {
        // Children might be text node or comments.
        // We don't want to count these.
        if (isTag(child)) {
          for (const child1 of child.children) {
            let value = child1.element;

            removeElement(child1);
          }
        }
      }
    }
  }

  const domVisitors = {
    onElement: onElement,
  };
  console.log({ source });
  return (
    <RenderHtml
      contentWidth={width}
      source={source}
      classesStyles={{}}
      baseStyle={{}}
      enableExperimentalGhostLinesPrevention={true}
      enableExperimentalBRCollapsing={true}
      //domVisitors={domVisitors}
      baseFontStyle={{ fontFamily: "Poppins-Regular" }}
      tagsStyles={{
        ul: {
          fontFamily: "Poppins-Regular",
          color: "#3E3E3E",
          marginVertical: 2,
        },
        li: {
          marginTop: 8,
        },
        p: {
          fontSize: Font.p1,
          fontFamily: "Poppins-Regular",
          color: "#3E3E3E",
          marginLeft: 10,
          marginRight: 10,
          marginTop: -10,
        },
        h2: {
          fontFamily: "Poppins-Regular",
          color: "#00B5E0",
          fontSize: Font.h4,
          marginLeft: 10,
        },
        h1: {
          fontFamily: "Poppins-Regular",
          color: "#00B5E0",
          fontSize: Font.h1,
          marginLeft: 10,
        },
        h6: {
          fontFamily: "Poppins-Regular",
          color: "#00B5E0",
          fontSize: Font.p1,
          marginLeft: 10,
        },
        h3: {
          fontFamily: "Poppins-Regular",
          color: "#00B5E0",
          fontSize: Font.h5,
          marginLeft: 10,
        },
        h4: {
          fontFamily: "Poppins-Regular",
          color: "#00B5E0",
          fontSize: Font.h4,
          marginLeft: 10,
        },
        h5: {
          fontFamily: "Poppins-Regular",
          color: "#00B5E0",
          fontSize: Font.h5,
          marginLeft: 10,
        },
        strong: {
          color: "#00B5E0",
        },
      }}
    />
  );
};

export default AdfTohtml;
