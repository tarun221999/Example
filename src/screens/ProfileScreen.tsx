import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../config/constants';
import CustomTextInput from '../components/CustomtextInput';
import CustomButton from '../components/CustomButton';
import CustomHeading from '../components/CustomHeading';
import CustomPara from '../components/CustomPara';
import RoundedImageWithEdit from '../components/RoundedImageWithEdit';
import { useNavigation } from '@react-navigation/native';
import CustomDropDown from '../components/CustomDropDown';
import { ScrollView } from 'react-native-gesture-handler';
import { getUser, storeUser } from '../utilities/helperFunctions';

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [bornYear, setBornYear] = useState('1980');


  const handleSave = async () => {
    // Add your save profile logic here
    console.log('Profile saved');
    await storeUser('userdetail', {'firstName': firstName, 'lastName': lastName, 'bornYear': bornYear})
  };

  useEffect(()=>{
    const fetchData = async () => {
      const userDetailString = await getUser('userdetail');
      if (userDetailString) {
        setFirstName(userDetailString.firstName);
        setLastName(userDetailString.lastName);
        setBornYear(userDetailString.bornYear)
      } else {
        // If the key doesn't exist, store the user detail
        const userDetail = {'firstName': '', 'lastName': '', 'bornYear': '', };
        await storeUser('userdetail', userDetail);
        console.log('User detail stored successfully');
      }
    }
    fetchData();
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.closeButton} >
      </View>
      <View>
        <CustomHeading
          title={'Let’s get to know you'}
        />
        <CustomPara
          textColor={colors.secTextColor}
          paragraph={'Let us get to know you a bit better so you can get the best out of us'}
        />
        <RoundedImageWithEdit
          onEditPress={() => { navigation.navigate('Edit-Profile') }}
        />
        <CustomTextInput
          placeholder={''}
          value={firstName}
          onChangeText={setFirstName}
          secureTextEntry={false}
          label={"First name"}
        />
        <CustomTextInput
          placeholder={''}
          value={lastName}
          onChangeText={setLastName}
          secureTextEntry={false}
          label={"Last name"}
        />
        <CustomDropDown
          placeholder={'Year Of birth'}
          defaultValue={bornYear}
          value={bornYear}
          onChangeText={(value)=>setBornYear(value)}
          secureTextEntry={false}
          label={"Year Of birth"}
        />
      </View>
      <CustomButton
        title="Save"
        onPress={handleSave}
        bgColor={colors.primaryColor}
        textColor={colors.white}
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
    backgroundColor: colors.normalBackground,
  },
  closeButton: {
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center',
    marginVertical: 20
},

});

export default ProfileScreen;
