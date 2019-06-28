import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Toast } from "@ant-design/react-native";
import { MapView, Marker } from "react-native-amap3d";
import TopNavBar from "components/TopNavBar";
import Icon from "components/Iconfont";
import { coordsGPS2Amap } from "utils";
import HeaderSearch from "./components/HeaderSearch";
import SchoolList from "./components/SchoolList";
import styles from "./styles";

class SchoolSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startSearch: false,
      searchValue: "", // 搜索框的值
      schoolListMaxHeigth: 320, // 数据列表最高值，默认为320
      // 定位点中心 -- 定位坐标
      locationCenter: {
        longitude: 0,
        latitude: 0,
      },
    };
  }

  componentDidMount() {
    this.locate();
  }

  /**
   * 定位操作
   */
  locate = () => {
    try {
      // 定位当前位置
      this.getLocation().then(({ coords }) => {
        const target = coordsGPS2Amap(coords);
        this.setState({
          locationCenter: target,
        });

        this.mapView.animateTo({
          tilt: 0,
          rotation: 0,
          zoomLevel: 15,
          coordinate: target,
        });
      });
    } catch (e) {
      Toast.fail("获取位置失败");
    }
  };

  /**
   * 定位坐标获取,通过手机自带定位方法获取当前位置
   */
  getLocation = () =>
    new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(location => {
        resolve(location);
      });
    });

  /**
   * 取消选择
   */
  cancel = () => {
    const { navigation } = this.props;
    if (navigation && typeof navigation.goBack === "function") {
      navigation.pop();
    }
  };

  /**
   * 搜索框Focus获得焦点监听
   */
  onSearchFocus = () => {
    const { height } = Dimensions.get("window");
    // 获取列表能达到的最高高度
    const schoolListMaxHeigth = height - 80;
    this.setState({
      startSearch: true,
      schoolListMaxHeigth,
    });
  };

  /**
   * 搜索框change监听
   */
  onSearchChange = value => {
    this.setState({
      startSearch: true,
      searchValue: value,
    });
  };

  /**
   * 选择学校
   */
  checkedSchool = data => {
    const { navigation } = this.props;
    const parentPage = navigation.getParam("parentPage"); // 父页面传递过来的路由地址，即父页面为哪个页面
    navigation.navigate(parentPage, { checkedSchool: data });
  };

  render() {
    const {
      startSearch,
      searchValue,
      schoolListMaxHeigth,
      locationCenter,
    } = this.state;
    const { navigation, dispatch, school } = this.props;
    const { schoolList = [] } = school;
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <TopNavBar
            navigation={navigation}
            leftText={
              <TouchableOpacity onPress={this.cancel}>
                <Text style={styles.TopNavBarLeft}>取消</Text>
              </TouchableOpacity>
            }
            customStyle={{ borderBottomWidth: 0 }}
            midText="学校"
          />
          <View>
            <HeaderSearch
              searchValue={searchValue}
              onSearchFocus={this.onSearchFocus}
              onSearchChange={this.onSearchChange}
            />
          </View>
        </View>
        <View style={styles.Map}>
          <MapView
            ref={ref => {
              this.mapView = ref;
            }}
            style={styles.MapView}
            showsZoomControls={false}
          >
            <Marker
              clickDisabled
              infoWindowDisabled={false}
              coordinate={locationCenter}
              icon={() => {
                return (
                  <Icon
                    name="location-point-red"
                    type="icon"
                    size={24}
                    color="#FF8567"
                  />
                );
              }}
            />
          </MapView>
          <TouchableOpacity style={styles.MapLocation} onPress={this.locate}>
            <View style={styles.MapLocationView}>
              <Icon
                name="serveing-compass"
                type="icon"
                size={26}
                color="rgba(0,0,0,0.65)"
              />
            </View>
          </TouchableOpacity>
        </View>
        <SchoolList
          style={
            startSearch
              ? { top: 100, position: "absolute" }
              : { bottom: 0, position: "relative" }
          }
          dispatch={dispatch}
          schoolList={schoolList}
          schoolListMaxHeigth={schoolListMaxHeigth}
          checkedSchool={this.checkedSchool}
        />
      </View>
    );
  }
}

export default connect(({ school }) => ({
  school,
}))(SchoolSelect);
