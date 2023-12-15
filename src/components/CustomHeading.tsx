import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fontNames, sizes } from '../config/constants'

const CustomHeading = (props: any) => {
    const { title, textColor } = props
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default CustomHeading

const styles = StyleSheet.create({
    view: {

    },
    text: {
        fontSize: sizes.headerTextSize,
        fontWeight: '500',
        lineHeight: 30,
        color:colors.primaryTextColor,
        fontFamily: fontNames.regularFont,
        marginBottom: 8
    }
})