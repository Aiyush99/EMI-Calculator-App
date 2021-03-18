import React, {useState,Fragment} from 'react';
import {useTheme} from "@react-navigation/native";
import { View,TextInput, ScrollView} from 'react-native';
import Slider from "react-native-smooth-slider";
import { Container,Text,  Content, ListItem, Body, Right} from 'native-base'
import { PieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types';

 


export default function FD() {

  // defining states
   const [Investment,setInvestment] = useState(1000);
   const [interest,setInterest] = useState(1);
   const [tenure,setTenure] = useState(2);
   const [months,setMonths] = useState(1);
   const [day,setDay] = useState(1);


   //formula for calculation
   const TotalInterest = Investment * Math.pow(1 + interest / 12, 12 * tenure);

  
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
      value:Investment,
      svg: { fill: "#56f" },
     
  },
  {
      key: 2,
      value: TotalInterest,
      svg: { fill: '#6da' }
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
                Total Investment
                </Text>
    
     <TextInput  autoFocus keyboardType="numeric" maxLength={9} style={{color:colors.text,borderColor:"gray",borderBottomWidth:1,height:40,marginLeft:25,marginRight:20}} value={Investment} onChangeText={Investment=>setInvestment(Investment)}/>
     <Text style={{fontSize:20,marginLeft:15,marginTop:20,color:colors.text}}>Interest P.A ({interest} %)</Text>

     <Slider  
          minimumTrackTintColor="#56f"
          maximumTrackTintColor="#56f"
          thumbTintColor="#56f"
          trackStyle={{width:"100%"}}
          thumbStyle={{width:20,height:20}} 
          step={0.5}
          style={{marginTop:20,marginLeft:25,width:"90%"}} 
          maximumValue={14} 
          value={interest}
          minimumValue={7}
          onValueChange={handleChangeInt} />

     <Text style={{fontSize:20,marginLeft:15,marginTop:20,color:colors.text}}>Tenure ({tenure} Years)</Text>
     <Slider
      step={1} 
      style={{marginTop:20,marginLeft:25,width:"90%"}} 
      maximumValue={11} 
      value={tenure} 
      minimumValue={2}
      minimumTrackTintColor="#56f"
      maximumTrackTintColor="#56f"
      thumbTintColor="#56f"
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
              <Text style={{fontSize:14,marginLeft:-50,color:colors.text}}>Rs {Investment}</Text>
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
        <Text style={{color:colors.text}}>Total Interest</Text>
      </Body>
      <Right>
        <Text style={{fontSize:13,marginLeft:-50,color:colors.text}}>{TotalInterest}</Text>
      </Right>
    </ListItem>


   
   
            <Text style={{marginTop:20,marginLeft:20,fontWeight:"bold",color:"#56f"}}>Total Investment</Text>
            <Text style={{marginLeft:20,fontWeight:"bold",color:"#6da"}}>Total Interest</Text>
          
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
