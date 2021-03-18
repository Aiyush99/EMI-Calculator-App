import React,{useState} from "react";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {Left, Container,Content,Footer,Icon,Header, Right, Button, List, ListItem ,Body,Text,Switch} from "native-base";
import Animated from "react-native-reanimated";
import { DrawerActions } from "@react-navigation/routers";
import {EventRegister} from "react-native-event-listeners";
import {useTheme} from "@react-navigation/native";



const Sidebar = ({progress,...props})=>{
    const [darkMode,setDarkMode] = useState(false);
    const colors = useTheme();
   
    const translateX = Animated.interpolate(progress,{
        inputRange:[0,1],
        outputRange:[-100,0]
    })
    return(
        <Container style={{backgroundColor:colors.card}}>
            <Header style={{backgroundColor:colors.card,borderBottomWidth:0,marginTop:20,width:"100%"}}>
                
                <Right>
                    <Button transparent onPress={()=>props.navigation.dispatch(DrawerActions.closeDrawer())}>
                        <Icon style={{color:"teal"}}  name="menu"/>
                    </Button>
                </Right>
            </Header>
            <Content contentContainerStyle={{flex:1,backgroundColor:colors.card}}>
            <DrawerContentScrollView { ...props}>
      <Animated.View style={{transform:[{translateX}]}}>
    <DrawerItemList {...props}/>

    
    </Animated.View>
  </DrawerContentScrollView>
  <List>
      <ListItem>
          <Body>
              <Text style={{color:"teal"}}>Dark Mode</Text>
          </Body>
          <Right>
              <Switch value={darkMode}onValueChange={(val)=>{
                  setDarkMode(val);
                  EventRegister.emit("changeThemeEvent",val)
              }}/>
          </Right>
      </ListItem>
  </List>
            </Content>
            
       
  
  </Container>
    )   
}

export default Sidebar