import Reactotron from 'reactotron-react-native';
//import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.configure({
  host: '192.168.1.4',
  name: 'naturaltouchshop',
})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  /* .use(reactotronRedux()) */
  .connect();

export default reactotron;
