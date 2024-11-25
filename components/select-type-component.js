import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/colors';
import CustomTextfield from '../components/custom-textfield';
import {FontAwesome, Entypo, AntDesign} from 'react-native-vector-icons';
import DropDown from './dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Fonts from '../styles/fonts';
import TextEditor from '../components/text-editor/text-editor';

const isWeb = Platform.OS === 'web';

export default class SelectTypeComponent extends Component {
  data = [
    {
      value: 'Text',
    },
    {
      value: 'Video',
    },
    {
      value: 'YouTube',
    },
    {
      value: 'Image',
    },
    {
      value: 'Url',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      isMandatoryField: false,
      mobileNumber: '',
      youtubeUrl: '',
      youtubeUrlError: '',
    };
  }

  /**
   * Method for image picker;
   */
  _pickVideo = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log('response for video' + JSON.stringify(result));
    if (!result.cancelled) {
      this.props.onValueChange(result.uri, this.props.index);
    }
  };

  /**
   * Method for image picker;
   */
  _pickImage = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.props.onValueChange(result.uri, this.props.index);
    }
  };

  /**
   * Method to get the type of image.
   */
  getImageType() {
    return (
      <TouchableOpacity
        onPress={() => this._pickImage('MerchantLogo')}
        style={styles.merchantBorder}>
        <TouchableOpacity
          onPress={() => this._pickImage('MerchantLogo')}
          style={styles.chooseFilesButton}>
          <Text
            style={{
              color: Colors.darkGrayishBlue,
              fontSize: moderateScale(7),
              padding: moderateScale(2),
            }}>
            CHOOSE FILES
          </Text>
        </TouchableOpacity>
        {this.props.value == '' ? (
          <Text style={{color: Colors.black, fontSize: moderateScale(8)}}>
            No files chosen
          </Text>
        ) : (
          <Text style={{color: Colors.black, fontSize: moderateScale(8)}}>
            1 Image Selected.
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  /**
   * Method to get the type of video.
   */
  getVideoType() {
    return (
      <TouchableOpacity
        onPress={() => this._pickVideo()}
        style={styles.merchantBorder}>
        <TouchableOpacity
          onPress={() => this._pickVideo()}
          style={styles.chooseFilesButton}>
          <Text
            style={{
              color: Colors.darkGrayishBlue,
              fontSize: moderateScale(7),
              padding: moderateScale(2),
            }}>
            CHOOSE FILES
          </Text>
        </TouchableOpacity>
        {this.props.value == '' ? (
          <Text style={{color: Colors.black, fontSize: moderateScale(8)}}>
            No files chosen
          </Text>
        ) : (
          <Text style={{color: Colors.black, fontSize: moderateScale(8)}}>
            1 Video Selected.
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  /**
   * Method to get custom text editor.
   */
  getCustomTextEditor() {
    return (
      <View style={isWeb ? styles.textWebEditor : styles.textEditor}>
        <TextEditor
          editorId={this.props.editorId}
          value={this.props.value}
          onValueChange={value =>
            this.props.onValueChange(value, this.props.index)
          }
        />
      </View>
    );
  }

  /**
   * Method to get youtube url.
   */
  getYoutubeUrlType() {
    return (
      <View
        style={{
          borderWidth: moderateScale(1),
          borderColor: Colors.grayishYellow,
          justifyContent: 'flex-end',
          width: '100%',
          paddingHorizontal: moderateScale(10),
          height: moderateScale(60),
          borderStyle: 'dashed',
        }}>
        <CustomTextfield
          value={this.props.value}
          placeholder="Youtube"
          onChangeText={value =>
            this.props.onValueChange(value, this.props.index)
          }
        />
      </View>
    );
  }

  /**
   * Method to get url.
   */
  getUrlType() {
    return (
      <View
        style={{
          borderWidth: moderateScale(1),
          borderColor: Colors.grayishYellow,
          justifyContent: 'flex-end',
          width: '100%',
          paddingHorizontal: moderateScale(10),
          height: moderateScale(60),
          borderStyle: 'dashed',
        }}>
        <CustomTextfield
          value={this.props.value}
          placeholder="Url"
          onChangeText={value =>
            this.props.onValueChange(value, this.props.index)
          }
          style={{alignSelf: 'baseline'}}
        />
      </View>
    );
  }

  /**
   * Method to selected type view.
   */
  getSelectedTypeView() {
    switch (this.props.type) {
      case 'Image':
        return this.getImageType();
        break;
      case 'Video':
        return this.getVideoType();
        break;
      case 'Text':
        return this.getCustomTextEditor();
        break;
      case 'Url':
        return this.getUrlType();
        break;
      case 'YouTube':
        return this.getYoutubeUrlType();
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={{marginBottom: moderateScale(10)}}>
        <DropDown
          style={styles.DropDown}
          label="Select TYPE"
          data={this.data}
          value={{value: this.props.type}}
          onDropDownPress={() => null}
          onValueChange={(value, index) =>
            this.props.designTypeChange(value, this.props.index)
          }
        />

        {this.getSelectedTypeView()}
        {this.props.error != '' && (
          <Text style={styles.inputErrorLabelStyle}>{this.props.error}</Text>
        )}

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {this.props.lastIndex == this.props.index && (
            <TouchableOpacity
              onPress={() => this.props.onAddMorePress()}
              style={[styles.addMoreButton, {flexDirection: 'row'}]}>
              <Text style={styles.addButtonText}>Add More</Text>
              <View style={styles.iconContainer}>
                <FontAwesome
                  style={styles.fontAwesomeIcon}
                  name="circle"
                  color={Colors.white}
                  size={20}
                />
                <AntDesign
                  style={styles.antDesignIcon}
                  name="plus"
                  size={10}
                  color={Colors.black}
                />
              </View>
            </TouchableOpacity>
          )}
          {this.props.index != 0 && (
            <TouchableOpacity
              onPress={() => this.props.onDeletePress(this.props.index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>

              <View style={styles.iconContainer}>
                <FontAwesome
                  style={styles.fontAwesomeIcon}
                  name="circle"
                  color={Colors.white}
                  size={20}
                />
                <Entypo
                  style={styles.antDesignIcon}
                  name="cross"
                  size={15}
                  color={Colors.white}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  DropDown: {
    width: '30%',
    alignSelf: 'flex-end',
    marginBottom: moderateScale(12),
  },
  iconContainer: {
    marginLeft: moderateScale(10),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chooseFilesButton: {
    backgroundColor: Colors.extraLightBlue,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    paddingVertical: moderateScale(0),
    marginRight: moderateScale(3),
  },
  addMoreButton: {
    shadowOffset: {width: 0.4, height: 0.4},
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: moderateScale(15),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(7),
    flexDirection: 'row',
    backgroundColor: Colors.lightOrange,
    borderColor: Colors.lightOrange,
    alignSelf: 'center',
    padding: moderateScale(10),
    justifyContent: 'center',
    marginVertical: moderateScale(15),
    marginHorizontal: moderateScale(5),
  },
  addButtonText: {
    textAlign: 'left',
    color: Colors.black,
    fontSize: moderateScale(12),
    marginRight: moderateScale(5),
  },
  deleteButton: {
    shadowOffset: {width: 0.4, height: 0.4},
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    elevation: 5,
    marginBottom: moderateScale(15),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(7),
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    alignSelf: 'center',
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    justifyContent: 'center',
    marginVertical: moderateScale(15),
    marginHorizontal: moderateScale(5),
  },
  deleteText: {
    fontSize: moderateScale(12),
    color: Colors.white,
    marginRight: moderateScale(5),
  },
  antDesignIcon: {
    position: 'absolute',
  },
  fontAwesomeIcon: {
    position: 'absolute',
    opacity: 0.5,
  },
  merchantBorder: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(1),
    borderColor: Colors.grayishYellow,
    marginBottom: moderateScale(15),
    borderStyle: 'dashed',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 0.2},
    shadowOpacity: 0.28,
    shadowRadius: 1,
    elevation: 5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputErrorLabelStyle: {
    backgroundColor: 'white',
    color: 'red',
    fontSize: moderateScale(11),
    textAlignVertical: 'bottom',
    paddingTop: 0,
    fontFamily: Fonts.ProductSans,
  },
  textEditor: {
    height: moderateScale(200),
  },
  textWebEditor: {
    height: moderateScale(270),
  },
});
