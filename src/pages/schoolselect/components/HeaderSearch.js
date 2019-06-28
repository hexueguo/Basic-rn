import React, { Component } from "react";
import { View, TextInput } from "react-native";
import Icon from "components/Iconfont";
import styles from "./HeaderSearchStyles";

class HeaderSearch extends Component {
  onFocus = () => {
    const { onSearchFocus = () => {} } = this.props;
    onSearchFocus();
  };

  onChangeText = value => {
    const { onSearchChange = () => {} } = this.props;
    onSearchChange(value);
  };

  render() {
    const { searchValue } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.search}>
          <View style={styles.iconView}>
            <Icon name="search" size={18} />
          </View>
          <TextInput
            value={searchValue}
            placeholder="输入学校名称搜索"
            placeholderTextColor="rgba(39, 48, 70, 0.25)"
            style={styles.TextInput}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
          />
        </View>
      </View>
    );
  }
}

export default HeaderSearch;
