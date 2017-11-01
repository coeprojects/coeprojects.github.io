// Import React
import React, { Component } from 'react';
import Reveal from "./js/reveal.js"; 
import Tableau from "tableau-react";
import Dash1 from "./dashboards/dash1.js";
import Dash2 from "./dashboards/dash2.js";
import Dash3 from "./dashboards/dash3.js";
//import Zoom from "./plugin/zoom-js/zoom.js";
import YouTube from 'react-youtube'

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  CodePane,
  Appear,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");
require("./css/reveal.css");

const images = {
  city: require("../assets/city.jpg"),
  coeback: require("../assets/COEbackground.png"),
  back1: require("../assets/background.jpg"),
  back2: require("../assets/background2.jpg"),
  coelogo: require("../assets/coelogo.png"),
  tablogo: require("../assets/Tableau_RGB.png")


};

preloader(images);
export default class Presentation extends React.Component {
  renderCOEheader(text) {
    return (
      <Heading
        size={6}
        style={{ letterSpacing: "0.05em" }}
      >
        {text}
      </Heading>
    );
  }

  render() {
    const coeBg = {
      backgroundImage: `url(${images.coelogo})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      backgroundSize: "25% auto"
    };

    const sponsor = {
      Image: `url(${images.tablogo})`,
      display: "block",
      marginBottom: "1.5em"
    };
    const theme = createTheme(
      {
        primary: "white",
        secondary: "black",
        tertiary: "#6BB2FF",
        quartenary: "#CECECE",
        colorsix: "#6BB2FF"
      },
      {
        primary: "Open Sans SemiBold",
        secondary: "Merriweather",
        tertiary: "Open Sans"
      }
    );
    return (
      <Deck
        transition={["zoom", "spin"]}
        transitionDuration={500}
        theme={theme}
        bgImage={images.coelogo}>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading
            textFont="secondary" size={6} textAlign="top center" textColor="secondary" style={{
              position: "fixed",
              left: 0,
              top: -550
            }} >
            Multiple Dashboards (Dynamic And Fully Functional)
            </Heading>
          <Fit>
 

            <Dash2 />
            
          </Fit>

        </Slide>
        <Slide bgColor="primary">
          <Heading size={6} textColor="secondary">
            Chart Types that work
                      </Heading>
          <Appear>
            <Tableau url="https://tableau.coenterprise.com/t/DemoSite/views/goodcharttypes/BoxPlots?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no" />
          </Appear>
        </Slide>
        <Slide bgColor="quartenary">
          <Text>
            Be mindful of area or pie charts
          </Text>
          <Heading caps size={4}>Let's re-write the Tableau Component</Heading>
        </Slide>

        <Slide bgColor="quartenary">
        <formioapp />
        </Slide>
        <Slide bgColor="quartenary">
          <CodePane margin="-100px 0 0" lang="jsx" source={require("raw-loader!../assets/tableau2.example")} />
        </Slide>
        <Slide bgColor="quartenary">
          <CodePane margin="-100px 0 0" lang="jsx" source={require("raw-loader!../assets/victory.example")} />
        </Slide>
        <Slide bgColor="quartenary">
          <Heading size={2} caps fit>
            Victory is D3 - just easier to understand
          </Heading>
          <YouTube videoId="yuAdvxnK4IY" opts={{
            height: 400,
            width: 600,
            playerVars: {
              autoplay: 1
            }
          }} />
          <Text>All your favorite features are there - minus a few chart types (for now)</Text>
        </Slide>
        <Slide>
          <Heading caps fit>That's it!</Heading>
        </Slide>
        <Slide>
          <Heading size={3} caps>Go build more things!</Heading>
          <Text>christ@zillowgroup.com</Text>
          <Text>@Sock1tToomey</Text>
        </Slide>
      </Deck>
    );
  }
}
