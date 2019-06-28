import React, { Component } from "react";
import { ColorFontDisable, ColorFontPlaceholder } from "theme";
import { View, Text, TouchableOpacity } from "react-native";
import { List, Modal, DatePickerView, Icon } from "@ant-design/react-native";
import styles from "./styles";

const dateFormat = (date = new Date(), format = "yyyy-MM-dd hh:mm:ss") => {
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  let fmt = format;
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return fmt;
};

/**
 * 带有弹出的表单组件，如：弹出选择字典数据，弹出选择时间组件
 */
class SelectPopup extends Component {
  state = {
    value: "",
    isModalShow: false,
  };

  handleVisible = visible => {
    this.setState({ isModalShow: visible });
  };

  renderSelect = value => {
    const { onChange = () => {}, dict, dictCode } = this.props;
    const selectData = dict[dictCode] || [];
    const selectList = selectData.map((record, idx) => {
      return (
        <View key={idx}>
          <TouchableOpacity
            onPress={() => {
              onChange(record);
              this.setState({ value: record });
              this.handleVisible(false);
            }}
          >
            <View style={styles.selectItem}>
              <Text
                style={[
                  styles.selectItemText,
                  value && value.codeValue === record.codeValue
                    ? styles.checkedSelectItem
                    : {},
                ]}
              >
                {record.codeName}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      );
    });
    const cancelSelect = (
      <TouchableOpacity
        onPress={() => {
          this.handleVisible(false);
        }}
      >
        <View style={styles.selectItem}>
          <Text style={[styles.selectItemText]}>取消</Text>
        </View>
      </TouchableOpacity>
    );
    return selectList.concat(cancelSelect);
  };

  render() {
    const {
      mode = "select",
      title = "请选择",
      showDivider = false,
      onChange = () => {},
    } = this.props;

    const { placeholder = "请选择时间" } = this.state;

    const { value, isModalShow } = this.state;
    return (
      <View>
        {/* 点击组件 */}
        <TouchableOpacity
          onPress={() => {
            this.setState({ isModalShow: true });
          }}
        >
          <View style={styles.itemRight}>
            <Text
              style={{
                ...styles.itemListTextBottom,
                color:
                  placeholder === "请选择时间" ? ColorFontDisable : "#5B6F98",
              }}
            >
              {placeholder}
            </Text>
            <Icon name="down" size={14} color={ColorFontPlaceholder} />
          </View>
        </TouchableOpacity>

        {showDivider && <View style={styles.divider} />}

        {/* 弹出 */}
        <Modal
          popup
          maskClosable
          visible={isModalShow}
          animationType="slide-up"
          onClose={() => {
            this.handleVisible(false);
          }}
        >
          <List>
            <View style={styles.header}>
              {/* 取消按钮 */}
              {mode !== "select" && (
                <TouchableOpacity
                  onPress={() => {
                    this.handleVisible(false);
                  }}
                >
                  <Text style={styles.linkText}>取消</Text>
                </TouchableOpacity>
              )}
              {/* 标题 */}
              <Text style={styles.pupUpTitle}>{title}</Text>
              {/* 确定按钮 */}
              {mode !== "select" && (
                <TouchableOpacity
                  onPress={() => {
                    this.handleVisible(false);
                    onChange(value || new Date());
                    this.setState({
                      placeholder: dateFormat(value || undefined, "yyyy-MM-dd"),
                    });
                  }}
                >
                  <Text style={styles.linkText}>确定</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.divider} />
            {/* 下拉选择 */}
            {mode === "select" && this.renderSelect(value)}

            {/* 日期时间选择 */}
            {mode === "time" && (
              <View style={styles.datePickerWrapper}>
                <DatePickerView
                  itemStyle={styles.datePicker}
                  mode="date"
                  value={value || new Date()}
                  minDate={new Date(2015, 0, 1)}
                  maxDate={new Date(2026, 0, 1)}
                  onChange={date => {
                    this.setState({
                      value: date,
                    });
                  }}
                />
              </View>
            )}
          </List>
        </Modal>
      </View>
    );
  }
}

export default SelectPopup;
