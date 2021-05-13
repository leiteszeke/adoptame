import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { typography } from './src/helpers/typography';

typography();

AppRegistry.registerComponent(appName, () => App);
