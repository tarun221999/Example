import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fontNames, sizes } from '../config/constants'

const CustomPara = (props: any) => {
    const { paragraph, textColor } = props
    return (
        <View style={styles.view}>
            <Text style={[styles.text, {color: textColor}]}>{paragraph}</Text>
        </View>
    )
}

export default CustomPara

const styles = StyleSheet.create({
    view: {

    },
    text: {
        fontSize: sizes.largeTextSize,
        fontWeight: '400',
        lineHeight: 27,
        fontFamily: fontNames.regularFont
    }
})