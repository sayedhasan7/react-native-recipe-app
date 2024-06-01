import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'react-native-animatable'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { Appbar, Card, Text } from 'react-native-paper'

const Search = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [data, setdata] = useState()
  const [loader, setloader] = useState(false)
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

  const fetchdata = async () => {
    // Handle Error 
    if (!route.params.data) navigation.navigate("Home")

    const { data } = await axios.get(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${route.params.data}`)

    if (data.hits) {
      setdata(data.hits)
      setloader(false)
    }
  }

  useEffect(() => {
    setloader(true)
    fetchdata()
  }, [])

  return (
    <View>
      <Appbar.Header t>
        <Appbar.BackAction style={{ backgroundColor: "white" }} onPress={() => { navigation.goBack() }} />
        <Text variant='titleLarge'>{route.params.data}</Text>
      </Appbar.Header>
      {
        !loader ? <FlatList style={{ padding: 10 }} data={data} renderItem={
          ({ item }) =>
            <Card style={{ margin: 10, height: 280, borderRadius: 15 }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("Details", {
                  data: item
                })
              }} activeOpacity={0.5} style={{ height: 280, borderRadius: 15 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Image source={{ uri: item.recipe.image }} style={{ width: "100%", height: 280, borderRadius: 15 }}></Image>
                </View>
                <View style={[style.layer, { borderRadius: 15 }]}>
                  <Text variant='bodyLarge' style={{ color: "white" }}>{item.recipe.label}</Text>
                  {/* <Text variant='titleLarge' style={{color:"white"}}>{item.recipe.meal}</Text> */}
                </View>
              </TouchableOpacity>
            </Card>
        }>
        </FlatList> : <FlatList style={{ padding: 10, width: "100%" }} data={Array.from({ length: 10 })} renderItem={
          ({ item }) =>
            <ShimmerPlaceHolder LinearGradient={LinearGradient} style={{ margin: 10, height: 280, borderRadius: 15, width: "100%" }}>
            </ShimmerPlaceHolder>
        }>
        </FlatList>
      }
    </View>
  )
}

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  topView: {
    width: "100%",
    height: "40%",
    position: "relative"
  },
  topViewImage: {
    width: "100%",
    height: "100%"
  },
  layer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  searchbox: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  }

})

export default Search