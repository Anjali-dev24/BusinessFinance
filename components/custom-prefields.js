import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../styles/colors';

export default class CustomPrefields extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.preFieldLogin}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => this.props.onPress()}>
          {this.props.checked ? (
            <FontAwesome
              name="check-square"
              color={Colors.strongBlue}
              size={moderateScale(15)}
            />
          ) : (
            <FontAwesome
              name="square-o"
              color={Colors.darkGray}
              size={moderateScale(15)}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  preFieldLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(100),
    margin: moderateScale(4),
    marginLeft: 0,
  },
  text: {
    fontSize: moderateScale(12),
    // marginLeft: moderateScale(5),
    width: moderateScale(75),
    color: Colors.black,
  },
  iconContainer: {
    width: moderateScale(25),
  },
});
