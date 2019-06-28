import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { InputItem, Button, Modal, Toast } from "@ant-design/react-native";
import { connect } from "react-redux";
import TopBack from "components/TopBack";
import Upload from "components/Upload";
import { showImageChooser } from "utils";
import styles from "./styles";

class UploadPhotoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowBind: true, // 允许点击按钮进行绑定
      visible: false,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      signupData: {
        parentPhoto = [],
        babyPhoto = [],
        // parentPhotoPath = "",
        // babyPhotoPath = "",
        birthId = "",
      },
    } = nextProps;
    // 判断是否都已输入/选择完成，允许点击下一步按钮
    if (
      parentPhoto.length > 0 &&
      babyPhoto.length > 0 &&
      // parentPhotoPath &&
      // parentPhotoPath.length > 0 &&
      // babyPhotoPath &&
      // babyPhotoPath.length > 0 &&
      birthId &&
      birthId.length > 0
    ) {
      return { ...state, allowBind: true };
    } else {
      return { ...state, allowBind: false };
    }
  }

  /**
   * 将表单 照片/宝贝出生证编号 数据保存到model中
   */
  saveForm = (key, value) => {
    const { dispatch } = this.props;
    dispatch({
      type: "signup/save/formValue",
      payload: {
        key,
        value,
      },
    });
  };

  /**
   * 选择图片，上传图片
   */
  chooseImage = type => {
    showImageChooser().then(photo => {
      this.setImage(photo, type);
    });
  };

  setImage = (file, type) => {
    const { uri } = file;
    const {
      signupData: { parentPhoto = [], babyPhoto = [] },
    } = this.props;
    if (type === "parent") {
      parentPhoto.push({ uri });
      this.saveForm("parentPhoto", parentPhoto);
    } else {
      babyPhoto.push({ uri });
      this.saveForm("babyPhoto", babyPhoto);
    }
    Toast.info("上传成功！", 1);
  };

  /**
   * 删除某一张图片
   */
  delImg = (index, type) => {
    let {
      signupData: { parentPhoto = [], babyPhoto = [] },
    } = this.props;
    if (type === "parent") {
      parentPhoto = parentPhoto.splice(index + 1, 1);
      // 删除
      this.saveForm(["parentPhoto", "parentPhotoPath"], {
        parentPhoto,
        parentPhotoPath: "",
      });
    } else {
      babyPhoto = babyPhoto.splice(index + 1, 1);
      this.saveForm(["babyPhoto", "babyPhotoPath"], {
        babyPhoto,
        babyPhotoPath: "",
      });
    }
  };

  /**
   * 绑定宝贝->弹窗信息确认弹窗
   */
  bindBaby = () => {
    this.setState({
      visible: true,
    });
  };

  /**
   * 关闭确认弹窗
   */
  onModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 确认信息，完成注册，跳转到手势密码设置页
   */
  confirm = () => {
    Toast.info("注册完成，请设置手势密码！", 1, () => {
      const { navigation } = this.props;
      navigation.navigate("SetGesturePassword");
    });
  };

  render() {
    const { allowBind, visible } = this.state;

    // 确认弹窗modal底部按钮组
    const footerButtons = [
      {
        text: <Text style={styles.ModalFooterCancelText}>返回修改</Text>,
        onPress: this.onModalClose,
      },
      {
        text: <Text style={styles.ModalFooterConfirmText}>确认</Text>,
        onPress: this.confirm,
      },
    ];

    const {
      navigation,
      signupData: {
        parentPhoto = [],
        babyPhoto = [],
        birthId = "",
        babyInfo = {},
        selectOption,
      },
    } = this.props;
    const { babyClass, name, sex, birthday } = babyInfo;

    return (
      <View style={styles.root}>
        <TopBack navigation={navigation} />
        <View style={styles.title}>
          <Text style={styles.titleText}>上传照片</Text>
          <Text style={styles.classInfo}>
            照片的尺寸要求（不低于375*375px）
          </Text>
        </View>

        <View style={styles.photo}>
          <Upload
            style={styles.photoUpload}
            uploadIconText="家长正面照"
            avatarSource={parentPhoto}
            delImg={index => {
              this.delImg(index, "parent");
            }}
            chooseImage={() => {
              this.chooseImage("parent");
            }}
          />
          <Upload
            style={styles.photoUpload}
            uploadIconText="宝贝正面照"
            avatarSource={babyPhoto}
            delImg={index => {
              this.delImg(index, "baby");
            }}
            chooseImage={() => {
              this.chooseImage("baby");
            }}
          />
        </View>

        <View style={styles.form}>
          <InputItem
            value={birthId}
            type="number"
            labelNumber={7}
            maxLength={18}
            placeholder="请输入编号"
            style={styles.InputItem}
            textAlign="right"
            onChange={value => {
              this.saveForm("birthId", value);
            }}
          >
            <Text style={styles.InputItem}>宝贝出生证明编号</Text>
          </InputItem>
        </View>

        <Button
          type="primary"
          disabled={!allowBind}
          style={styles.button}
          onPress={this.bindBaby}
        >
          <Text style={styles.buttonText}>绑定宝贝</Text>
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            请上传真实信息，否则可能无法关联宝贝！
          </Text>
        </View>

        <Modal
          popup
          maskClosable
          transparent
          visible={visible}
          onClose={this.onModalClose}
          footer={footerButtons}
          style={styles.Modal}
        >
          <View style={styles.ModalView}>
            <View style={styles.ModalImage}>
              <View style={styles.ModalImageView}>
                <Image source={babyPhoto[0]} style={styles.ModalImageStyle} />
              </View>
            </View>
            <View style={styles.ModalTitleView}>
              <Text style={styles.ModalTitle}>{babyClass}</Text>
            </View>
            <View style={styles.babyInfo}>
              <View>
                <View style={{ ...styles.circle, marginTop: 10 }} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
              </View>
              <View>
                <Text style={styles.babyInfoText}>{`宝贝姓名： ${name}`}</Text>
                <Text style={styles.babyInfoText}>
                  {`性别： ${sex === "1" ? "男" : "女"}`}
                </Text>
                <Text style={styles.babyInfoText}>
                  {`出生日期： ${birthday}`}
                </Text>
                <Text style={styles.babyInfoText}>
                  {`我是宝贝的： ${selectOption}`}
                </Text>
                <Text style={styles.babyInfoText}>
                  {`出生证明编号： ${birthId}`}
                </Text>
              </View>
            </View>
            <Text style={styles.ModalDescription}>
              感谢您的认真填写, 请确保信息正确并耐心等待审核,
              审核通过后即可看到宝宝在幼儿园的生活!
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(({ signup }) => ({
  signupData: signup,
}))(UploadPhotoPage);
