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
import MyCarComponent from '../components/MyCarComponent'
import AddVehicleScreen from '../screens/AddVehicleScreen'




export default function MyVehicleScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);
    const [ myVehicles, setMyVehicles ] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getMyVehicles(user.uid, setMyVehicles);
                console.log("Outcome:", myVehicles)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>My Vehicles</Text>
                {/* <MyCarComponent vehicle={{ make: "Honda", model: "Civic EX 2017" }} navigation={navigation} />
                <MyCarComponent vehicle={{ make: "Toyota", model: "Camry 2021" }} navigation={navigation} /> */}
                {/* <MyCarComponent vehicle={{ make: myVehicles[0].make, model: myVehicles[0].model }} navigation={navigation} /> */}

                {myVehicles ? (
                   myVehicles.map(vehicle => {
                       return(
                        <MyCarComponent key={vehicle.vin} vehicle={{ make: vehicle.make, model: vehicle.model, regNumber: vehicle.regNumber }} navigation={navigation} />
                       )
                    })
                    
                ) : null}

                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Add Vehicle"
                    onPress={() => navigation.navigate('AddVehicle')}

                />
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