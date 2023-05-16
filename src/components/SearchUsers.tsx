import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { SEARCH_FOR_FRIENDS } from "../GQL/queries";
import { FlatList, TextInput } from "react-native-gesture-handler";
import FriendsList from "./FriendsList";

export default function SearchUsers ({navigation}: any) {
    console.log(navigation)

    const [searchString, setSearchString] = useState('')

    const [searchForFriends, {loading, error, data}] = useLazyQuery(SEARCH_FOR_FRIENDS, {
        variables: {
            searchString: searchString
        }
    })



    return (
        <View>
            <Text>
                Search below:
            </Text>
            <TextInput placeholder="Type search string" onChangeText={(text: string) => setSearchString(text)}/>
            <Button title="Search by username" onPress={() => searchForFriends()}/>
            {data && <FlatList data={data.findFriends} keyExtractor={(item, index) => `${item.id}, ${index}`} renderItem={({item}) => <FriendsList user={item} navigation={navigation} />} />}
        </View>
    )
}