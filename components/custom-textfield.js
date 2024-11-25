import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

export default class CustomTextfield extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  /**
   * Method to handle text on change.
   */
  _handleOnChangeText(event) {
    this.props.onChangeText(event);
  }

  /**
   * Method to handle editing on submit.
   * @param {*} event
   */
  _handleOnSubmitEditing(event) {
    this.props.onSubmitEditing();
  }

  /**
   * Method to handle on blur.
   */
  _handleOnBlur() {
    this.setState({focused: false});
  }

  /**
   * Method to handle on focus.
   */
  _handleOnFocus() {
    this.setState({focused: true});
  }

  /**
   * Method to handle textInput on focus.
   */
  focus() {
    this._textInput.focus();
  }

  /**
   * Method to handle textInput on blur.
   */
  blur() {
    this._textInput.blur();
  }

  /**
   * conditions to change the border style on focus or error.
   */
  getBorderStyle() {
    if (this.props.error) {
      return styles.borderContainerError;
    } else if (this.state.focused) {
      return styles.borderContainerFocus;
    } else {
      return styles.borderContainerBlur;
    }
  }

  getLabelStyle() {
    if (this.props.error) {
      return styles.inputErrorLabelStyle;
    } else if (this.state.focused) {
      return styles.customTextInputLabelFocused;
    } else {
      return styles.customTextInputLabel;
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.label ? (
          this.state.focused || this.props.value ? (
            <Text style={this.getLabelStyle()}>{this.props.label}</Text>
          ) : (
            <Text style={this.getLabelStyle()}></Text>
          )
        ) : null}

        <View style={this.getBorderStyle()}>
          <View style={styles.containerBody}>
            {this.props.icon && (
              <Image style={styles.Image} source={this.props.icon} />
            )}
            <TextInput
              ref={textInput => {
                this._textInput = textInput;
              }}
              autoComplete="off"
              //spellCheck="off"
              value={this.props.value}
              placeholder={this.state.focused ? null : this.props.placeholder}
              placeholderTextColor={
                this.state.focused ? Colors.strongBlue : Colors.darkGray
              }
              onFocus={() => this._handleOnFocus()}
              onBlur={() => this._handleOnBlur()}
              keyboardType={this.props.keyboardType}
              returnKeyType={this.props.returnKeyType}
              maxLength={this.props.maxLength}
              onChangeText={this._handleOnChangeText.bind(this)}
              secureTextEntry={this.props.secureTextEntry}
              style={
                this.state.focused ? styles.onFocusStyle : styles.onBlurStyle
              }
              underlineColorAndroid="transparent"
              onSubmitEditing={this._handleOnSubmitEditing.bind(this)}
            />
          </View>
        </View>
        {this.props.error ? (
          <Text style={styles.inputErrorLabelStyle}>{this.props.error}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(15),
    width: '100%',
    height: moderateScale(50),
    justifyContent: 'flex-end',
  },
  containerBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderContainerError: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'red',
  },
  inputErrorLabelStyle: {
    backgroundColor: 'white',
    color: 'red',
    fontSize: moderateScale(11),
    textAlignVertical: 'bottom',
    paddingTop: 0,
    fontFamily: Fonts.ProductSans,
  },
  customTextInputLabelFocused: {
    backgroundColor: 'white',
    color: Colors.strongBlue,
    fontSize: moderateScale(11),
    textAlignVertical: 'bottom',
    fontFamily: Fonts.ProductSans,
  },
  customTextInputLabel: {
    backgroundColor: 'white',
    color: Colors.darkGray,
    fontSize: moderateScale(9),
    textAlignVertical: 'bottom',
    fontFamily: Fonts.ProductSans,
    paddingLeft: 0,
  },
  onFocusStyle: {
    color: Colors.strongBlue,
    fontSize: moderateScale(12),
    width: '100%',
    textAlignVertical: 'bottom',
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    fontFamily: Fonts.ProductSans,
  },
  onBlurStyle: {
    color: Colors.black,
    fontSize: moderateScale(12),
    width: '100%',
    paddingLeft: 0,
    textAlignVertical: 'bottom',
    marginTop: 0,
    marginBottom: moderateScale(3),
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: Fonts.ProductSans,
  },
  borderContainerFocus: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.strongBlue,
  },
  borderContainerBlur: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.darkGray,
  },
  Image: {
    width: moderateScale(17),
    height: moderateScale(17),
    marginBottom: moderateScale(3),
    marginRight: moderateScale(13),
    alignSelf: 'flex-end',
  },
});
