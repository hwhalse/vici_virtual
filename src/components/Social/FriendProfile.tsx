import React from "react";
import { View, Text, Button } from "react-native";

export default function FriendsList ({route}: any) {

    console.log(route.params.id)

    return (
        <View>
            <Text>Hi</Text>
        </View>
    )
}