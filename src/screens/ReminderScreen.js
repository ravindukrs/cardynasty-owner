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

import RNPickerSelect from 'react-native-picker-select';





export default function ReminderScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);
    const [myVehicles, setMyVehicles] = useState(null)
    const [selectionDropdown, setSelectionDropdown] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState()
    const [servicesWithDifference, setServicesWithDifference] = useState()
    const [serviceTypes, setServiceTypes] = useState()
    const [upcommingServices, setUpcommingServices] = useState()


    useEffect(() => {
        (async () => {
            try {
                let serviceList = await Firebase.getServiceTypes();
                console.log(serviceList)
                setServiceTypes(serviceList)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getMyVehicles(user.uid, setMyVehicles);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])

    useEffect(() => {
        (async () => {
            let vehicleLabelArray = []
            if (myVehicles && myVehicles.length>0) {
                myVehicles.forEach((vehicle) => {
                    vehicleLabelArray.push({
                        label: `${vehicle.regNumber} - ${vehicle.make} ${vehicle.model} ${vehicle.manufactureYear}`,
                        value: `${vehicle.regNumber}`
                    })
                })
                setSelectionDropdown(vehicleLabelArray)
            }
        })()
    }, [myVehicles])

    useEffect(() => {
        (async () => {
            console.log(selectedVehicle)
            await Firebase.getApprovedServicesAfterDate(user.uid, selectedVehicle, setServicesWithDifference);
        })()
    }, [selectedVehicle])

    useEffect(() => {
        (async () => {
            if(servicesWithDifference&&serviceTypes){
                console.log("Populated")
                let serviceNames = Object.values(serviceTypes)
                let lastService = Array(serviceNames.length).fill(100000)
                let lastServiceDate = Array(serviceNames.length).fill(null)
                let lastServiceOdometer = Array(serviceNames.length).fill(null)

                servicesWithDifference.forEach((entry) => {
                    // console.log(entry.services)
                    entry.services.forEach((serviceNumber) => {
                        if(lastService[Number(serviceNumber)-1] > entry.difference){
                            lastService[Number(serviceNumber)-1] = entry.difference
                            lastServiceDate[Number(serviceNumber)-1] = entry.serviceDate
                            lastServiceOdometer[Number(serviceNumber)-1] = entry.odometer
                        }
                    })
                })
                let servicesAndLastService = []
                for(let i=0; i<serviceNames.length; i++){
                    servicesAndLastService.push({
                        key: i+1,
                        serviceName: serviceNames[i],
                        serviceDaysAgo: lastService[i],
                        serviceDay: lastServiceDate[i],
                        serviceOdometer: lastServiceOdometer[i]
                    })
                }

                //Overdue Services
                var upcommingServices = servicesAndLastService.filter(function (el) {
                    return el.serviceDaysAgo >= 90
                  });
                console.log("See Me")
                console.log(upcommingServices)
                setUpcommingServices(upcommingServices)

            }else{
                setUpcommingServices(null)
            }

        })()
    }, [servicesWithDifference])



    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Upcomming Services</Text>

            <RNPickerSelect
                value={`${selectedVehicle}`}
                onValueChange={(value) => { setSelectedVehicle(value) }}
                items={selectionDropdown}
                placeholder={{}}
            />
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center", width: "100%" }}>

                {/* <RNPickerSelect
                    value={bank}
                    onValueChange={(value) => { setBank(value) }}
                    items={bankList}
                /> */}
                {
                    upcommingServices? ( 
                        
                        upcommingServices.map(upcomming => {
                            return(
                                <ReminderComponent key={upcomming.key} reminder={{ type: upcomming.serviceName, milage: `${upcomming.serviceDaysAgo>=100000? `Never Serviced`:`Last Service ${Math.floor(upcomming.serviceDaysAgo)} days ago`}`, due: `${upcomming.serviceOdometer?`Last Service Odometer: ${upcomming.serviceOdometer} KM on ${upcomming.serviceDay}`: ""}` }} navigation={navigation} />
                                )
                         })

                    ) :  <Text>No Upcomming Services for this vehicle</Text>
                }

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