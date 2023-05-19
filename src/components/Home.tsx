import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { GET_USER_INFO } from "../GQL/queries";
import MainFeed from "./Feeds/MainFeed";
import FollowingFeed from "./Feeds/FollowingFeed";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home ({navigation}: any) {
    console.log(navigation)

    const [username, setUsername] = useState({username: '', token: ''});
    const [today, setToday] = useState('')
    const [global, setGlobal] = useState(true)
    const [getUser, {data, loading, error}] = useLazyQuery(GET_USER_INFO, {
        variables: {
            username: username.username
        }
    })

    const todayDate = (): void => {
      const now = new Date();
      const dateString = now.toLocaleDateString()
      setToday(dateString)
    }

    const getUserInfo = async (): Promise<void> => {
        try {
          const info = await EncryptedStorage.getItem("user_session");
          if (info !== null) {
            const obj = await JSON.parse(info)
            setUsername(obj)
          }
        } catch(err) {
            console.log(err)
        }
        getUser()
    }

    useEffect(() => {
        getUserInfo()
        todayDate()
    }, [])

    return (
        <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderBottomColor: 'gainsboro', borderBottomWidth: 1, padding: 10, marginBottom: 5}}>
                <TouchableOpacity onPress={() => setGlobal(true)}>
                    <Text style={{color: 'blue', fontSize: 20}}>
                        Everyone
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGlobal(false)}>
                    <Text style={{color: 'blue', fontSize: 20}}>
                        Friends Only
                    </Text>
                </TouchableOpacity>
            </View>
            {data ? global ? <MainFeed navigation={navigation} userData={data.getUser}/> : <FollowingFeed navigation={navigation} userData={data.getUser}  /> : ''}
        </View>
    )
}