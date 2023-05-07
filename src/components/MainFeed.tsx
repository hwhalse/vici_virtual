import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { GET_USER_FEED } from "../GQL/queries";
import { FlatList } from "react-native-gesture-handler";
import MainFeedItem from "./MainFeedItem";

export default function MainFeed ({userData}: any) {

    const {loading, error, data} = useQuery(GET_USER_FEED, {variables: {id: Number(userData.id)}})

    return (
        <View>
            {data && 
            <FlatList data={data.getUserFeed} keyExtractor={((item, index) => `${item.author_id}, ${index}`)} renderItem={(({item}) => <MainFeedItem workout={item} />)} /> 
            }
        </View>
    )
}