import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { colors, sizes } from '../config/constants';
import CustomButton from '../components/CustomButton';
import CustomHeading from '../components/CustomHeading';
import CustomPara from '../components/CustomPara';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomTabView from '../components/CustomTabView';
import { getUser, storeUser } from '../utilities/helperFunctions';


const EditProfileScreen = () => {
    const navigation = useNavigation()
    const bottomSheetRef = useRef();
    
    const openBottomSheet = () => {
        bottomSheetRef.current.open();
    };

    const handleBack = () => {
        navigation.navigate('Profile')
    };

    const handleSave = () => {
        Alert.alert('Profile')
    }

    

    return (
        <SafeAreaView style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
                    <Icon name="close" size={24} color={colors.mediumBlue} />
                </TouchableOpacity>

                <View>
                    <CustomHeading
                        title={'Choose profile photo.'}
                    />
                    <CustomPara
                        textColor={colors.secTextColor}
                        paragraph={'Choose a profile photo from your library or select an avatar to add to your profile'}
                    />
                </View>
                <CustomTabView onPress={openBottomSheet} />
            </View>
            <CustomButton
                title="Save"
                onPress={handleSave}
                bgColor={colors.transparent}
                textColor={colors.primaryColor}
            />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,
    },
    closeButton: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center',
        backgroundColor: colors.lightblue,
        width: 44,
        height: 44,
        borderRadius: 200,
        marginBottom: 20
    },


});

export default EditProfileScreen;
