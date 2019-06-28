import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { VlcSimplePlayer } from "react-native-yz-vlcplayer";
import Orientation from "react-native-orientation";
import TopNavBar from "components/TopNavBar";

class VideoDemo extends Component {
  state = {
    isFull: false,
  };

  onStartFullScreen = () => {
    this.setState({
      isFull: true,
    });
  };

  onCloseFullScreen = () => {
    this.setState({
      isFull: false,
    });
  };

  render() {
    const { isFull } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ width: "100%", height: "100%", flex: 1 }}>
        <TopNavBar
          midText="服务直播"
          navigation={navigation}
          customStyle={{ borderBottomWidth: 0 }}
        />
        <ScrollView
          ref={ref => {
            this.scrollRef = ref;
          }}
          style={{ flex: 1 }}
          scrollEnabled={!isFull}
          contentContainerStyle={{
            flex: isFull ? 1 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 10, zIndex: 1000, color: "#FFFFFF" }}>
            VLC rtsp流播放器
          </Text>
          <VlcSimplePlayer
            ref={ref => {
              this.vlCPlayerView1 = ref;
            }}
            autoplay
            // url="rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"
            url="rtmp://10.45.46.161:1935/live/172021066160005540100"
            // url="rtsp://192.168.170.233:8554/testMp4"
            // url="rtsp://27.115.93.102:9090/dss/monitor/param?cameraid=1000018%240&substream=1"
            style={{ width: "100%", marginBottom: 20 }}
            // useVip={true}
            autoAspectRatio // 自动拉伸比例，仅安卓生效
            // showTitle
            // title="111111"
            Orientation={Orientation} // 控制屏幕方向
            onStartFullScreen={this.onStartFullScreen} // 全屏按钮点击事件
            onCloseFullScreen={this.onCloseFullScreen} // 取消全屏按钮点击事件
          />
          {/* <VlcSimplePlayer
            ref={ref => {
              this.vlCPlayerView2 = ref;
            }}
            autoplay
            // url="rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"
            url="rtmp://58.200.131.2:1935/livetv/hunantv"
            // url="rtsp://192.168.170.233:8554/testMp4"
            // url="rtsp://27.115.93.102:9090/dss/monitor/param?cameraid=1000018%240&substream=1"
            style={{ width: "100%", marginBottom: 20 }}
            // useVip={true}
            autoAspectRatio
            showTitle
            Orientation={Orientation}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          />
          <VlcSimplePlayer
            ref={ref => {
              this.vlCPlayerView3 = ref;
            }}
            autoplay
            // url="rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov"
            url="rtmp://58.200.131.2:1935/livetv/hunantv"
            // url="rtsp://192.168.170.233:8554/testMp4"
            // url="rtsp://27.115.93.102:9090/dss/monitor/param?cameraid=1000018%240&substream=1"
            style={{ width: "100%", marginBottom: 20 }}
            // useVip={true}
            autoAspectRatio
            showTitle
            Orientation={Orientation}
            onStartFullScreen={this.onStartFullScreen}
            onCloseFullScreen={this.onCloseFullScreen}
          /> */}
        </ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({});

export default VideoDemo;
