/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import type { Node } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import { fragmentToJSON, defaultSchema as schema } from "@atlaskit/adf-schema";
import { DOMSerializer } from "prosemirror-model";
import { env } from "jsdom-jscore-rn";

import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
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
  console.log({ source });

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

  return (
    <RenderHtml
      contentWidth={width}
      source={source}
      classesStyles={props.style}
      //domVisitors={domVisitors}
      containerStyle={props.bgStyle}
      tagsStyles={{
        ul: {
          fontSize: Font.h6,
        },
        li: {
          marginTop: -30,
          fontFamily: "Poppins-Regular",
          marginRight: 15,
          lineHeight: 24,
          color: "#3E3E3E",
        },
        p: {
          marginLeft: 20,
          fontSize: Font.p1,
          fontFamily: "Poppins-Bold",
          paddingVertical: 10,
          marginHorizontal: 10,
          // color: "#838383",
        },
      }}
    />
  );
};

const initialDocument = {
  version: 1,
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "What is Nutrition?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Here are two statements.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Statement A - Nutrition is the food we eat.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Statement B - Nutrition is how food affects us.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "So, what exactly is Nutrition?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "While most think Option A is true and don’t consider option B, let it be clear that Nutrition includes BOTH of these. If everyone begins to recognize that what is eaten matters as much as how it affects the body, everyone will live healthier lives.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "“Small chemical components of food that are needed in adequate amounts by the body to grow, reproduce and lead a normal healthy life are nutrients.”",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Everything that is consumed consists of nutrients. Broadly speaking, there are 3 types of nutrients;",
        },
      ],
    },
    {
      type: "orderedList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Macronutrients - Proteins, Fats, and Carbohydrates",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Micronutrients - Vitamins and Minerals",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Inorganic Nutrients - Water and Oxygen",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: " ",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "All of these nutrients have a definite role and are obtained from different food sources.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The health of the individual is influenced by the utilization of nutrients is called the nutritional status of an individual. The nutritional status can be determined through medical checkups, by the process of collecting and interpreting dietary and medical history. The nutritional status of a person can be good, fair, or poor. ",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Nutritional assessment aids in identifying under-nutrition, overnutrition (more on this in a while), nutritional deficiencies, individuals at the risk of developing malnutrition, individuals at the risk of developing nutritionally related diseases, the resources available to assist them to overcome nutritional problems.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Curiosity about nutrition is not a new phenomenon. Scientists have been studying food and nutrition for centuries. However, the landscape of Modern Nutrition has developed in recent years. During the initial years of the 20th Century, the discovery, isolation, and synthesis of micronutrients were performed. The goal was to study diseases of deficiency.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "With this, the advent of nutrition science began to take shape. It is not shocking to learn that widespread diseases were a starting point of most nutrition-centered research. More research was conducted about non-communicable diseases and how nutrition plays a role in them. Over the years, nutrition scientists realized that it is not nutrients in isolation that need to be studied, it is food and diet patterns in general. This is because silent epidemics such as malnutrition, obesity, and other food-related lifestyle diseases becoming more and more common.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Since the 1990s, the emphasis has been placed on scientific, evidence-based research. Therefore, a lot more large-scale nutrition studies, randomized clinical trials, cohort studies, etc. are seen. But the reality is, despite progress across all spheres in lives, diet and food patterns are still driven by primal urges and needs.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Every generation comes with its own set of health hazards. While human ancestors struggled to live longer, today, people are living longer but are crippled by lifestyle disorders. What does this mean?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "It means that the ‘one size fits all approach does not work when it comes to nutrition. It needs to be tweaked to the needs of the present situation and should be made sustainable. And of course, it should keep the diseases at bay.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "What is Optimum Nutrition?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "When the food provides the right amount of nutrients, the diet can be sustained for a long time, and it is safe to say that the nutrition is optimum when one is reasonably healthy. However, it is important to note that optimum nutrition depends entirely on the goal.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Now, think about the grade 1 or grade 2 textbooks. Remember that chapter on food groups and a balanced diet?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Remember seeing something like this? Okay, now what if one was told that this is not exactly optimal?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "A balanced diet will make sure that one gets the right amount of macronutrients as per individuals goals. What may be a balanced and optimal diet for one person may be counterproductive for another. This is why we must stop asking others for a diet plan.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Imagine planning a holiday. Now, there are many things to consider like:",
        },
      ],
    },
    {
      type: "orderedList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "What is the purpose of the holiday- Leisure/ Business",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "What kind of destination suits most of the plans?",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "How much money can be spent?",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Now think about this - if so much thought can be put into a holiday, why not put some more thought into daily nutrition?",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "Why do we need to know about Nutrition?",
          marks: [
            {
              type: "strong",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Nutrients are essential elements required for the normal functioning of our body and when taken in excess, or deficiency can result in different physiological and psychological conditions.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Types of Nutrition:",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Good nutrition: “Good nutrition is the state in which a person gets all the nutrients in the correct amount and proportion and some nutrients are stored in the body after meeting all the body requirements”. This is known as optimum or adequate nutrition and it helps to maintain good health.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Malnutrition: Malnutrition means an undesirable quantity and kind of nutrition.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Malnutrition is that state of ill-health which may be caused by the deficiency or excess of one or more essential nutrients in the body. An unhealthy environment also causes malnutrition. The physical, mental, and intellectual well-being of a person is affected due to malnourishment.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "A malnourished person is physically, mentally, socially, and emotionally sick is of two types:",
        },
      ],
    },
    {
      type: "orderedList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Undernutrition",
                  marks: [
                    {
                      type: "strong",
                    },
                  ],
                },
                {
                  type: "text",
                  text: " - Undernutrition is a deficiency of one or more nutrients, and in that state of nutrition in which the quality and quantity of food is not sufficient for the body and is deficient in one or more nutrients. An undernourished person manifests symptoms of deficiencies and feels unwell. Poor body weight, poor resistance to infection, weakness, and general ill-health are the symptoms of undernourishment.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Overnutrition",
                  marks: [
                    {
                      type: "strong",
                    },
                  ],
                },
                {
                  type: "text",
                  text: " - Overnutrition is an excess of one or more nutrients and is a state of nutrition in which the intake of nutrients is more than what the body needs quantitatively as well as qualitatively causing adverse effects on the body.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "A person does not associate someone who weighs 100 kg with the word - MALNOURISHED. ",
        },
      ],
    },
    {
      type: "panel",
      attrs: {
        panelType: "info",
      },
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "However, ",
            },
            {
              type: "text",
              text: "even those with obesity can be malnourished ",
              marks: [
                {
                  type: "strong",
                },
              ],
            },
            {
              type: "text",
              text: "(Via 2012; C. Fu et al, 2016).",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Shocking, right? Research suggests that nutritional deficiencies are more likely to get overlooked in people who are obese (Lasocki, 2015). The reason may be that obese or overweight people get more than enough calories, however not enough micronutrients. Hence, poor food choices can provide ample calories but not the right nutrition.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "WHO recognizes malnutrition, in every form, as a significant threat to human health. Humans are today living with the double burden of malnutrition in the form of undernutrition and being overweight.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "So whether someone is lean or overweight, nutrition knowledge is important for anyone and everyone.",
        },
      ],
    },
  ],
};
export default AdfTohtml;
