import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Colors from '../styles/colors';
import {moderateScale} from 'react-native-size-matters';

export default class CustomHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.text}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.brightBlue,
    width: '90%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },

  titleContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: moderateScale(10),
  },
  leftArrowIcon: {
    width: '10%',
  },
});
