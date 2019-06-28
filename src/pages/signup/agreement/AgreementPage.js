import React, { Component } from "react";
import { View, Text } from "react-native";
import TopNavBar from "components/TopNavBar";

class AgreementPage extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <TopNavBar navigation={navigation} midText="隐私条款和用户协议" />
        <Text> 隐私条款和用户协议 </Text>
      </View>
    );
  }
}

export default AgreementPage;
