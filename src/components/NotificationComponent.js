import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import bgImg from '../assets/creditcard.png';

export default function NotificationComponent(props) {
    return (
        <Card style={{borderRadius:10}} avatarSource={{uri: 'https://i.ibb.co/K6xPM7K/check.png'}} >
            {/* <CardImage
                source={require('../assets/creditcard.png')}
                title="Your Balance: Rs. 2500.00"
                resizeMode="stretch"
                style={{borderRadius:10, backgroundColor: "white"}}
            /> */}
            <CardTitle
                title = {props.notification.type}
                subtitle= {props.notification.description}
            />
            <CardContent text={props.notification.workdone} />
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => { props.action.onDeclinePress(props.notification.serviceId, props.notification.regNumber)}}
                    title="Decline"
                    color="red"
                />
                <CardButton
                    onPress={() => { props.action.onAcceptPress(props.notification.serviceId, props.notification.regNumber)}}
                    title="Accept"
                    color="green"
                />

            </CardAction>
        </Card>
    )
}