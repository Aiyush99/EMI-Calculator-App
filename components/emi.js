import React, {useState,Fragment} from 'react';
import {useTheme} from "@react-navigation/native";
import { View,TextInput, ScrollView} from 'react-native';
import Slider from "react-native-smooth-slider";
import { Container,Text,  Content, ListItem, Body, Right} from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types';

 


export default function Emi() {

  // defining states
   const [amount,setAmount] = useState(100000);
   const [interest,setInterest] = useState(1);
   const [tenure,setTenure] = useState(2);


   //formula for calculation
   const userAmount = Number(amount);
   const calculatedInterest = Number(interest) / 100 / 12;
   const calculatedPayments = Number(tenure) * 12;
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const emi = (userAmount * x * calculatedInterest) / (x - 1);

   const newEmi = emi.toFixed(0);
   const totalAmount = (emi * calculatedPayments).toFixed(0);
  

   const intr = (emi* calculatedPayments - userAmount).toFixed(0);


  
   const handleChangeInt = (interest)=>{
    setInterest(interest);
  }
 

  const handleChangeTen = (tenure)=>{
    setTenure(tenure);
  }
  
  //Pie Chart Data
  const data = [
    {
      key: 1,
      value:amount,
      svg: { fill: "red" },
     
  },
  {
      key: 2,
      value: intr,
      svg: { fill: '#00ff00' }
  },
  ]

 
  
  const {colors} = useTheme();
  
  return (
     
    <Container style={{backgroundColor:colors.card}}>
        <ScrollView showsVerticalScrollIndicator={false}>
           <Fragment>
                <View>
                 <Text 
                style=
                {{fontSize:20,
                marginLeft:20,
                marginTop:20,
                color:colors.text
                }}>
                Loan Amount 
                </Text>
    
     <TextInput keyboardType="numeric" maxLength={9} style={{color:colors.text,borderColor:"gray",borderBottomWidth:1,height:40,marginLeft:25,marginRight:20}} value={amount} onChangeText={amount=>setAmount(amount)}/>
     <Text style={{fontSize:20,marginLeft:15,marginTop:20,color:colors.text}}>Interest(%)</Text>

     <Slider  
          minimumTrackTintColor="#f91"
          maximumTrackTintColor="#3f3f3f"
          thumbTintColor="#f91"
          trackStyle={{width:"100%"}}
          thumbStyle={{width:20,height:20}} 
          step={1}
          style={{marginTop:20,marginLeft:25,width:"90%"}} 
          maximumValue={14} 
          value={interest}
          minimumValue={7}
          onValueChange={handleChangeInt} />

     <Text style={{fontSize:20,marginLeft:15,marginTop:20,color:colors.text}}>Tenure(Years)</Text>
     <Slider
      step={1} 
      style={{marginTop:20,marginLeft:25,width:"90%"}} 
      maximumValue={30} 
      value={tenure} 
      minimumValue={2}
      minimumTrackTintColor="#f91"
      maximumTrackTintColor="#3f3f3f"
      thumbTintColor="#f91"
      trackStyle={{width:"100%"}}
      thumbStyle={{width:20,height:20}} 
      onValueChange={handleChangeTen} />

    
     <Container style={{marginTop:50}}>
      
        <Content style={{backgroundColor:colors.card}}>
          <ListItem>
      
            <Body>
              <Text style={{color:colors.text}}>Amount</Text>
            </Body>
            <Right>
              <Text style={{fontSize:14,marginLeft:-50,color:colors.text}}>Rs {amount}</Text>
            </Right>
          </ListItem>

          <ListItem>
      
      <Body>
        <Text style={{color:colors.text}}>Interest</Text>
      </Body>
      <Right>
        <Text style={{fontSize:13,marginLeft:-50,color:colors.text}}>{interest} %</Text>
      </Right>
    </ListItem>

    <ListItem>
      
      <Body>
        <Text style={{color:colors.text}}>Tenure</Text>
      </Body>
      <Right>
        <Text style={{fontSize:13,marginLeft:-50,color:colors.text}}>{tenure} Years</Text>
      </Right>
    </ListItem>


    <ListItem>
      
      <Body>
        <Text style={{color:colors.text}}>Monthly Emi</Text>
      </Body>
      <Right>
        <Text style={{fontSize:13,marginLeft:-50,color:colors.text}}>Rs {newEmi}</Text>
      </Right>
    </ListItem>

    <ListItem>
      
      <Body>
        <Text style={{color:colors.text}}>Total Interest</Text>
      </Body>
      <Right>
        <Text style={{fontSize:13,marginLeft:-50,color:colors.text}}>Rs {intr}</Text>
      </Right>
    </ListItem>

    <ListItem>
      
      <Body>
        <Text style={{color:colors.text}}>Total Amount</Text>
      </Body>
      <Right>
        <Text style={{fontSize:13,marginLeft:-50,color:colors.text}}>Rs {totalAmount}</Text>
      </Right>
    
    </ListItem>
   
            <Text style={{marginTop:20,marginLeft:20,fontWeight:"bold",color:"red"}}>Loan Amount</Text>
            <Text style={{marginLeft:20,fontWeight:"bold",color:"#00ff00"}}>Total Interest</Text>
          
            <PieChart
                style={{ height: 270,marginTop:-50,marginLeft:70}}
                outerRadius={'70%'}
                innerRadius={10}
                data={data}
            />
        </Content>
      </Container>
  

  
  
   </View>
   </Fragment>
   </ScrollView>
   </Container>
  );
}



TextInput.propTypes = {
  value:PropTypes.number.isRequired,
}

PieChart.propTypes = {
  value:PropTypes.string,
}
