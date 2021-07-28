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
import Timeline from 'react-native-timeline-flatlist'




export default function RepairTimelineScreen({ navigation, route }) {

    const { user, logout } = useContext(AuthContext);
    const [regNumber, setRegNumber] = useState('');
    const [approvedServices, setApprovedServices] = useState(null)
    const [serviceList, setServiceList] = useState(null)
    const [data, setData] = useState(null)



    useEffect(() => {
        (async () => {
            try {
                await Firebase.getApprovedServices(user.uid, route.params.regNumber, setApprovedServices);
            } catch (error) {
                console.log("Error Occured")
                setApprovedServices(null)
                console.log(error);
            }
        })()
    }, [route.params.regNumber])

    useEffect(() => {
        (async () => {
            try {
                let serviceTypes = await Firebase.getServiceTypes();
                setServiceList(serviceTypes)
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [route.params.regNumber])


    useEffect(() => {
        (async () => {
            try {
                if(approvedServices && serviceList && approvedServices.length>0){
                    console.log(approvedServices)
                    let dataArray = []
                    approvedServices.forEach(service => {
                        let time = service.serviceDate;
    
                        let sentence = []
                        service.services.forEach(element => {
                            sentence.push(serviceList[element])
                        })
                        let title = service.description
                        dataArray.push({time:moment(time).format("YYYY-MM-DD"), title: title, description: sentence.toString()})
                    });

                    setData(dataArray)
                }
               

            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [approvedServices, serviceList])


    // const data = [
    //     {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    //     {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    //     {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    //     {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    //     {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    //   ]


    return (
       
           <>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Repair History for {route.params.regNumber}</Text>
           {data ? (<Timeline style={{marginTop: 20, paddingHorizontal:5}}
                data={data}
            />): <Text>Service records not available</Text>}
            
            </>
                

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