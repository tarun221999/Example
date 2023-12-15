import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { colors, fontNames, sizes } from '../config/constants';
import CustomPara from './CustomPara';
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyAvatar } from '../config/CustomData';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import CustomBottomSheet from './CustomBottomSheet';
import { getUser, storeUser } from '../utilities/helperFunctions';




const CustomTabView = (props: any) => {
    const { onPress } = props
    const [index, setIndex] = useState(0);
    const [selectedAvatar, setSelectedAvatar] = useState();
    const [selectedAvatarId, setSelectedAvatarId] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const bottomSheetRef = useRef();

    const openBottomSheet = () => {
        bottomSheetRef.current.open();
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current.close();
    };

    const handleCameraLaunch = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
      
        launchCamera(options, async response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            setSelectedAvatar(null);
            await storeUser('image' , imageUri)
            await storeUser('avatar' , '')
          }
        });
      }

      const openImagePicker = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchImageLibrary(options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            setSelectedAvatar(null);
            await storeUser('image' , imageUri)
            await storeUser('avatar' , '')
          }
        });
      };


      const removeImage = () => {
        setSelectedImage(null);
        setSelectedAvatar(null)
      }

    // first Tab
    const choosePhoto = () => {
        const { onPress } = props
        return (
            <View style={styles.profileView}>
                <View style={styles.roundedImageView}>
                    {selectedImage && (<Image source={{ uri: selectedImage }} style={styles.roundedImage} />)}
                    {selectedAvatar && (<Image source={selectedAvatar} style={styles.roundedImage} />)}
                </View>
                <TouchableOpacity style={styles.editButton} onPress={openBottomSheet}>
                    <Icon name="camera-outline" size={20} color={colors.primaryTextColor} style={{ paddingRight: 10 }} />
                    <CustomPara paragraph={'Edit Photo'} textColor={colors.primaryTextColor} />
                </TouchableOpacity>
            </View>
        )
    };

    // second Tab
    const avatarTab = () => {
        const renderItem = (props: any) => {
            const { avatar, id } = props.item
            return (
                <TouchableOpacity style={[styles.itemView, { borderWidth: selectedAvatarId == id ? 2 : 0 }]} onPress={async () => {setSelectedAvatar(props.item.avatar); setSelectedAvatarId(props.item.id); await storeUser('avatar' , props.item.avatar); await storeUser('image' , ''); setSelectedImage(null); }}>
                    <Image source={avatar} style={styles.avatarImage} />
                </TouchableOpacity>
            )
        };
        return (
            <FlatList
                data={dummyAvatar}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                numColumns={4}
                contentContainerStyle={{ marginVertical: 24 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
        )
    };

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            labelStyle={styles.tabLabel}
            activeColor={colors.primaryColor}
            inactiveColor={colors.primaryTextColor}
            indicatorStyle={{ backgroundColor: colors.transparent }}
            style={{ backgroundColor: colors.lightBackground, borderRadius: 12, elevation: 0, shadowColor: 0 }}
        />
    );
    const [routes] = useState([
        { key: 'choosePhoto', title: 'Choose Photo' },
        { key: 'avatarTab', title: 'Avatar' },
    ]);

    const renderScene = SceneMap({
        choosePhoto: choosePhoto,
        avatarTab: avatarTab,
    });

    useEffect(()=>{
        const fetchData = async () => {
          const avatar = await getUser('avatar');
          const image = await getUser('image');
          console.log
          if (avatar) {
            setSelectedAvatar(avatar)
            setSelectedImage(null)
          } else {
            await storeUser('avatar', avatar);
            console.log('User detail stored successfully');
          }
          if(image) {
            setSelectedImage(image)
            setSelectedAvatar(null)
            console.log(image)
          }
          else {
            await storeUser('image', image);
          }
        };
      
        fetchData();
      },[])

    return (
        <View style={styles.scene}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}

            />
            <CustomBottomSheet bottomSheetRef={bottomSheetRef} openBottomSheet={openBottomSheet} closeBottomSheet={closeBottomSheet} openCamera={handleCameraLaunch} openImagePicker={openImagePicker} removeImage={removeImage}/>
        </View>
    )
}

export default CustomTabView

const styles = StyleSheet.create({
    scene: {
        flexDirection: 'row',
        height: 450,
        marginTop: 20
    },
    roundedImageView: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center',
        backgroundColor: colors.lightBackground,
        width: 300,
        height: 300,
        borderRadius: 500,
        marginTop: 20,
        borderColor: colors.darkBorderColor,
        borderWidth: 2,
    },
    roundedImage: {
        width: 300,
        height: 300,
        borderRadius: 500, // Add some space between the image and the button
        borderWidth: 1,
        borderColor: colors.darkBorderColor
    },
    editButton: {
        backgroundColor: colors.lightBackground,
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: 200,
        paddingHorizontal: sizes.paddingHorizontal,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center',
        marginTop: 24
    },
    profileView: {
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center',
        height: '100%',
    },
    itemView: {
        marginVertical: 5,
        borderRadius: 200,
        borderColor: colors.primaryColor,
        overflow: 'hidden'
    },
    avatarImage: {
        width: 83,
        height: 81,
    },
    tabLabel: {
        fontSize: sizes.normalTextSize,
        fontWeight: '400',
        fontFamily: fontNames.regularFont,
        textAlign: 'center',
        color: 'red',
        lineHeight: 23.8,
    },
})