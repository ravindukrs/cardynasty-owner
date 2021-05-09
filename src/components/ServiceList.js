import React, { useEffect } from 'react';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { View, Text, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select'

const items = [{
    id: '1',
    name: 'Air Condition'
}, {
    id: '2',
    name: 'Air Filter'
}, {
    id: '3',
    name: 'Battery'
}, {
    id: '4',
    name: 'Belts'
}, {
    id: '5',
    name: 'Body/Chassis'
}, {
    id: '6',
    name: 'Brake Fluid'
}, {
    id: '7',
    name: 'Brake Pad'
}, {
    id: '8',
    name: 'Brake Replacement'
}, {
    id: '9',
    name: 'Cabin Air Filter'
}]


export default function ServiceList({ selectedItems, ...rest }) {

    return (
        <View style={styles.multiSelectContainer}>
            <MultiSelect
                styleMainWrapper={{ marginTop: 20, alignSelf: "center", width: windowWidth, paddingHorizontal: 12 }}
                items={items}
                uniqueKey='id'
                selectedItems={selectedItems}
                selectText='Select Service Catagories'
                searchInputPlaceholderText='Search Services...'
                onChangeInput={(text) => console.warn(text)}
                tagRemoveIconColor='#CCC'
                tagBorderColor='#CCC'
                tagTextColor='#CCC'
                selectedItemTextColor='#CCC'
                selectedItemIconColor='#CCC'
                itemTextColor='#000'
                displayKey='name'
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor='#CCC'
                submitButtonText='Submit'
                removeSelected
                {...rest}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    multiSelectContainer: {
        //height: 200,
        width: '80%'
    }
});