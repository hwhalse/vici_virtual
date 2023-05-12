import React from "react";
import { View, Text, Button } from "react-native";

export default function FriendsList ({user, navigation}: any) {

    return (
        <View>
            <Button title={user.username} onPress={() => navigation.navigate('MyStats', {id: user.id})}/>
        </View>
    )
}