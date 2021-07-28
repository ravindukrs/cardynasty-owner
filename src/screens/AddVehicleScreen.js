import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
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
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import BalanceComponent from '../components/BalanceComponent';
import MyCarComponent from '../components/MyCarComponent'
import RNPickerSelect from 'react-native-picker-select';
import { ModelYearSelector } from '../components/CustomDatePicker'




export default function AddVehicleScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);
    const [regNumber, setRegNumber] = useState('');
    const [odometer, setOdometer] = useState(5000);
    const [vin, setVin] = useState('')
    const [manufactureYear, setManufactureYear] = useState(moment().format("YYYY"))
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [userData, setUserData] = useState(null)
    const [vehicleData, setVehicleData] = useState(null)

    const onAddVehicleSubmit = async () => {

        let result = await Firebase.addNewVehicle({
            regNumber,
            odometer,
            vin,
            owner: user.uid,
            manufactureYear: manufactureYear,
            make,
            model
        });
        if (result) {
            successAlert("Your service record was added.", null);
        } else {
            successAlert(null, "Error Occured")
        }
        resetComponentStates();
        navigation.goBack()
    }

    useEffect(() => {
        (async () => {
            await Firebase.getUserDetails(user.uid, setUserData);
        })()
    }, [user])

    const onCheckRegistration = async () => {
        if (regNumber.length >= 6) {
            try {
                let response = await fetch(
                    `https://us-central1-cardynasty-rs.cloudfunctions.net/app/vehiclereg?reg=${regNumber}&nic=${userData.nic}`
                );
                let json = await response.json();
                console.log("Data from Fetch: ", json)
                if (json.length == 0) {
                    console.log("Error", json)
                    setVehicleData(null)
                    failureAlart()
                } else {
                    console.log("Success", json)
                    setVehicleData(json)
                    setComponentStates(json[0])
                }
                console.log(json);
            } catch (error) {
                console.error(error);
            }
        } else {
            failureAlart()
        }
    }

    const successAlert = (message, error) => {
        Alert.alert(
            error ? "Sorry, error occured." : "Vehicle Added",
            error ? error : message,
            [
                {
                    text: 'OK'
                },
            ],
            { cancelable: false },
        );
    }

    const failureAlart = () => {
        Alert.alert(
            "Invalid registration!",
            "Sorry, the vehicle either doesn't exists or doesn't belong to you",
            [
                {
                    text: 'OK'
                },
            ],
            { cancelable: false },
        );
    }

    const resetComponentStates = () => {
        setRegNumber('')
        setOdometer(5000)
        setVin('')
        setMake('')
        setModel('')
    }


    const setComponentStates = (data) => {
        setRegNumber(data.id)
        setOdometer(5000)
        setVin(data.chassis)
        setMake(data.make)
        setModel(data.model)
        setManufactureYear(data.year)
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Add Vehicle Screen</Text>
                <ConfirmationInput value={regNumber} setValue={setRegNumber} onChangeText={setRegNumber} />
                {vehicleData ? (
                    <>
                        <ModelYearSelector date={manufactureYear} onDateChange={(datum) => setManufactureYear(datum)} />
                        <Input
                            placeholder="VIN"
                            onChangeText={(value) => setVin(value)}
                            containerStyle={{ width: "100%" }}
                            value={vin}
                        />

                        <Input
                            placeholder="Make"
                            onChangeText={(value) => setMake(value)}
                            containerStyle={{ width: "100%" }}
                            value={make}
                        />

                        <Input
                            placeholder="Model"
                            onChangeText={(value) => setModel(value)}
                            containerStyle={{ width: "100%" }}
                            value={model}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}>Odometer</Text>
                        <OdometerInput value={odometer} onChange={newValue => setOdometer(newValue)} />
                        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}></Text>
                        <Button
                            icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            }
                            title="Add Vehicle"
                            onPress={() => onAddVehicleSubmit()}

                        />

                        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}></Text>

                        <Button
                            icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            }
                            title={"Reset"}
                            onPress={() => setVehicleData(null)}

                        />
                    </>
                ) : null}
                
               {vehicleData == null ? (
                <>
                <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}></Text>
                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Check"
                    onPress={() => onCheckRegistration()}

                />
                </>
               ) : null}
                



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