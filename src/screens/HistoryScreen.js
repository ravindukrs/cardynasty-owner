import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button, ListItem, Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
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
import VehicleInfoBlackBar from '../components/VehicleInfoBlackBar';




export default function HistoryScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    const [approvedServices, setApprovedServices] = useState(null)
    const [serviceList, setServiceList] = useState(null)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getApprovedServices(user.uid, "KA2134", setApprovedServices);
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [user])

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

    useEffect(() => {
        let historyList = []
        if (approvedServices && serviceList) {
            approvedServices.forEach((service) => {
                let workDone = ""
                service.services.forEach((index) => {
                    workDone += serviceList[Number(index) + 1] += " | ";
                })

                historyList.push(
                    {
                        title: workDone,
                        subtitle: `Serviced on ${service.entryDate} at Milage ${service.odometer} KM`,
                        icon: 'checkcircleo',
                        icontype: 'antdesign'
                    }
                )
                setHistory(historyList)
            })
        }
    }, [approvedServices, serviceList])

    useEffect(() => {
        console.log("Approved Services are: ", approvedServices)
    }, [approvedServices, serviceList])

    const list = [
        {
            title: 'Changed Oil',
            subtitle: 'Nov / 2020',
            icon: 'oil-can',
            icontype: 'font-awesome-5'
        },
        {
            title: 'Body Wash',
            subtitle: 'Aug / 2020',
            icon: 'car-wash',
            icontype: 'material-community'
        },
        {
            title: 'Wheel Alignment',
            subtitle: 'July / 2020',
            icon: 'steering',
            icontype: 'material-community'
        },
        {
            title: 'Fuel Filter Change',
            subtitle: 'June / 2020',
            icon: 'fuel',
            icontype: 'material-community'
        },
        {
            title: 'Air Filter',
            subtitle: 'May / 2020',
            icon: 'air',
            icontype: 'entypo'
        },
    ]


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vehicle History</Text>
                <VehicleInfoBlackBar
                    style={styles.vehicleInfoBlackBar}
                />
                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Next Vehicle"
                // onPress={()=>navigation.navigate('AddVehicle')}

                />

                <View style={{ marginTop: 20 }}>
                    {
                        list.map((item, i) => (
                            <ListItem key={i} bottomDivider>
                                <Icon name={item.icon} type={item.icontype} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.title}</ListItem.Title>
                                    <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </View>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Past Services</Text>
                {history ? (
                    <View style={{ marginTop: 20 }}>
                        {
                            history.map((item, i) => (
                                <ListItem key={i} bottomDivider>
                                    <Icon name={item.icon} type={item.icontype} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        }
                    </View>
                ) : null}

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    vehicleInfoBlackBar: {
        height: 145,
        marginVertical: 5,
        width: Dimensions.get('window').width
    }
});