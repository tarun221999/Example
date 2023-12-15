import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontNames, sizes } from '../config/constants';

const CustomButton = (props: any) => {
    const { title, onPress, bgColor, textColor } = props
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonView, { backgroundColor: bgColor }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        marginTop: 30,
        paddingVertical: 11,
        paddingHorizontal: 16,
        borderRadius: sizes.cardBorderRadius,
        borderColor: colors.primaryColor,
        borderWidth: 1
    },
    buttonText: {
        fontSize: sizes.largeTextSize,
        fontWeight: '400',
        fontFamily: fontNames.regularFont,
        textAlign: 'center',
    }
});

export default CustomButton;
