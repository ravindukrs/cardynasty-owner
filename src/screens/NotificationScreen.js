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
import NotificationComponent from '../components/NotificationComponent'
import AddVehicleScreen from '../screens/AddVehicleScreen'




export default function NotificationScreen({navigation}) {

    const { user, logout } = useContext(AuthContext);
    const [pendingServices, setPendingServices] = useState(null)
    const [serviceList, setServiceList] = useState(null)
    const [myVehicles, setMyVehicles] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getMyVehiclesRegistrations(user.uid, setMyVehicles);
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [user])

    useEffect(() => {
        (async () => {
            try {
                myVehicles?
                await Firebase.getPendingServices(user.uid, myVehicles, setPendingServices)
                :setPendingServices(null);
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [user, myVehicles])


    useEffect(() => {
        (async () => {
            try {
                let serviceTypes = await Firebase.getServiceTypes();
                var result = Object.keys(serviceTypes).map((key) => serviceTypes[key]);
                setServiceList(result)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])

    const onDeclinePress = async (entryKey, regNumber) => {
        await Firebase.updateNotificationStatus(regNumber, entryKey, {approved: "declined"})
        console.log("Declined")

    }

    const onAcceptPress = async (entryKey, regNumber) => {
        await Firebase.updateNotificationStatus(regNumber, entryKey, {approved: "accepted"})
        console.log("Approved")
    }


    return (
        <View style={styles.container}>
           
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Pending Approvals</Text>
                
                {pendingServices && serviceList ? (
                 pendingServices.map(service => {
                    console.log("Service ID: ", service.id)
                    let workDone = ""
                    console.log("Services Listed: ",service.services)
                    if(service.services){
                        service.services.forEach((index) => {
                            workDone += serviceList[Number(index)+1];
                        })
                    }else{
                        workDone = "Updating"
                    }
                    
                

                    return(
                     <NotificationComponent 
                        key={service.id} 
                        notification={
                            {
                                type:service.description, 
                                description:`Service Date ${service.entryDate}`, 
                                workdone: `Work Done: ${workDone}`,
                                serviceId: service.id,
                                regNumber: service.regNumber
                            }
                        }     
                        navigation={navigation}
                        action = {
                            {
                            onAcceptPress,
                            onDeclinePress
                            }
                        }
                    />
                    )
                 })
                ): null}
                
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