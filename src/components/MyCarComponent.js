import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import bgImg from '../assets/creditcard.png';

export default function MyCarComponent(props) {
    return (
        <Card style={{borderRadius:10}} avatarSource={{uri: 'https://cutt.ly/dclKbMJ'}} >
            {/* <CardImage
                source={require('../assets/creditcard.png')}
                title="Your Balance: Rs. 2500.00"
                resizeMode="stretch"
                style={{borderRadius:10, backgroundColor: "white"}}
            /> */}
            <CardTitle
                title = {props.vehicle.make}
                subtitle= {props.vehicle.model}
            />
            <CardContent text="No upcomming reminders" />
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => { props.navigation.navigate("Add Service")}}
                    title="Add Service"
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => { }}
                    title="View"
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => {}}
                    title="Remove"
                    color="#FEB557"
                />
            </CardAction>
        </Card>
    )
}