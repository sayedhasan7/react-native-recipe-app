import { View, StyleSheet, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native-animatable'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Card, Searchbar, Text } from 'react-native-paper'
import axios from 'axios'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setdata] = useState()
  const [loader, setloader] = useState(false)
  const [placeholder, setplaceholder] = useState("Search")
  const navigation = useNavigation()
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


  const categories = [{
    title: "Breakfast",
    image: require("../assets/images/breakfast.png")
  }, {
    title: "Launch",
    image: require("../assets/images/lunch.png")
  }, {
    title: "Dinner",
    image: require("../assets/images/dinner.png")
  }, {
    title: "Snack",
    image: require("../assets/images/snack.png")
  }, {
    title: "brunch",
    image: require("../assets/images/brunch.png")
  }, {
    title: "teatime",
    image: require("../assets/images/teatime.png")
  },
  ]


  const fetchdata = async () => {
    try {
      const { data } = await axios.get(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=trending`)
      if (data.hits) {
        setdata(data.hits)
        setloader(false)
      }
    } catch (error) {
      console.warn(error)
    }
  }


  useEffect(() => {
    if (!data) {
      setloader(true)
      fetchdata()
    }
  }, [])


  const handleSearch = () => {
    if (searchQuery) {
      navigation.navigate("Search", {
        data: searchQuery
      })
    } else {
      setplaceholder("Please Enter Search Text")
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );

    })
    return unsubscribe

  }, [navigation])

  return (
    <>
      <View style={style.maincontainer}>


        <View style={style.topView}>
          <Image style={style.topViewImage} source={require("../assets/images/back.jpg")}></Image>
          <View style={style.layer}>
            <Text variant="displayMedium" style={{ color: "white", marginRight: "auto", marginBottom: 40, marginTop: 20 }}>Recipe Pro</Text>
            <Searchbar
              style={style.searchbox}
              onChange={() => setplaceholder("Search")}
              placeholder={placeholder}
              onChangeText={setSearchQuery}
              value={searchQuery}
              onIconPress={handleSearch}


            />
            <Text variant='titleMedium' style={{ color: "white", margin: 5, marginBottom: 60 }}>Search 1000+ Recipeie's Easily With One Click</Text>
          </View>
        </View>


        <View>
          <Text variant='titleLarge' style={{ paddingLeft: 20, paddingTop: 20 }}>Category</Text>
          <FlatList style={{ padding: 10 }} horizontal={true} data={categories} renderItem={({ item, index }) =>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate("Search", {
                  data: item.title
                })
              }} activeOpacity={0.7}>
                <Card style={{ margin: 10, marginLeft: 15, padding: 10 }} key={"categoriescard" + index}>
                  <Card.Content key={"categoriescardcontent" + index}>
                    <Image source={item.image} style={{ height: 50, width: 50 }}></Image>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
              <Text variant="titleLarge" style={{ textAlign: "center", }}>{item.title}</Text>
            </View>}>
          </FlatList>
        </View>


        <Text variant='titleLarge' style={{ paddingLeft: 20, paddingTop: 20 }}>Trending Recipe</Text>
        {
          !loader ? <FlatList horizontal style={{ maxHeight: 310, padding: 10 }} data={data} renderItem={
            ({ item }) =>
              <Card onPress={() => {
                navigation.navigate("Details", {
                  data: item
                })
              }} style={{ margin: 10, height: 280, borderRadius: 15 }}>
                <TouchableOpacity activeOpacity={0.5} style={{ height: 280, borderRadius: 15 }}>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image source={{ uri: item.recipe.image }} style={{ width: 200, height: 280, borderRadius: 15 }}></Image>
                  </View>
                  <View style={[style.layer, { borderRadius: 15 }]}>
                    <Text variant='titleMedium' style={{ color: "white" }}>{item.recipe.label}</Text>
                    {/* <Text variant='titleLarge' style={{color:"white"}}>{item.recipe.meal}</Text> */}
                  </View>
                </TouchableOpacity>
              </Card>
          }>
          </FlatList> : <FlatList horizontal style={{ maxHeight: 310, padding: 10 }} data={Array.from({ length: 10 })} renderItem={
            ({ item }) =>
              <ShimmerPlaceHolder LinearGradient={LinearGradient} style={{ margin: 10, height: 280, borderRadius: 15 }}>
              </ShimmerPlaceHolder>
          }>
          </FlatList>
        }


      </View >
    </>
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
export default Home