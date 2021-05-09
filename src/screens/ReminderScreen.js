import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, ListItem } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import ConfirmationInput from '../components/ConfirmationInput';
import OdometerInput from '../components/OdometerInput';
import ServiceList from '../components/ServiceList';
import { LineChartComponent } from '../components/ChartComponent';
import { PieChartComponent } from '../components/ChartComponent'
import { ProgressChartComponent } from '../components/ChartComponent'

import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import BalanceComponent from '../components/BalanceComponent';
import ReminderComponent from '../components/ReminderComponent'
import AddVehicleScreen from '../screens/AddVehicleScreen'




export default function ReminderScreen({navigation}) {

    const { user, logout } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Upcomming Services</Text>
                <ReminderComponent reminder={{type:"Car Cleaning", milage:"1000KM - 1 month", due: "Overdue (12 days)"}} navigation={navigation}/>
                <ReminderComponent reminder={{type:"Brake Fluid", milage:"3000KM - 3 month", due: "Due 12/12/2020"}} navigation={navigation}/>
                <ReminderComponent reminder={{type:"Engine Oil", milage:"5000KM - 5 month", due: "Due 12/01/2021"}} navigation={navigation}/>
                {/* <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Add Vehicle"
                    onPress={()=>navigation.navigate('AddVehicle')}
                    
                /> */}
                {/* <ProgressChartComponent/>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Your Week's Earnings</Text>
                <LineChartComponent />
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Service Breakdown</Text>
                <PieChartComponent /> */}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});