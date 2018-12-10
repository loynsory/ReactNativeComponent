/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,AppRegistry,Button,LayoutAnimation,ImageBackground,TextInput} from 'react-native';
import root from './android/root';
import {StackNavigator,createStackNavigator, createAppContainer} from 'react-navigation';
import {mockedData} from './js/MockedData'
import {MagicMoving} from './js/MagicMoving'
import Demo2 from './js/demo2'
import Numberinput from './agreecompont/number-input'
import Textinput from './agreecompont/text-input'
AppRegistry.registerComponent('reading', () => root);



// const BBC = createStackNavigator({
//   Home: {screen: APP},
//   Profile: {screen: demo1},
// });

// export default BBC;



// const App2 = createStackNavigator({
//   Home: {
//     screen: App,
//     navigationOptions: {
//       headerTitle: '首页'
//     }
//   },
//   Demo1: {
//     screen: demo1,
//     navigationOptions: {
//       headerTitle: 'Demo1'
//     }
//   },

// });

// export default createAppContainer(App2);






export default class testclass extends Component
{

  constructor(props) {
    super(props);
    this.state = { 
     test1:null,
     test2:null,
     test3:null,
     test4:null,
     test5:null,
     test6:null 
  
  
  };
  }

   onchange=(label,value)=>{
   this.setState({[label]:value});
   };

  changetext(inputtext)
  {
    this.setState({text:inputtext});
  }
  render()
  {
 
    return(
      <View style={styles.container}>
      <Numberinput type='text' placeholder="数字输入框"  changetext2={(value) => this.onchange('test1', value)}></Numberinput>
      <Text>{this.state.test1}</Text>
      <Numberinput type='text' placeholder="数字输入框" disable={true}></Numberinput>
      <Numberinput type='text' placeholder="数字输入框"  size='large' changetext2={(value) => this.onchange('test2', value)}></Numberinput>
      <Text>{this.state.test2}</Text>
      <Numberinput type='text' placeholder="数字输入框"  size='smal' changetext2={(value) => this.onchange('test3', value)}></Numberinput>
      <Text>{this.state.test3}</Text>
      <Numberinput type='text' placeholder="数字输入框"  maxlength={5} changetext2={(value) => this.onchange('test4', value)}></Numberinput>
      <Text>{this.state.test4}</Text>
      <Numberinput type='text' placeholder="数字输入框"  align='center' changetext2={(value) => this.onchange('test5', value)}></Numberinput>
      <Text>{this.state.test5}</Text>
      <Numberinput type='text' placeholder="数字输入框"  align='right'  changetext2={(value) => this.onchange('test6', value)} ></Numberinput>
       {/* <Text>{this.state.text}</Text> */}
       <Text>{this.state.test6}</Text>

       <Textinput placeholder="文本输入框" align='left' changetext2={(value)=>this.onchange('test6',value)}></Textinput>
         
      </View>
    );
  }
}

 
















class test extends Component
{
  test()
  {
    alert('去哪都是泡沫');
  }
  render()
  {
    return(
     <View style={styles.container}>
     <Demo2  
     setBackgroundColor='#BFB'
     buttonName='点我'
     block={()=>this.test()}
     setwidh={80}
     setHeight={40}
     ></Demo2>
      <Numberinput type='text'></Numberinput> 
     </View> 
    );
  }
}


 class demo1 extends Component
{
  _renderCardContent = item => {
    return (
      <ImageBackground style={styles.cardImage} source={item.image}>
        <View style={styles.cardMask}/>
        <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
      </ImageBackground>
    );
  };

  _renderPopupLayerContent = item => {
    const paragraphs = item.content.split('\n');
    return (
      <View style={styles.contentContainer}>
        {paragraphs.map((_, idx) => (
          <Text key={`p-${idx}`} style={styles.contentText}>{'\t' + _}</Text>
        ))}
      </View>
    );
  };

  render() {
    return (
      <MagicMoving
        data={mockedData}
        cardStyle={styles.cardContainer}
        renderCardContent={this._renderCardContent}
        renderPopupLayerContent={this._renderPopupLayerContent}
      />
    );
  }
  
}
 class App extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props)
  {
    super(props)
  this.state={
    h:50,
    w:250,
    texte:''
   
  }
  this._onpr=this._onpr.bind(this)
  // setInterval(() => {
  //   this.setState(previousState => {
  //     return {h:this.state.h+10,w:this.state.w+10};
  //   });
  // }, 1000);
  }
  _onpr()
  {
    
   
   this.setState({texte:'agree'});
   _began.start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>agree</Text>
      
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>{this.state.texte}</Text>
        
        </FadeInView>
        <Button onPress={this._onpr} title="change">使用我</Button>
         {/* <Button onPress={()=>navigate('Demo1',{name:'wuhaowei'})} title='跳转'></Button>  */}
       
         
      </View>
    );
  }
}


class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
     // 透明度初始值设为0
  }

  componentDidMount() {
   _began= Animated.spring(                  // 随时间变化而执行动画
      this.state.fadeAnim,            // 动画中的变量值
      {
        bounciness:30,
        toValue: 1,    
        speed:6,               // 透明度最终变为1，即完全不透明
        //duration: 1000,              // 让动画持续一段时间
      }
    )                     // 开始执行动画
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  cardContainer: {
    marginTop: 20,
    marginHorizontal: 20
  },
  cardImage: {
    width: 335,
    height: 200
  },
  cardMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  titleText: {
    zIndex: 1,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF'
  },
  contentContainer: {
    marginBottom: 20,
    paddingHorizontal: 20
  },
  contentText: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 20,
    color: '#333'
  }
});
