import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import bgImg from '../assets/creditcard.png';

export default function MyCarComponent(props) {
    const handleRemoveVehicle = async (vehicleReg) => {
        let removed = await props.removeVehicle(vehicleReg)
        if(removed){
            Alert.alert(
                "Successfully Removed",
                `Vehicle ${vehicleReg} was removed successfully`,
                [
                  { text: "Ok", style: "ok"}
                ]
              );
        }else{
            Alert.alert(
                "Sorry, error occured",
                `Please try again`,
                [
                  { text: "Ok", style: "ok"}
                ]
              );
        }
    }

    const createConfirmationDialog = (vehicleReg) =>
    Alert.alert(
      "Are you sure?",
      `You requested to remove vehicle ${vehicleReg}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => {handleRemoveVehicle(vehicleReg)}}
      ]
    );
    return (
        <Card style={{borderRadius:10}} avatarSource={{uri: 'https://cutt.ly/dclKbMJ'}} >
            {/* <CardImage
                source={require('../assets/creditcard.png')}
                title="Your Balance: Rs. 2500.00"
                resizeMode="stretch"
                style={{borderRadius:10, backgroundColor: "white"}}
            /> */}
            <CardTitle
                title = {`${props.vehicle.make} ${props.vehicle.model} ${props.vehicle.manufactureYear}`}
                subtitle= {props.vehicle.regNumber}
            />
            {/* <CardContent text="No upcomming reminders" /> */}
            <CardAction
                separator={true}
                inColumn={false}>
                {/* <CardButton
                    onPress={() => { props.navigation.navigate("Add Service")}}
                    title="Add Service"
                    color="#FEB557"
                /> */}
                <CardButton
                    onPress={() => { }}
                    title="View"
                    onPress={() => { props.navigation.navigate("View History", {regNumber: props.vehicle.regNumber})}}
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => {createConfirmationDialog(props.vehicle.regNumber)}}
                    title="Remove"
                    color="#FEB557"
                />
            </CardAction>
        </Card>
    )
}