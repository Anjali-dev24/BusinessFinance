import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/colors';

export default class CustomCheckbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          checked={this.props.checked}
          containerStyle={styles.checkBox}
          onPress={() => this.props.onYesPress()}
          checkedIcon={
            <Image style={styles.Image} source={this.props.checkedIcon} />
          }
          checkedColor={Colors.verySoftBlue}
          uncheckedIcon={
            <Image style={styles.Image} source={this.props.uncheckedIcon} />
          }
          uncheckedColor={Colors.verySoftBlue}
        />
        <Text style={styles.yesText}>{this.props.yesText}</Text>
        <CheckBox
          checked={!this.props.checked}
          containerStyle={styles.checkBox}
          onPress={() => this.props.onNoPress()}
          checkedIcon={
            <Image style={styles.Image} source={this.props.checkedIcon} />
          }
          checkedColor={Colors.verySoftBlue}
          uncheckedIcon={
            <Image style={styles.Image} source={this.props.uncheckedIcon} />
          }
          uncheckedColor={Colors.verySoftBlue}
        />
        <Text style={styles.noText}>{this.props.noText}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(15),
  },
  checkBox: {
    padding: 0,
    marginHorizontal: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: moderateScale(2),
  },
  Image: {
    width: moderateScale(17),
    height: moderateScale(17),
  },
  yesText: {
    color: Colors.black,
    fontSize: moderateScale(11),
    marginRight: moderateScale(10),
  },
  noText: {
    color: Colors.black,
    fontSize: moderateScale(11),
    marginRight: moderateScale(10),
  },
});
