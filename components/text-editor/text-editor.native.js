import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import CNEditor, {
  CNToolbar,
  getDefaultStyles,
  getInitialObject,
} from 'react-native-cn-richtext-editor';
import {MaterialCommunityIcons, Octicons, Foundation} from '@expo/vector-icons';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../../styles/colors';

const defaultStyles = getDefaultStyles();

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.selectedstyles = [];

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      iconSet: this.getDefaultIconSet(),
      value: [getInitialObject()],
    };
    this.editor = null;
  }

  /**
   * Method called onStyleKeyPress.
   */
  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
    if (Platform.OS == 'web') {
      // this.updateSelectedStyle(toolType);
    }
  };

  /**
   * Method called when user updates style in web.
   */
  updateSelectedStyle(toolType) {
    if (toolType == 'body' || toolType == 'ul' || toolType == 'ol') {
      if (this.state.selectedTag == toolType) {
        this.onSelectedTagChanged('');
      } else {
        this.onSelectedTagChanged(toolType);
      }
    } else if (
      toolType == 'bold' ||
      toolType == 'italic' ||
      toolType == 'lineThrough' ||
      toolType == 'underline'
    ) {
      let index = this.selectedstyles.indexOf(toolType);
      if (index == -1) {
        this.selectedstyles.push(toolType);
      } else {
        this.selectedstyles.splice(index, 1);
      }
      let styles = this.selectedstyles.join(',');
      this.onSelectedStyleChanged(styles);
    }
  }

  /**
   * Method called onSelectedTagChanged
   */
  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag,
    });
  };

  /**
   * Method called onSelectedStyleChanged
   */
  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles,
    });
  };

  onValueChanged = value => {
    console.log('custom editor name value change');
    this.props.onValueChange(value);
    this.setState({
      value: value,
    });
  };

  /**
   * Returns default set of icons for text editor.
   */
  getDefaultIconSet() {
    return [
      {
        type: 'tool',
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'bold',
            buttonTypes: 'style',
            iconComponent: <Octicons name="bold" size={35} color={'green'} />,
          },
        ],
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'italic',
            buttonTypes: 'style',
            iconComponent: (
              <Octicons name="italic" size={35} color={Colors.black} />
            ),
          },
        ],
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'lineThrough',
            buttonTypes: 'style',
            iconComponent: (
              <Foundation name="strikethrough" size={35} color={Colors.black} />
            ),
          },
        ],
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'underline',
            buttonTypes: 'style',
            iconComponent: (
              <MaterialCommunityIcons
                name="format-underline"
                size={35}
                color={Colors.black}
              />
            ),
          },
        ],
      },
      {
        // type: 'seperator',
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'body',
            buttonTypes: 'tag',
            iconComponent: <Text style={styles.toolbarButton}>body</Text>,
          },
        ],
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'ul',
            buttonTypes: 'tag',
            iconComponent: (
              <Octicons name="list-unordered" size={35} color={Colors.black} />
            ),
          },
        ],
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'ol',
            buttonTypes: 'tag',
            iconComponent: (
              <Octicons name="list-ordered" size={35} color={Colors.black} />
            ),
          },
        ],
      },
    ];
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={0}
        style={{
          flexGrow: 1,
          backgroundColor: Colors.white,
          borderWidth: 3,
          borderRadius: moderateScale(8),
          borderColor: 'lightgray',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            minHeight: 35,
          }}>
          <CNToolbar
            style={{
              height: 40,
            }}
            iconSetContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size={30}
            iconSet={this.state.iconSet}
            selectedTag={this.state.selectedTag}
            selectedStyles={this.state.selectedStyles}
            onStyleKeyPress={this.onStyleKeyPress}
          />
        </View>
        <View
          style={{flexGrow: 1}}
          onTouchStart={() => {
            this.editor && this.editor.blur();
          }}>
          <View style={styles.main} onTouchStart={e => e.stopPropagation()}>
            <CNEditor
              ref={input => (this.editor = input)}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              style={{backgroundColor: '#fff'}}
              styleList={defaultStyles}
              initialHtml={``}
              class={'customeditor'}
              placeholder={''}
              value={this.state.value}
              onValueChanged={this.onValueChanged}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 1,
    alignItems: 'stretch',
  },
  toolbarButton: {
    fontSize: 15,
    textAlign: 'center',
  },
  italicButton: {
    fontStyle: 'italic',
  },
  boldButton: {
    fontWeight: 'bold',
  },
  underlineButton: {
    textDecorationLine: 'underline',
  },
  lineThroughButton: {
    textDecorationLine: 'line-through',
  },
});
