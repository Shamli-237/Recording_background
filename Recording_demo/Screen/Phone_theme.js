import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import BackgroundTask from 'react-native-background-task';

BackgroundTask.define(async () => {
  // Your background task logic here
  // This will run every time the task is triggered

  // For example, show an alert (though not recommended for background tasks)
  Alert.alert('Background Task', 'This is running in the background!');
});

const App = () => {
  useEffect(() => {
    const startBackgroundTask = async () => {
      // Register the background task
      await BackgroundTask.schedule({
        period: 3600, // Run every hour (in seconds)
      });
    };

    startBackgroundTask();

    return () => {
      // Unregister the background task when component unmounts
      BackgroundTask.cancel();
    };
  }, []);

  return (
    <View>
      <Text>fdg</Text>
    </View>
  );
};

export default App;
