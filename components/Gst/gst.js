import React,{Fragment, useState} from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import Slider from "react-native-smooth-slider";
import {TextInput,Button,Provider} from "react-native-paper";
import { FlatGrid } from 'react-native-super-grid';
import PropTypes from 'prop-types';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useTheme} from "@react-navigation/native";

export default function Gst() {

    
    const [amount,setAmount] = useState(0);
    const [gst,setGst] = useState(0);
   
  
    
    
    const handleAmount = (amount)=>{
        setAmount(amount);
    }

    const handleGst = (gst)=>{
        setGst(gst);
    }

   


    const NetPrice = Number(amount);
    const TotalTax = Number(NetPrice * gst) / 100;
    const CGST = Number(TotalTax) / 2;
    const IGST = Number(TotalTax) / 2;
    const GrossPrice = Number(NetPrice + TotalTax);

   
    const item = [
        { name: 'Gross Price', code: '#7ea',value:GrossPrice.toFixed(2)},
        { name: 'CGST', code: '#49f',value:CGST.toFixed(2)},
        { name: 'IGST', code: '#bbb',value:IGST.toFixed(2)},
        { name: 'Total Tax', code: '#444',value:TotalTax.toFixed(2) },
      ];

     const createPDF = async()=> {
        let options = {
          html: `<h1>${GrossPrice}</h1>`,
          fileName: 'test',
          directory: 'Documents',
        };
    
        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        alert(file.filePath);
      }

 
  const {colors} = useTheme();

  
    return (
      <Provider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Fragment>
      
            <View>
            
          
     
      
            <TextInput style={{width:"92.5%",marginLeft:15,marginTop:30}} keyboardType="number-pad" maxLength={9} label="Net Price"value={amount}onChangeText={handleAmount}/>
            <Text style={{fontSize:20,fontWeight:"bold",marginLeft:15,marginTop:10,color:colors.text}}>GST ({gst} %)</Text>
        <Slider
          value={gst}
          minimumValue={0}
          maximumValue={28}
          step={0.25}
          onValueChange={handleGst}
          minimumTrackTintColor="#f91"
          maximumTrackTintColor="#3f3f3f"
          thumbTintColor="#f91"
          trackStyle={{width:"100%"}}
          thumbStyle={{width:20,height:20}}
          style={{marginTop:10,width:"90%",marginLeft:25}}
         
        />
   

<FlatGrid
itemDimension={130}
data={item}
style={styles.gridView}
// staticDimension={300}
// fixed
spacing={10}
renderItem={({ item }) => (
  <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemCode}>₹ {item.value}</Text>

  </View>
)}
/>

<Button onPress={createPDF}  mode="contained" style={{backgroundColor:"#f91",width:"50%",marginLeft:88,borderRadius:20}}>Save As PDF</Button>
</View>
     
       

       </Fragment>
       </ScrollView>
       </Provider>
    )
}

TextInput.propTypes = {
    value:PropTypes.string.isRequired,
  }
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
      },
      itemContainer:{
        justifyContent: 'flex-end',
        borderRadius: 20,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 14,
        marginBottom:30,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
          marginBottom:20,
        fontWeight: '600',
        fontSize: 16,
        color: '#fff',
      },
})
