import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import WebView from 'react-native-web-webview';

const scalesPageToFit = Platform.OS === 'web';

export default class TextEditor extends Component {
  _onMessage = e => {
    let data = e.nativeEvent.data;
    if (data.id == this.props.editorId) {
      this.props.onValueChange(data.html);
    }
  };

  render() {
    const {
      style = {height: '100%', width: '100%', backgroundColor: 'blue'},
    } = this.props;
    return (
      <WebView
        scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEnabled={false}
        ref={this._webViewRef}
        style={style}
        source={{
          uri: `https://www.enterbubble.com/sdev/ckeditor.php?id=${this.props.editorId}`,
        }}
        useWebKit={true}
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={['*']}
        onMessage={this._onMessage}
      />
    );
  }
}
const styles = StyleSheet.create({});
