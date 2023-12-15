import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomHeading from './CustomHeading';
import CustomPara from './CustomPara';
import { colors, fontNames, sizes } from '../config/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBottomSheet = (props: any) => {
    const { bottomSheetRef, openCamera, openImagePicker, removeImage } = props
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    return (
        <View>
            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown
                closeOnPressMask
                customStyles={{
                    container: styles.container,
                    draggableIcon: {
                        backgroundColor: colors.testDisabled,
                    },
                }}
            >
                {/* Content of your bottom sheet */}
                <View style={styles.bottomItems}>
                    <View style={styles.headingView}>
                        <CustomHeading title={'Upload your photo'} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.editButton} onPress={openImagePicker}>
                            <Icon name="image-outline" size={20} color={colors.primaryTextColor} style={{ paddingRight: 10 }} /><CustomPara paragraph={'View photo library'} textColor={colors.primaryTextColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.editButton, { borderBottomWidth: 1, borderTopWidth: 1 }]} onPress={openCamera}>
                            <Icon name="camera-outline" size={20} color={colors.primaryTextColor} style={{ paddingRight: 10 }} /><CustomPara paragraph={'Take a photo'} textColor={colors.primaryTextColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={removeImage}>
                            <Icon name="trash-outline" size={20} color={colors.danger} style={{ paddingRight: 10 }} /><CustomPara paragraph={'Remove photo'} textColor={colors.danger} />
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingVertical: 8
    },
    headingView: {
        paddingHorizontal: 20,
    },
    bottomItems: {
        justifyContent: 'space-around',
        // flex: 1
    },
    editButton: {
        borderColor: colors.lightBorderColor,
        flexDirection: 'row',
        alignItems: 'center', // Center content horizontally
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
});

export default CustomBottomSheet;
