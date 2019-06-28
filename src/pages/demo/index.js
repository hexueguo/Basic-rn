import React, { Component } from "react";
import { ScrollView, Button } from "react-native";
import TopNavBar from "components/TopNavBar";
import ImgGroup from "components/ImgGroup";
import Loading from "components/Loading";
import CustomStep, { StepOne } from "components/CustomStep";
import Upload from "components/Upload";
import SelectPopup from "components/SelectPopup";
import { showImageChooser } from "utils";
import SildeButton from "./components/SliderButton";

import Template from "./template";

const dataSource = [
  {
    statusDesc: "上报",
    name: "赵七",
    time: "2019-01-23 10:23:14",
    content: "每个环节的处理情况说明",
    status: "finish",
  },
  {
    statusDesc: "调度",
    name: "赵七",
    time: "2019-01-23 10:23:14",
    content:
      "每个环节的处理情况说明每个环节的处理情况说明每个环节的处理情况说明每个环节的处理情况说明",
    status: "process",
  },
  {
    statusDesc: "处置",
    name: "赵七",
    time: "2019-01-23 10:23:14",
    content: "每个环节的处理情况说明",
    status: "wait",
  },
  {
    statusDesc: "关闭",
    status: "wait",
  },
];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarSource: [], beginTime: "" };
  }

  // 上传图片
  chooseImage = () => {
    showImageChooser().then(this.setImage);
  };

  setImage = ({ uri }) => {
    const { avatarSource } = this.state;
    avatarSource.push({ uri });
    // const key = Toast.loading("图片上传中...", 0);
    // Portal.remove(key);
    this.setState({ avatarSource });
  };

  // 删除某一张图片
  delImg = index => {
    let { avatarSource } = this.state;
    avatarSource = avatarSource.splice(index + 1, 1);
    this.setState({ avatarSource });
  };

  render() {
    const { avatarSource = [], beginTime } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView>
        <Template title="顶部导航条组件">
          <TopNavBar
            midText="附加技能"
            rightText="确定"
            navigation={navigation}
          />
        </Template>

        <Template title="图片组">
          <ImgGroup title="图片/视频：" imgDatas={[1, 2, 3, 4, 5, 6]} />
        </Template>

        <Template title="Loading">
          <Loading />
        </Template>

        <Template title="步骤条">
          <CustomStep dataSource={dataSource}>
            {dataSource.map((item, index) => {
              return (
                <StepOne
                  item={item}
                  title={item.statusDesc}
                  desc={[item.name, item.time]}
                  extra={item.content}
                  status={item.status}
                  key={index}
                />
              );
            })}
          </CustomStep>
        </Template>

        <Template title="图片上传">
          <Upload
            avatarSource={avatarSource}
            delImg={this.delImg}
            chooseImage={this.chooseImage}
          />
        </Template>

        <Template title="时间选择">
          <SelectPopup
            mode="time"
            title="请选择时间"
            value={beginTime}
            onChange={val => {
              this.setState({ beginTime: val });
            }}
          />
        </Template>

        <Template title="视频播放DEMO">
          <Button
            title="视频播放"
            onPress={() => navigation.navigate("VideoDemo")}
          />
        </Template>

        <Template title="手势滑动解锁DEMO">
          <Button
            title="滑动解锁"
            onPress={() => navigation.navigate("GesturePasswordDemo")}
          />
        </Template>

        <Template title="ultimate-listview">
          <Button
            title="ultimate-listview"
            onPress={() => navigation.navigate("UltimateListview")}
          />
        </Template>

        <Template title="地图组件Demo">
          <Button title="地图" onPress={() => navigation.navigate("MapDemo")} />
        </Template>

        <Template title="滑动按钮">
          <SildeButton navigation={navigation} />
        </Template>
      </ScrollView>
    );
  }
}

export default Demo;
