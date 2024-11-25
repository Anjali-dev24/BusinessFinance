import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Picker,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-material-dropdown';
import Colors from '../styles/colors';
import {AntDesign} from '@expo/vector-icons';
import Fonts from '../styles/fonts';

const defaultCountries = [
  {
    value: 'Country',
  },
];
const defaultStates = [
  {
    value: 'State',
  },
];

const defaultCities = [
  {
    value: 'City',
  },
];

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
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
   * Note : Data should be in this format
   *  data = [{
      value: 'xyz',
    }, {
      value: 'abc',
    }, {
      value: 'qwe',
    }];
   */

  /**
   * Updates the value on change
   * @param {*} value
   */
  onValueChange(value, index) {
    if (this.props.label == 'City' && value == 'City') {
      //Do nothing as there was no cities in corresponding state.
    } else {
      this.props.onValueChange(value, index);
    }
  }

  /**
   * Method to get initial data.
   */
  getInitialData() {
    switch (this.props.label) {
      case 'Country':
        return defaultCountries;
        break;
      case 'State':
        return defaultStates;
        break;
      case 'City':
        return defaultCities;
        break;
    }
  }

  /**
   * Method to get border style while focused or showing any error.
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

  /**
   * Render's base for dropdown used in IOS and Android
   */
  renderBase() {
    return (
      <View key={this.props} style={styles.container}>
        <Text
          style={{
            width: '80%',
            flexWrap: 'wrap',
            color: Colors.darkGray,
            fontSize: moderateScale(12),
            fontFamily: Fonts.ProductSans,
            textAlign: 'left',
          }}
          numberOfLines={1}>
          {this.props.value && this.props.value.value
            ? this.props.value.value
            : this.props.label}
        </Text>
        <AntDesign name="caretdown" size={15} style={styles.Icon} />
      </View>
    );
  }

  /**
   * Dropdown for web
   */
  dropDownForWeb() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={() => this.props.onDropDownPress()}>
        <Picker
          //selectedValue={this.props.value}
          style={this.state.focused ? styles.focusedLabel : styles.bluredLabel}
          mode="dropdown"
          onFocus={() => this._handleOnFocus()}
          onBlur={() => this._handleOnBlur()}
          onValueChange={(itemValue, index) =>
            this.onValueChange(itemValue, index)
          }>
          {this.props.data.length == 0 ? (
            <Picker.Item label={this.props.label} value={this.props.label} />
          ) : (
            this.props.data.map((item, index) => {
              return (
                <Picker.Item
                  color={
                    this.state.focused ? Colors.strongBlue : Colors.darkGray
                  }
                  label={item.value}
                  value={item.value}
                  key={index}
                />
              );
            })
          )}
        </Picker>
        {this.props.error ? (
          <Text style={styles.inputErrorLabelStyle}>{this.props.error}</Text>
        ) : null}
      </TouchableOpacity>
    );
  }

  /**
   * Dropdown for native
   */
  dropDownForNative() {
    return (
      <View style={this.props.style}>
        <Dropdown
          key={this.props}
          onFocus={() => this.props.onDropDownPress()}
          containerStyle={{
            width: '100%',
            marginBottom: 0,
          }}
          renderBase={() => this.renderBase()}
          rippleInsets={{top: 0, bottom: 0, left: 0, right: 0}}
          labelHeight={32}
          label={this.props.label}
          data={
            this.props.data.length == 0
              ? this.getInitialData()
              : this.props.data
          }
          onChangeText={(value, index) => this.onValueChange(value, index)}
        />
        {this.props.error ? (
          <Text style={styles.inputErrorLabelStyle}>{this.props.error}</Text>
        ) : null}
      </View>
    );
  }

  render() {
    if (Platform.OS == 'web') {
      return this.dropDownForWeb();
    } else {
      return this.dropDownForNative();
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
    borderBottomWidth: moderateScale(1),
    borderColor: Colors.darkGray,
    marginBottom: moderateScale(15),
  },
  focusedLabel: {
    width: '100%',
    color: Colors.strongBlue,
    paddingBottom: moderateScale(3),
    marginBottom: moderateScale(15),
    borderTopWidth: moderateScale(0),
    borderLeftWidth: moderateScale(0),
    borderRightWidth: moderateScale(0),
    borderBottomColor: Colors.strongBlue,
  },
  bluredLabel: {
    width: '100%',
    color: Colors.extraDarkGray,
    paddingBottom: moderateScale(3),
    marginBottom: moderateScale(15),
    borderTopWidth: moderateScale(0),
    borderLeftWidth: moderateScale(0),
    borderRightWidth: moderateScale(0),
  },
  borderContainerFocus: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.strongBlue,
  },
  inputErrorLabelStyle: {
    color: 'red',
    fontSize: moderateScale(12),
    textAlignVertical: 'top',
  },
  Icon: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    color: Colors.darkGray,
  },
});
