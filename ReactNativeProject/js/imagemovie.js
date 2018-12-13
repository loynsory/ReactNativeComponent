import React,{Component} from 'react'
import {View,Modal,Animated, FlatList,UIManager,StyleSheet,ScrolView,findNodeHandle,TouchableOpacity}from 'react-native'
import{Utils} from './Utils'
import{DevicSize, DeviceSize}from './DeviceSize'
export class MagicMoving extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            selectedIndex:0,
            showPopular:false,
        };
        this._cardRefs=[];
        this.popuAnimatedValue=new Animated.Value(0);
        this.clsoeAnimatedValue=new Animated.Value(0);
        this.bannerImageAnimatedValue=new Animated.Value(0);
    }

    _updateAnimatedStyles(x,y,width,height,pageX,pageY)
    {
        this.popupLayerStyle={
            top:Utils.interpolate(this.popuAnimatedValue,[0,1],[pageY,0]),
            left:Utils.interpolate(this.popuAnimatedValue,[0,1],[pageX,0]),
            width:Utils.interpolate(this.popuAnimatedValue,[0,1],[width,DevicSize.WIDTH]),
            height:Utils.interpolate(this.popuAnimatedValue,[0,1],[height,DeviceSize.HEIGHT])
        };
        this.closeStyle={
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',top:30,right:20,
            opacity:Utils.interpolate(this.clsoeAnimatedValue,[0,1],[0,1]),
        };
        this.bannerImageStyle={
            width:Utils.interpolate(this.bannerImageAnimatedValue,[0,1],[width,DeviceSize.WIDTH]),
            height:Utils.interpolate(this.bannerImageAnimatedValue,[0,1],[height,DevicSize.WIDTH*height/width])
        };
    }

    _onRequestClose=()=>
    {
        const{onPopuLayerDidHide}=this.props;
        onPopuLayerDidHide&&onPopuLayerDidHide();
    };
    
    _onPressCard=index=>
    {
        UIManager.measure(findNodeHandle(this._cardRefs[index]),(x,y,width,height,pageX,pageY)=>
        {
            this._updateAnimatedStyles(x,y,width,height,pageX,pageY);
            this.setState({
                selectedIndex:index,
                showPopular:true
            },()=>{
                const{openDuration,onPopupLayerWillShow}=this.props;
                onPopupLayerWillShow&&onPopupLayerWillShow(index);
                Animated.parallel([
                    Animated.timing(this.clsoeAnimatedValue,{toValue:1,duration:openDuration}),
                    Animated.spring(this.popuAnimatedValue,{toValue:1,friction:6,duration:openDuration}),
                    Animated.spring(this.bannerImageAnimatedValue,{toValue:1,friction:6,duration:openDuration})
                ]).start(()=>{
                    const{onPopuLayerDidShow}=this.props;
                    onPopuLayerDidShow&&onPopuLayerDidShow(index);
                });
               
            });
        });
    };

    _onPressClose=()=>
    {
        const{closeDuration}=this.props;
        Animated.parallel([
            Animated.timing(this.clsoeAnimatedValue,{toValue:0,duration:closeDuration}),
            Animated.timing(this.popuAnimatedValue,{toValue:0,duration:closeDuration}),
            Animated.timing(this.bannerImageAnimatedValue,{toValue:0,duration:closeDuration})
        ]).start(()=>{
            this.setState({showPopular:false});
        });
    };

    _renderClose=()=>
    {
        return(
            <Animated.View style={this.closeStyle}>
            <TouchableOpacity style={StyleSheet.closeContainer} onPress={this._onPressClose}>
            <View style={[styles.forkLine, {top: +.5, transform: [{rotateZ: '45deg'}]}]}/>
            <View style={[styles.forkLine, {top: -.5, transform: [{rotateZ: '-45deg'}]}]}/>
            </TouchableOpacity>
            </Animated.View>
        );
    };

    _renderCard=({item,index})=>
    {
        const{cardStyle,renderCardContent}=this.props;
        return(
            <TouchableOpacity style={cardStyle}
            ref={_=>this._cardRefs[index]=_}
            onPress={()=>this._onPressCard(index)}
            >
            {renderCardContent(item,index)}
            </TouchableOpacity>
        );
    };

    _renderList()
    {
        const{data}=this.props;
        return(
            <FlatList
            data={data}
            keyExtractor={(item,index)=>index.toString}
            renderItem={this._renderCard}
            ></FlatList>
        );
    }
    _renderPopuplayer()
    {
        const{data}=this.props;
        const{selectedIndex,showPopuplar}=this.props;
        return(
            <Modal
            transparent={true}
            visible={showPopuplar}
            onRequestClose={this._onPressClose}
            >
            {showPopuplar&&(
                <Animated.View style={[styles.popupLayer,this.popupLayerStyle]}></Animated.View>
            )}</Modal>
        );
    }
    _renderPopupLayerContent(item,index)
    {
        const{renderPopLayerBanner,_renderPopupLayerContent}=this.props;
        return(
            <ScrollView bounces={false}>
            {renderPopLayerBanner?renderPopLayerBanner(this.bannerImageStyle):(<Animated.Image source={item.image} style={this.bannerImageStyle}/>
            )}
            {_renderPopupLayerContent(item,index)}
            {this._renderClose()}
            </ScrollView>
      );  
    }

    render()
    {
        const {style}=this.props;
        return(
            <View style={style}>
              {this._renderList()}
              {this._renderPopuplayer()}

            </View>
        );
    }
}
MagicMoving.defaultProps={
    data:[],
    openDuration:300,
    closeDuration:300,
    renderCardContent:()=>{},
    renderPopupLayerContent:()=>{}
};

const styles = StyleSheet.create({
    popupLayer: {
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: '#FFF'
    },
    closeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#666'
    },
    forkLine: {
      width: 10,
      height: 1,
      backgroundColor: '#FFF'
    }
  });

