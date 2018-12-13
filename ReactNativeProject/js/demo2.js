import React,{Component} from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
class Demo3 extends React.Component
{
    static propTypes=
    {
        setBackgroundColor : PropTypes.string,
        buttonName: PropTypes.string,
        block : PropTypes.func,
        setwidh : PropTypes.number,
        setHeight : PropTypes.number,
    }
    static defaultProps={
        defaultColor:'#f44e14',
        buttonName:'Button',
    }
    render()
    {
        return(
            <TouchableOpacity onPress={()=>this.props.block()}>
            <View style={{flexDirection :'row',justifyContent :'center', alignItems:'center', backgroundColor:(this.props.setBackgroundColor)?this.props.setBackgroundColor:this.props.defaultColor,width:(this.props.setwidh!==0)?this.props.setwidh:60,height:(this.props.height!==0)?this.props.height:20,}}>
            <Text>{this.props.buttonName}</Text>
            </View>
            
            </TouchableOpacity>
        );
    }
}
module.exports=Demo3;