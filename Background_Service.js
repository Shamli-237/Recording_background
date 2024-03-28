import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';


var i;
const createchannel = async () => {
    const channelConfig = {
        id: 'channelId',
        name: 'Channel name',
        description: 'Channel description',
        enableVibration: false
    };
    await VIForegroundService.getInstance().createNotificationChannel(channelConfig);
}
const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 5000,
    },
};

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const Background_Service = () => {

    useEffect(() => {
        createchannel()
    }, [])





    const startforegroundservice = async () => {

        const notificationConfig = {
            channelId: 'channelId',
            id: 3456,
            title: 'Title',
            text: 'Some text',
            icon: 'ic_icon',
            button: 'Some text',
        };
        try {
            await VIForegroundService.getInstance().startService(notificationConfig);
        } catch (e) {
            console.error(e);
        }

    }


    const stopforegroundservice = async () => {
        await VIForegroundService.getInstance().stopService();
    }
    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for ( i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description'+i }); // Only Android, iOS will ignore this call

                await sleep(delay);
            }
        });
    };

    const startbackgroundservice = async () => {
        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description'+i }); // Only Android, iOS will ignore this call


    }

    const stopbackgroundservice = async () => {

        await BackgroundService.stop();
    }

    return (
        <View>
            <View style={{ marginBottom: 20 }}>
                <View style={{ margin: 10 }}>
                    <Button title='start foreground service' color={'red'} onPress={() => startforegroundservice()} />
                </View>

                <View style={{ margin: 10 }}>
                    <Button title='stop foreground service' color={'green'} onPress={() => stopforegroundservice()} />
                </View>

            </View>
            <View style={{ margin: 10 }}>
                <Button title='start Background service' color={'red'} onPress={() => startbackgroundservice()} />
            </View>

            <View style={{ margin: 10 }}>
                <Button title='stop Background service' color={'green'} onPress={() => stopbackgroundservice()} />
            </View>

        </View>

    )
}

export default Background_Service;