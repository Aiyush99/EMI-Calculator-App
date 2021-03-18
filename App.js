import React,{useState,useEffect, Component, Fragment} from 'react'
import { DrawerActions } from "@react-navigation/routers";
import Emi from "./components/emi";
import Gst from "./components/Gst/gst";
import FD from "./components/FD";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer,DefaultTheme,DarkTheme,useTheme} from "@react-navigation/native";
import Sidebar from "./components/CustomDrawer";
import {createStackNavigator} from "@react-navigation/stack";
import GstManufacturer from "./components/Gst/GstManufacturer";
import GstWholeSalerRetailer from "./components/Gst/GstWholesalerRetailer";
import { EventRegister } from 'react-native-event-listeners';
import { Container } from 'native-base';
import { Header,Left,Button,Icon,Text,Body,H1,Right} from 'native-base';
import { Colors,Menu,IconButton,Divider,Provider } from 'react-native-paper';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function EmiScreen({navigation}){
  const {colors} = useTheme();
  return(
    <Fragment>
    
    <Header style={{borderBottomWidth:0,marginTop:20}} transparent> 
    <Left>
                    <Button transparent onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon style={{color:colors.text,fontSize:30}}  name="menu"/>
                    </Button>
    </Left>
     <Left/>
       <Body>
         <Text style={{fontSize:20,fontWeight:"bold",marginLeft:-60,marginTop:-10,color:colors.text}}>EMI Calculator</Text>
       </Body>
     </Header>
    <Emi />
    
    </Fragment>
  )
}

function GstScreen({navigation}){
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {colors} = useTheme();
  return(
    <Provider>
    <Fragment>
    <Header style={{borderBottomWidth:0,marginTop:20}} transparent> 
    
    <Left>
                    <Button transparent onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon style={{color:colors.text,fontSize:30}}  name="menu"/>
                    </Button>
    </Left>
    
     <Left/>
       <Body>
         <Text style={{fontSize:20,fontWeight:"bold",marginLeft:-6,marginTop:-1,color:colors.text}}>GST Buyer</Text>

         
       </Body>
       <Right>
    <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={ <IconButton
            icon="dots-vertical"
            color={colors.text}
            size={25}
            onPress={openMenu}
          />}>
          <Menu.Item onPress={() =>navigation.navigate("GST Calculator")} title="Buyer" />
          <Menu.Item onPress={() =>navigation.navigate("gst-manu-stack")} title="Manufacturer" />
          <Divider />
          <Menu.Item onPress={() =>navigation.navigate("gst-wholesaler-stack")} title="Wholesaler/Retailer" />
        </Menu>
    </Right>
     </Header>
    <Gst/>
    </Fragment>
    </Provider>
  )
}

function FDScreen({navigation}){
  const {colors} = useTheme();
  return(
    <Fragment>
    <Header style={{borderBottomWidth:0,marginTop:20}} transparent> 
    <Left>
                    <Button transparent onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon style={{color:"teal",fontSize:30}}  name="menu"/>
                    </Button>
    </Left>
     <Left/>
       <Body>
         <H1 style={{fontSize:20,fontWeight:"bold",marginLeft:-65,marginTop:-10,color:colors.text}}>FD Calculator</H1>
       </Body>
     </Header>
    <FD/>
    </Fragment>
  )
}

const GstManufacturerStackScreen = ()=>{
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="GST Manufacturer"component={GstManufacturer}/>
     </Stack.Navigator>

  )
}

const GstWholesalerRetailerStackScreen = ()=>{
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="GST Wholesaler"component={GstWholeSalerRetailer}/>
     </Stack.Navigator>

  )
}

const AppDrawer = ()=>{
  return(
    <Drawer.Navigator  drawerContent={props=><Sidebar{...props}/>}>
  
      <Drawer.Screen  name="EMI Calculator"component={EmiScreen}/>

<Drawer.Screen name="GST Calculator"component={GstScreen}/>
<Drawer.Screen name="FD Calculator"component={FDScreen}/>
      
    </Drawer.Navigator>
  )
}



const App = () => {

  
const [darkApp,setDarkApp] = useState(false);
const appTheme = darkApp ? DarkTheme:DefaultTheme;

useEffect(() => {
 let eventListener = EventRegister.addEventListener(
   "changeThemeEvent",
   data=>{
     setDarkApp(data)
   }
 )
  return () => {
    EventRegister.removeEventListener(eventListener)
  }
}, [])
  return (
    
    <NavigationContainer theme={appTheme}>
     <Stack.Navigator>
       <Stack.Screen name="app-drawer"component={AppDrawer} options={{headerShown:false}}/>
       <Stack.Screen name="gst-manu-stack"component={GstManufacturerStackScreen} options={{headerShown:false}}/>
       <Stack.Screen name="gst-wholesaler-stack"component={GstWholesalerRetailerStackScreen} options={{headerShown:false}}/>


     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
