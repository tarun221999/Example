// CustomTextInput.js

import React from 'react';
import { TextInput, StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, fontNames, sizes } from '../config/constants';

const CustomTextInput = (props: any) => {
    const { placeholder, value, onChangeText, secureTextEntry, label } = props

    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <View style={styles.inputSpace}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                placeholderTextColor={colors.secTextColor}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputSpace: {
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: sizes.cardBorderRadius,
        paddingVertical: sizes.paddingVertical,
        paddingHorizontal: sizes.paddingHorizontal,
        backgroundColor: colors.lightBackground,
        color: colors.primaryTextColor,
        fontSize: sizes.largeTextSize,
        fontFamily: fontNames.regularFont,
        textDecorationLine: 'none'
    },
    label: {
        fontSize: sizes.normalTextSize,
        fontWeight: '400',
        marginBottom: 10,
        color: colors.secTextColor,
        fontFamily: fontNames.regularFont
    },
});

export default CustomTextInput;
