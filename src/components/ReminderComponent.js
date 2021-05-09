import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import bgImg from '../assets/creditcard.png';

export default function ReminderComponent(props) {
    return (
        <Card style={{borderRadius:10}} avatarSource={{uri: 'https://cutt.ly/dclKbMJ'}} >
            {/* <CardImage
                source={require('../assets/creditcard.png')}
                title="Your Balance: Rs. 2500.00"
                resizeMode="stretch"
                style={{borderRadius:10, backgroundColor: "white"}}
            /> */}
            <CardTitle
                title = {props.reminder.type}
                subtitle= {props.reminder.milage}
            />
            <CardContent text={props.reminder.due} />
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    // onPress={() => { props.navigation.navigate("Add Service")}}
                    onPress={() => "Ingore Pressed"}
                    title="Ignore"
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => { }}
                    title="Mark as Done"
                    color="green"
                />

            </CardAction>
        </Card>
    )
}