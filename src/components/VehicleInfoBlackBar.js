import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function VehicleInfoBlackBar(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.vehicleIdVinRow}>
        <Text style={styles.vehicleIdVin}>VEHICLE ID (VIN)</Text>
        <Text style={styles.lisencePlate}>LISENCE PLATE #</Text>
      </View>
      <View style={styles.oilFilterRow}>
        <Text style={styles.oilFilter}>OIL FILTER</Text>
        <Text style={styles.tyreSize}>TYRE SIZE</Text>
      </View>
      <View style={styles.odometerRow}>
        <Text style={styles.odometer}>ODOMETER</Text>
        <Text style={styles.ytdCost}>COLOR</Text>
      </View>
      <View style={styles.vehicleIdVin1Row}>
        <Text style={styles.vehicleIdVin1}>{props.vehicleData[0].chassis}</Text>
        <View style={styles.tx1234Stack}>
          <Text style={styles.tx1234}>{props.vehicleData[0].id}</Text>
          <Text style={styles.tx12342}>{props.vehicleData[0].id}</Text>
        </View>
      </View>
      <View style={styles.hux123Row}>
        <Text style={styles.hux123}>HUX-123</Text>
        <Text style={styles.tx12343}>255/45/R17</Text>
      </View>
      <View style={styles.hux124Row}>
        {props.approvedServices && props.approvedServices.length != 0 ?
          <Text style={styles.hux124}>{props.approvedServices[props.approvedServices.length - 1].odometer} KM</Text> :
          <Text style={styles.hux124}>No Record</Text>
        }
        <Text style={styles.lkr15600}>{props.vehicleData[0].color}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,1)"
  },
  vehicleIdVin: {
    fontFamily: "roboto-700",
    color: "rgba(255,254,254,1)",
    width: 135,
    height: 16
  },
  lisencePlate: {
    fontFamily: "roboto-700",
    color: "rgba(255,254,254,1)",
    width: 135,
    height: 16,
    marginLeft: 63
  },
  vehicleIdVinRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 15,
    marginRight: 12
  },
  oilFilter: {
    fontFamily: "roboto-700",
    color: "rgba(255,254,254,1)",
    width: 82,
    height: 16
  },
  tyreSize: {
    fontFamily: "roboto-700",
    color: "rgba(255,254,254,1)",
    width: 81,
    height: 16,
    marginLeft: 116,
    marginTop: 1
  },
  oilFilterRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 28,
    marginLeft: 15,
    marginRight: 66
  },
  odometer: {
    fontFamily: "roboto-700",
    color: "rgba(255,254,254,1)",
    width: 89,
    height: 16
  },
  ytdCost: {
    fontFamily: "roboto-700",
    color: "rgba(255,254,254,1)",
    width: 80,
    height: 16,
    marginLeft: 109
  },
  odometerRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 26,
    marginLeft: 15,
    marginRight: 67
  },
  vehicleIdVin1: {
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 102,
    height: 14
  },
  tx1234: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 52,
    height: 14
  },
  tx12342: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 52,
    height: 14
  },
  tx1234Stack: {
    width: 52,
    height: 14,
    marginLeft: 96
  },
  vehicleIdVin1Row: {
    height: 14,
    flexDirection: "row",
    marginTop: -87,
    marginLeft: 15,
    marginRight: 95
  },
  hux123: {
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 55,
    height: 14
  },
  tx12343: {
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 75,
    height: 14,
    marginLeft: 143
  },
  hux123Row: {
    height: 14,
    flexDirection: "row",
    marginTop: 31,
    marginLeft: 15,
    marginRight: 72
  },
  hux124: {
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 60,
    height: 14
  },
  lkr15600: {
    fontFamily: "roboto-300italic",
    color: "rgba(255,254,254,1)",
    fontSize: 12,
    width: 68,
    height: 14,
    marginLeft: 138
  },
  hux124Row: {
    height: 14,
    flexDirection: "row",
    marginTop: 28,
    marginLeft: 15,
    marginRight: 79
  }
});

export default VehicleInfoBlackBar;