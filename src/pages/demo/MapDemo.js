import React, { Component } from "react";
import { View } from "react-native";
import { MapView } from "react-native-amap3d";
import TopNavBar from "components/TopNavBar";
import MapNaviChooser from "components/MapNaviChooser";
import SilderButton from "./components/SliderButton";

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapNaviChooserVisible: false,
      coordinate: {
        longitude: 112.89,
        latitude: 28.2146,
      },
      endPoint: {
        longitude: 112.1231,
        latitude: 28.3142,
      },
    };
  }

  /**
   * 开始导航
   */
  navigate = () => {
    this.setState({
      mapNaviChooserVisible: true,
    });
  };

  render() {
    const {
      mapNaviChooserVisible = false,
      coordinate = {},
      endPoint = {},
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TopNavBar navigation={navigation} midText="地图Demo" />
        <MapView
          style={{ flex: 1 }}
          zoomLevel={15}
          coordinate={coordinate}
          clickDisabled
          infoWindowDisabled={false}
        />
        <SilderButton navigation={navigation} navigate={this.navigate} />

        <MapNaviChooser
          visible={mapNaviChooserVisible}
          onClose={() => {
            this.setState({ mapNaviChooserVisible: false });
          }}
          startLon={coordinate.longitude}
          startLat={coordinate.latitude}
          endLon={endPoint.longitude}
          endLat={endPoint.latitude}
        />
      </View>
    );
  }
}

export default componentName;
