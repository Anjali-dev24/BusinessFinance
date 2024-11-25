import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import {createBrowserApp} from '@react-navigation/web';
import CreateBubble from '../screens/createBubble';
import BubbleKey from '../screens/bubbleKey';

const isWeb = Platform.OS === 'web';

const Home = createStackNavigator(
  {
    CreateBubble: CreateBubble,
    BubbleKey: BubbleKey,
  },
  {
    navigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleContainerStyle: {
        justifyContent: 'center',
      },
    },
  },
);

const Container = isWeb ? createBrowserApp(Home) : createAppContainer(Home);

export default Container;
