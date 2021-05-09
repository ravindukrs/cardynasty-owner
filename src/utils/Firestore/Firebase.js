import firestore from '@react-native-firebase/firestore';

const Firebase = {

    createNewUser: (userData) => {
        return firestore().collection('users').doc(`${userData.uid}`).set(userData)
    },
    addNewService: (serviceData) => {
        console.log(serviceData);
        console.log("Inside Sub R");
        return firestore().collection('vehicles').doc(`${serviceData.regNumber}`).collection('services').doc(`${serviceData.serviceDate}-${serviceData.entryDate}`).set(serviceData)
    },
    addNewVehicle: (payload) => {
        return firestore().collection('vehicles').doc(`${payload.regNumber}`).set(payload, { merge: true }).then(() => {
            return true;
        }).catch((error) => {
            console.log("Error updating document: ", error);
        })
    },

    getMyVehicles: (uid, setMyVehicles) => {
        return firestore().collection('vehicles').where("owner", "==", uid).onSnapshot((querySnapshot) => {
            let vehicles = []
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    vehicles.push(doc.data());
                }
            });
            console.log("Setting Vehicles")
            console.log(vehicles)
            setMyVehicles(vehicles)
        }).catch((error) => {
            console.log("Error querying document: ", error);
            return null
        });
    },

    getPendingServices: (uid, regNumber, setPendingServices) => {
        return firestore().collection('vehicles').doc(regNumber).collection('services').where("approved", "==", false).onSnapshot((querySnapshot) => {
            let pendingServices = []
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    let id = doc.id;
                    pendingServices.push({id, ...doc.data()});
                }
            });
            console.log("Setting Pending Services")
            console.log(pendingServices)
            setPendingServices(pendingServices)
            console.log("Completed Setting")
        }).catch((error) => {
            console.log("Error querying document: ", error);
            return null
        });
    },

    getApprovedServices: (uid, regNumber, setApprovedServices) => {
        return firestore().collection('vehicles').doc(regNumber).collection('services').where("approved", "==", "accepted").onSnapshot((querySnapshot) => {
            let approvedServices = []
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    let id = doc.id;
                    approvedServices.push({id, ...doc.data()});
                }
            });
            setApprovedServices(approvedServices)
        }).catch((error) => {
            console.log("Error querying document: ", error);
            return null
        });
    },

    //Get Constants
    getServiceTypes: () => {
        return firestore().collection('constants').doc('service-types').get().then((doc) => {
            if (doc.exists) {
                return doc.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    },

    updateNotificationStatus: (regNumber, serviceId, state) => {
        return firestore().collection('vehicles').doc(regNumber).collection('services').doc(serviceId).set(state, { merge: true }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.log("Error updating document: ", error);
        })
    }


}

export default Firebase;