// MyBroadcastReceiver.js
import { NativeModules, NativeEventEmitter } from 'react-native';

const { MyBroadcastReceiver } = NativeModules;

const MyBroadcastReceiverEmitter = new NativeEventEmitter(MyBroadcastReceiver);

const MyBroadcastReceiverSubscription = MyBroadcastReceiverEmitter.addListener(
  'onBootCompleted',
  () => {
    console.log('Device has completed booting');
    // Add your logic here to handle the event
  }
);

export default MyBroadcastReceiverSubscription;
