import React, { useEffect } from "react";
import { View, Text, Button } from 'react-native';
import PushNotification from "react-native-push-notification";


const Demo_notificaton = () => {
    useEffect(() => {

        createChannels();
        // HandlePushNotification();
    })

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "channel-id", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },

        );

    }

    const HandlePushNotification = () => {
        console.log("Hello")
        PushNotification.localNotification({
            channelId: "channel-id",
            title: "HIHII",
            message: "sdfscdcd",

        });
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: "channel-id",
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 300 * 1000) // in 60 secs
          
          });
    }

    return (
        <View>
            <Text style={{ fontSize: 15 }}>
                Pushntification
            </Text>
            <Button title="click" onPress={() => HandlePushNotification()}></Button>

        </View>
    )
}

export default Demo_notificaton;