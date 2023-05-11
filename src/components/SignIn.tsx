import React, { useEffect } from "react";
import { Text, TextInput, View, Button } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

export default function SignIn () {
    const authenticate = async (): Promise<void> => {
      try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                username: 'test',
                id: 1
            })
        )
      } catch(err) {
        console.log(err)
      }
    }
    return (
        <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sign In:</Text>
            <View>
                <TextInput style={{margin: '3%'}} placeholder="Username" autoCapitalize="none"/>
                <TextInput style={{margin: '3%'}} placeholder="Password" autoCapitalize="none"/>
                <Button title="Submit" onPress={authenticate}/>
            </View>
        </View>
    )
}