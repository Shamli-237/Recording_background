import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import  VIForegroundService from '@voximplant/react-native-foreground-service';

var i;


const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
        delay: 1800000,
    },
};

export default class Recording extends React.Component {
    constructor  (props) {
        super(props);
        this.state={

        }
        this.createChannel();


    }

    createChannel =  async ()=> {
        const channelConfig = {
            id: 'channelId',
            name: 'Channel name',
            description: 'Channel description',
            enableVibration: false
        };
        await VIForegroundService.getInstance().createNotificationChannel(channelConfig);


    }
    startForegroundservice = async  () => {
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
    stopForegroundservice =  async () => {
        await VIForegroundService.getInstance().stopService();
    }


    veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description: '+i });
                await sleep(delay);
            }
        });
    };

    startBackgroundservice = async () => {
        await BackgroundService.start(this.veryIntensiveTask(), options); // Pass the function without calling it
        await BackgroundService.updateNotification({ taskDesc: 'Counter: '+i });
    }

    stopBackgroundservice = async () => {
        await BackgroundService.stop();
    }

    render() {
        return (
            <View style={{}}>
                <Text style={{fontSize: 18, justifyContent: 'center', alignSelf: 'center' }}>Background  Action</Text>
                <TouchableOpacity style={{ alignItems:'center', borderRadius:10, borderWidth:1, backgroundColor:'red', margin:10, alignContent:'center', alignSelf:'center', padding:10, width:'80%' }}
                                  onPress={() => this.startForegroundservice()}>
                    <Text style={{ fontSize:20, color:'white', fontWeight:'bold', alignItems:'center', alignSelf:'center' }}>start Forground service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems:'center', borderRadius:10, borderWidth:1, backgroundColor:'green', margin:10, alignContent:'center', alignSelf:'center', padding:10, width:'80%' }}
                                  onPress={() => this.stopForegroundservice()}>
                    <Text style={{ fontSize:20, color:'white', fontWeight:'bold', alignItems:'center', alignSelf:'center' }}>stop Forground service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems:'center', borderRadius:10, borderWidth:1, backgroundColor:'red', margin:10, alignContent:'center', alignSelf:'center', padding:10, width:'80%' }}
                                  onPress={() => this.startBackgroundservice()}>
                    <Text style={{ fontSize:20, color:'white', fontWeight:'bold', alignItems:'center', alignSelf:'center' }}>start Background service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems:'center', borderRadius:10, borderWidth:1, backgroundColor:'green', margin:10, alignContent:'center', alignSelf:'center', padding:10, width:'80%' }}
                                  onPress={() => this.stopBackgroundservice()}>
                    <Text style={{ fontSize:20, color:'white', fontWeight:'bold', alignItems:'center', alignSelf:'center' }}>stop Background service</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
