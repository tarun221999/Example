import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon library you prefer
import { colors, fontNames, sizes } from '../config/constants';

const CustomDropDown = (props: any) => {
    const { placeholder, value, onChangeText, secureTextEntry, label } = props
    const [selectedItem, setSelectedItem] = useState('1998');

    const data = [
        { label: '1998', value: '1998', },
        { label: '1999', value: '1999', },
        // Add more options as needed
    ];

    return (
        <View style={styles.inputSpace}>
            <Text style={styles.label}>{label}</Text>
            <SelectDropdown
            data={data}
            defaultValue={value}
            onSelect={(selectedItem, index) => {
                onChangeText(selectedItem.value);
            }}
            defaultButtonText={placeholder}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.value;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
    );
};

export default CustomDropDown;

const styles = StyleSheet.create({
    inputSpace: {
        marginBottom: 20
    },
    dropDownStyle: {
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: sizes.cardBorderRadius,
        paddingVertical: sizes.paddingVertical,
        paddingHorizontal: sizes.paddingHorizontal,
        backgroundColor: colors.lightBackground,
        color: colors.primaryTextColor,
        fontSize: sizes.largeTextSize,
        fontFamily: fontNames.regularFont,
    },
    label: {
        fontSize: sizes.normalTextSize,
        fontWeight: '400',
        marginBottom: 10,
        color: colors.secTextColor,
        fontFamily: fontNames.regularFont
    },
    dropdown1BtnStyle: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: sizes.cardBorderRadius,
        paddingVertical: sizes.paddingVertical,
        backgroundColor: colors.lightBackground,
        
      },
      dropdown1BtnTxtStyle: {
        color: colors.primaryTextColor,
        fontSize: sizes.largeTextSize,
        fontFamily: fontNames.regularFont,
        textAlign: 'left'
    },
      dropdown1DropdownStyle: {
        backgroundColor: colors.lightBackground,
        borderRadius: 12,
        paddingHorizontal: 20
    },
      dropdown1RowStyle: {
        backgroundColor: colors.lightBackground,
        borderBottomColor: colors.darkBorderColor,
    },
      dropdown1RowTxtStyle: {
        color: colors.primaryTextColor,
        fontSize: sizes.largeTextSize,
        fontFamily: fontNames.regularFont,
        textAlign: 'left'
    },
  
  });
