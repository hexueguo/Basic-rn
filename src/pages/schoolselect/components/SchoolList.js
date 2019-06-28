import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "components/Iconfont";
import Divide from "components/Divider";
import { ColorPrimary } from "theme";
import styles from "./SchoolListStyles";

class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // schoolsData: [
      //   {
      //     id: 1,
      //     name: "大维幼儿园",
      //     addr: "广州市番禺区新二路3号",
      //     checked: true,
      //   },
      // ],
    };
  }

  /**
   * 选择学校
   */
  checkSchool = data => {
    const { dispatch, checkedSchool = () => {} } = this.props;
    let { schoolList = [] } = this.props;
    schoolList = schoolList.map(item => {
      if (data.schoolCode === item.schoolCode) {
        return {
          ...item,
          checked: true,
        };
      } else {
        return {
          ...item,
          checked: false,
        };
      }
    });
    // 修改model的学校列表数据
    dispatch({
      type: "school/updateSchoolList",
      payload: schoolList,
    }).then(() => {
      checkedSchool(data);
    });
  };

  render() {
    const { style = {}, schoolListMaxHeigth, schoolList = [] } = this.props;
    return (
      <View style={{ ...styles.root, ...style }}>
        <Divide style={{ backgroundColor: "#F4F6F8" }} />
        <ScrollView
          style={{ ...styles.schools, maxHeight: schoolListMaxHeigth }}
        >
          {schoolList.length > 0 ? (
            schoolList.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.school}
                  onPress={this.checkSchool.bind(this, item)}
                >
                  <View>
                    <Text style={styles.schoolName}>{item.schoolName}</Text>
                    <Text style={styles.schoolAddr}>{item.schoolAddrss}</Text>
                  </View>
                  {item.checked ? (
                    <Icon
                      name="tick"
                      type="icon"
                      color={ColorPrimary}
                      size={16}
                    />
                  ) : null}
                </TouchableOpacity>
                <Divide style={{ backgroundColor: "#F4F6F8" }} />
              </View>
            ))
          ) : (
            <View style={styles.school}>
              <Text style={styles.schoolName}>无数据</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default SchoolList;
