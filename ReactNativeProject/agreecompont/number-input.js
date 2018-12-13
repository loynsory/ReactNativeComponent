import React,{Component} from 'react'
import {Text,View,TextInput,StyleSheet} from 'react-native'
import PropTypes from 'prop-types';

class aui_number_input extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { text: 'null' };
      }
   static PropTypes={
       type:PropTypes.oneOf(['text','password']),
       size:PropTypes.oneOf(['large','small','normal']),
       align:PropTypes.oneOf(['left','center','right']),
       placeholder:PropTypes.string,
       //max:PropTypes.number,
       //minlength:PropTypes.number,
       maxlength:PropTypes.number,
       decimal:PropTypes.number,
       disable:PropTypes.bool,
       contenttext:PropTypes.string,
       changetext:PropTypes.func,
       changetext2:PropTypes.func,
     
       
   }

   static defaultProps={
       type:'text',
       size:'normal',
       disable:false, 
       align:'left',
       placeholder:'数字输入框',
   }

   render()
   {
       
       if(this.props.disable==true)
       {
           return(
            <TextInput style={[{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'#c1c7cd'},
            this.classsize(),
            this.alignClass()]}
            keyboardType={"number-pad"} 
            editable={!this.props.disable} 
            secureTextEntry={(this.props.type=='text')?false:true} 
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            // onChangeText={(text) => this.setState({contenttext})}
          >
            </TextInput>
           );
       }
   
       return(   
        <View>    
         <TextInput  style={[{height: 40, borderColor: 'gray', borderWidth: 1},
         this.classsize(),
         this.alignClass()]}
         keyboardType={"number-pad"}
         editable={!this.props.disable}
         secureTextEntry={(this.props.type=='text')?false:true}
         placeholder={this.props.placeholder}
         maxLength={this.props.maxlength}
         onChangeText={this.changetext.bind(this)}
        ></TextInput>
     
         
        </View>
       );
       
   }

   classsize()
   {
       if(this.props.size=='small')
    return styles.small;
    if(this.props.size=='normal')
    return styles.normal;
    if(this.props.size=='large')
    return styles.large;
   }
   alignClass() {
       if(this.props.align=='center')
      return styles.center;
      if(this.props.align=='right')
      return styles.right;
   }

  
changetext(inputtext)
{
    this.setState({text:inputtext});
   // this.props.changetext(inputtext);
    this.props.changetext2(inputtext);
}



   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

    large:{
     width:300,
    },
    normal:{
        width:158,
    }, 
    small:{
        width:118,
    },
    center:
    {
        textAlign:'center',
    },
    right:
    {
        textAlign:'right'
    },
    inputWrap:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        width:245,
        height:50,
        backgroundColor:'transparent',
        borderColor:'rgba(171, 190, 215, 0.56)',
        borderBottomWidth: 1,
        marginBottom:25,
    },
    icon: {
        width: 16,
        height: 16,
        marginRight:10
    },
    textInput:{
        backgroundColor:'transparent',
        borderColor:'transparent',
        borderWidth: 1,
        width:200,
        height:50,
        fontSize:14,
        color:'#fff',
    },
   
})
module.exports=aui_number_input;