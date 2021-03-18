import React, { Fragment } from 'react';
import Pdf from "react-to-pdf";
import {View,Text,Button} from "react-native"
const ref = React.createRef();

const PDF = (props) => {
  return (
    <Fragment>
    <View ref={ref}>
     
        <Text>{props.gross-price}</Text>
       <Text>{props.cgst}</Text>
       <Text>{props.igst}</Text>
       <Text>{props.tax}</Text>
    </View>
    
      <Pdf targetRef={ref} filename="GST-Report.pdf">
        {({ toPdf }) => <Button onClick={toPdf}>Download as PDF</Button>}
      </Pdf>
      </Fragment>
  );
}

export default PDF;
