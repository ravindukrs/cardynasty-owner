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
import moment from 'moment';



export default function ServiceScreen() {

    const { user, logout } = useContext(AuthContext);
    const [date, setDate] = useState(moment().format())
    const [regNumber, setRegNumber] = useState('');
    const [odometer, setOdometer] = useState(5000);
    const [selectedItems, setSelectedItems] = useState([])
    const [description, setDescription] = useState('')



    onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems)
    }

    const validateData = () => {
        var error = null
        if (regNumber.length != 4) {
            error = "Registration Number is Invalid"
        }else if(selectedItems.length < 1){
            error = "Services not selected"
        }
        return error
    }

    const successAlert = (message, error) => {
        Alert.alert(
            error ? "Sorry, error occured." : "Record Added",
            error ? error : message,
            [
              {
                text: 'OK'
              },
            ],
            {cancelable: false},
          );
    }

    const resetComponentStates = () => {
       setDate(moment().format())
       setRegNumber('')
       setOdometer(5000)
       setSelectedItems([])
       setDescription('')
    }

    const onServiceSubmit = async() => {
        var error = validateData();
        if (!error){
            await Firebase.addNewService({
                regNumber,
                odometer,
                services:selectedItems, 
                serviceDate:date, 
                mechanic:user.uid, 
                entryDate:moment().format("YYYY-MM-DD"),
                description
            });
            successAlert("Your service record was added.", error);
        }else{
            successAlert(null, error)
        }
        resetComponentStates();
    }



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                <ConfirmationInput value={regNumber} setValue={setRegNumber} onChangeText={setRegNumber} />
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Service Date</Text>
                <CustomDatePicker date={date} onDateChange={(datum) => setDate(datum)} />
                <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}>Odometer</Text>
                <OdometerInput value={odometer} onChange={newValue => setOdometer(newValue)} />
                <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}>Services Done</Text>
                <ServiceList selectedItems={selectedItems} onSelectedItemsChange={onSelectedItemsChange} />
                <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}>Description</Text>
                <Input
                    placeholder="Description of Work Done"
                    numberOfLines={5}
                    onChangeText = {text => setDescription(text)}
                />
                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Submit"
                    onPress={()=>onServiceSubmit()}
                    
                />
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