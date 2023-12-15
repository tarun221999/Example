import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fontNames, sizes } from '../../config/constants'
import CustomTextInput from '../../components/CustomtextInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonPress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formView}>
        <Text style={styles.pageTitle}>Login</Text>
        <CustomTextInput
          placeholder={'Enter your email'}
          value={username}
          onChangeText={setUsername}
          secureTextEntry={false}
          label={"Email"}
        />
        <CustomTextInput
          placeholder={'Enter your password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          label={"Password"}
        />
        <CustomButton
          title="Login"
          onPress={handleButtonPress}
          bgColor={colors.primaryColor}
          textColor={colors.white}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  formView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20
  },
  pageTitle: {
    fontSize: sizes.headerTextSize,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fontNames.regularFont
  },



})