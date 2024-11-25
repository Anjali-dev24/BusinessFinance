import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

export default class BubbleKey extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.navigation.getParam('key', ''),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logoBlue.png')}
          resizeMode={'contain'}
          style={styles.imageLogo}
        />
        <Text style={styles.textStyle}>
          Wow! Your Bubble is now Ready and your Bubble Key is
        </Text>
        <Text style={styles.textStyle}>{this.state.key.toUpperCase()}</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.enterbubble.com/sdev/signin')
          }>
          <Text style={styles.loginText}>Click here to login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: moderateScale(15),
  },
  imageLogo: {
    height: moderateScale(150),
    width: moderateScale(200),
  },
  textStyle: {
    fontFamily: Fonts.ProductSans,
    color: Colors.strongBlue,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  loginText: {
    fontFamily: Fonts.ProductSans,
    color: Colors.strongBlue,
    fontSize: moderateScale(17),
    marginTop: moderateScale(10),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
