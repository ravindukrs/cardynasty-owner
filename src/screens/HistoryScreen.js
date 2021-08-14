import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button, ListItem, Icon } from 'react-native-elements';
import VehicleInfoBlackBar from '../components/VehicleInfoBlackBar';
import moment from 'moment';
import { FloatingAction } from "react-native-floating-action";



export default function HistoryScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    const [approvedServices, setApprovedServices] = useState(null)
    const [serviceList, setServiceList] = useState(null)
    const [history, setHistory] = useState(null)
    const [myVehicles, setMyVehicles] = useState(null)
    const [looper, setLooper] = useState(0)
    const [vehicleData, setVehicleData] = useState(null)
    const [lastService, setLastService] = useState(null)
    const [list, setList] = useState(null)
    const actions = [
        {
            text: "Sign Out",
            icon: <Icon
                name="arrow-right"
                size={15}
                color="white"
            />,
            name: "Sign Out",
            position: 1
        }
    ];


    const handleNext = () => {
        console.log("Handle Next Pressed ", looper)
        if (myVehicles) {
            let currentLoop = looper;
            if (currentLoop == (myVehicles.length - 1)) {
                currentLoop = 0;
            } else {
                currentLoop = currentLoop + 1
            }
            setLooper(currentLoop)
            console.log("currentLoop ", currentLoop)
        }
    }

    useEffect(() => {
        (async () => {
            if(myVehicles) {
                try {
                    let response = await fetch(
                      `https://us-central1-cardynasty-rs.cloudfunctions.net/app/vehicle?reg=${myVehicles[looper]}`
                    );
                    let json = await response.json();
                    console.log("Data from Fetch: ", json)
                    if(json.length == 0){
                        setVehicleData(null)
                    }else{
                        setVehicleData(json)
                    }
                    console.log(json);
                  } catch (error) {
                    console.error(error);
                  }
            }
        })()
    }, [user, myVehicles, looper])

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
                if (myVehicles) {
                    console.log("Current Reg Number: ", myVehicles[looper])
                    await Firebase.getApprovedServices(user.uid, myVehicles[looper], setApprovedServices);
                }
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [user, myVehicles, looper])

    useEffect(() => {
        (async () => {
            try {
                let serviceTypes = await Firebase.getServiceTypes();
                var result = Object.keys(serviceTypes).map((key) => serviceTypes[key]);
                setServiceList(result)
                console.log("service list: ", result)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])

    useEffect(() => {
        let historyList = []
        if (approvedServices && serviceList && approvedServices.length != 0) {
            approvedServices.forEach((service) => {
                let workDone = []
                if (service.services) {
                    service.services.forEach((index) => {
                        // workDone += serviceList[Number(index) + 1] += " | ";
                        workDone.push(serviceList[Number(index) + 1])
                    })
                }

                historyList.push(
                    {
                        title: workDone.toString(),
                        subtitle: `Serviced on ${service.entryDate} at Milage ${service.odometer} KM`,
                        icon: 'checkcircleo',
                        icontype: 'antdesign'
                    }
                )
                setHistory(historyList)
            })
        } else {
            console.log("History Set to Null")
            setHistory(null)
        }
    }, [approvedServices, serviceList])

    useEffect(() => {
        (async () => {
            try {
                if (myVehicles && serviceList && approvedServices) {
                   let lastServiceArray = []
                   let serviceNumbers = ["10", "3", "6", "12", "2"]
                   serviceNumbers.forEach((number) => {
                    var change = approvedServices.filter((service) => {
                        return service.services.includes(number)
                    })
                    if(change.length == 0){
                        lastServiceArray.push("No Record")
                    }else{
                        lastServiceArray.push(moment(change[0].serviceDate).format("YYYY-MM-DD"))
                    }
                   })
                   setLastService(lastServiceArray)

                }
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [user, myVehicles, looper, approvedServices])

    useEffect(() => {
        (async () => {
            try {
                if (lastService) {
                    setList(
                        [
                            {
                                title: 'Changed Oil',
                                subtitle: lastService[0],
                                icon: 'oil-can',
                                icontype: 'font-awesome-5'
                            },
                            {
                                title: 'Battery Check',
                                subtitle: lastService[1],
                                icon: 'car-wash',
                                icontype: 'material-community'
                            },
                            {
                                title: 'Break Work',
                                subtitle: lastService[2],
                                icon: 'steering',
                                icontype: 'material-community'
                            },
                            {
                                title: 'Fuel Filter Change',
                                subtitle: lastService[3],
                                icon: 'fuel',
                                icontype: 'material-community'
                            },
                            {
                                title: 'Air Filter',
                                subtitle: lastService[4],
                                icon: 'air',
                                icontype: 'entypo'
                            },
                        ]
                    )

                }
            } catch (error) {
                console.log("Error Occured")
                console.log(error);
            }
        })()
    }, [lastService])


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vehicle History</Text>
                {vehicleData ? 
                <VehicleInfoBlackBar vehicleData = {vehicleData} approvedServices = {approvedServices}
                    style={styles.vehicleInfoBlackBar}
                /> : <Text>Vehicle Data Not Available</Text>
                }
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
                    onPress={() => handleNext()}


                />

                <View style={{ marginTop: 20 }}>
                    {
                        list && list.map((item, i) => (
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
                ) :
                    <View style={{ marginTop: 20 }}>
                        <Text>No History available for this vehicle</Text>
                    </View>

                }
         

            </ScrollView>
            <FloatingAction
                        actions={actions}
                        color="purple"
                        onPressItem={name => {
                            console.log(`selected button: ${name}`);
                            logout()
                        }}
                    />
         
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