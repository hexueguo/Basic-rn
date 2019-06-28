import React from "react";
import { Icon } from "@ant-design/react-native";
import { View, Text, Image, Dimensions } from "react-native";

// import demo from "assets/image/pho-1.png";

import styles from "./styles";

const { width: widthWindow = 200 } = Dimensions.get("window");

const HeaderIcon = ({ status }) => {
  return (
    <View style={styles.stepHeaderIcon}>
      <View
        style={[
          styles.icon,
          status === "wait" ? styles.waitIcon : "",
          status === "finish" ? styles.finishIcon : "",
          status === "process" ? styles.processIcon : "",
        ]}
      >
        {status === "process" ? (
          <Icon style={styles.picon} size="xs" name="check-circle" />
        ) : null}
      </View>
    </View>
  );
};

export const StepOne = ({
  status,
  title,
  icon,
  desc,
  extra,
  imgs = [],
  showLine = true,
}) => {
  return (
    <View style={styles.stepOne}>
      {/* 步骤标题行 */}
      <View style={styles.stepHeader}>
        {/* 使用自定义图标或默认图标 */}
        {icon || <HeaderIcon status={status} />}
        {/* 使用自定义Title或默认Title样式 */}
        {!title ? null : typeof title !== "string" ? (
          title
        ) : (
          <Text
            style={[styles.title, status === "process" ? styles.lightText : ""]}
          >
            {title}
          </Text>
        )}
      </View>
      {/* 步骤描述信息 */}
      <View style={styles.stepDesc}>
        {showLine && <View style={styles.line} />}
        <View style={styles.stepInfoWrapper}>
          <View>
            {/* 使用自定义Desc或默认Desc样式 */}
            {!desc ? null : !Array.isArray(desc) ? (
              desc
            ) : (
              <View style={styles.descInfo}>
                {desc.map((ds, idx) => {
                  return (
                    <Text key={idx} style={styles.descText}>
                      {ds}
                    </Text>
                  );
                })}
              </View>
            )}
          </View>
          {/* 使用自定义extra或默认extra样式 */}
          {!extra ? null : typeof extra !== "string" ? (
            extra
          ) : (
            <View style={styles.extraInfoContainer}>
              <Text style={styles.descText}>{extra}</Text>
            </View>
          )}
          {/* imgs是否为数组 */}
          {!imgs ? null : (
            <View
              style={{
                marginTop: 8,
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {imgs.map((item, index) => {
                const { objId } = item;
                return (
                  <Image
                    source={{ uri: objId }}
                    style={{
                      ...styles.pic,
                      width: (widthWindow - 101) / 4,
                      height: (widthWindow - 101) / 4,
                    }}
                    key={index}
                  />
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

function CustomStep({ children }) {
  return <View style={styles.steps}>{children}</View>;
}

export default CustomStep;
