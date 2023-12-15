import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomPara from './CustomPara';
import { colors, sizes } from '../config/constants';
import { getUser, storeUser } from '../utilities/helperFunctions';
import { useIsFocused } from '@react-navigation/native';

const RoundedImageWithEdit = (props: any) => {
  const { onEditPress } = props
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const isFocused = useIsFocused();
  useEffect(() => {

    const fetchData = async () => {
      const avatar = await getUser('avatar');
      const image = await getUser('image');
      if (avatar) {
        setSelectedAvatar(avatar)
        setSelectedImage('')
        console.log('User detail stored successfully', avatar);
      } else {
        await storeUser('avatar', avatar);
      }
      if (image) {
        setSelectedImage(image)
        setSelectedAvatar(null)
      }
      else {
        await storeUser('image', image);
      }
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused])
  return (
    <View style={styles.container}>
      <View style={styles.roundedImage}>
        {selectedAvatar && (<Image source={selectedAvatar} style={styles.roundedImage} />)}
        {selectedImage && (<Image source={{ uri: selectedImage }} style={styles.roundedImage} />)}
      </View>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Icon name="camera-outline" size={20} color={colors.black} style={{ paddingRight: 10 }} /><CustomPara paragraph={'Edit'} textColor={colors.primaryTextColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center',
    marginVertical: 20,
  },
  roundedImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginBottom: 10, // Add some space between the image and the button
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.lightBorderColor,
  },
  editButton: {
    position: 'absolute',
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.darkBorderColor,
    borderRadius: 15,
    paddingHorizontal: sizes.secPaddingHorizontal,
    paddingVertical: sizes.secPaddingVertical,
    flexDirection: 'row',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center',
    bottom: 0
  },
});

export default RoundedImageWithEdit;
