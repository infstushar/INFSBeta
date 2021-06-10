import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Colors from '../../constants/colors';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {FAB,Button,TextInput} from 'react-native-paper';
import {WithLocalSvg}  from 'react-native-svg';


const LoginScreen = props => {
  const [isSignUpClicked, setIsSignUpClicked] = useState(true);
  const [isLoginClicked, setIsLoginlicked] = useState(false);

  /**
   * 
   * @returns Login Code
   */
  const Login = () => {
    const [radioData, setRadioData] = useState(['Remember Me!']);
    const [radioChecked, setRadioChecked] = useState(0);
    const[username,setUserName]=useState('');
    const[password,setPassword]=useState('');
    useEffect(() => {
      setRadioChecked(-1);
    }, []);
    return (
      <View >
        <View style={{marginHorizontal:20}}>
          <TextInput
          style={{fontFamily:'Poppins-Regular'}}
            label="UserName"
            mode="outlined"
            value={username}
            keyboardType='email-address'
            onChangeText={(name)=>setUserName(name)}
            left={<TextInput.Icon name="account" size={23} color="black" />}/>
    </View>
        <View style={{marginTop:10,marginHorizontal:20}}>
        <TextInput
         style={{fontFamily:'Poppins-Regular'}}
           label="Password"
           mode="outlined"
           value={password}
           keyboardType='default'
           onChangeText={(pass)=>setPassword(pass)}
           secureTextEntry
           left={<TextInput.Icon name="lock" size={23} color="black" />}/>
    </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          {radioData.map((data, key) => {
            return (
              <View key={key}>
                {radioChecked == key ? (
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      setRadioChecked(-1);
                    }}>
                    <Icon color='#20BEC9' name="md-checkmark-circle" size={23}></Icon>
                    <Text style={{fontFamily:'Poppins-Regular'}}>{data}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setRadioChecked(key);
                      console.log('Key', key);
                    }}
                    style={styles.btn}>
                    <Icon color='#20BEC9' name="radio-button-off" size={23}></Icon>
                    <Text style={{fontFamily:'Poppins-Regular'}}>{data}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
          <Text
            onPress={() => {
              props.navigation.navigate('ForgotPassword');
            }}
            style={{marginRight: 20, textDecorationLine: 'underline',fontFamily:'Poppins-Regular',color:Colors.textColor}}>
            Forgot Password?
          </Text>
          
        </View>
        <TouchableOpacity 
        onPress={()=>{
            props.navigation.navigate('Dummy')
        }}
        style={{flexDirection:'row', height:50,
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,marginBottom:30,marginTop:20,
        borderRadius:40,backgroundColor:Colors.textColor,}}>
            <Text  style={{flex:1,textAlign:'center',
            paddingLeft:40,color:'white',fontSize:18,
            fontFamily:'Poppins-Regular'}}>Login</Text>
            <View style={{alignItems:'flex-end',
            justifyContent:'flex-end',paddingRight:10}}>
            <Icon  name='md-arrow-forward-circle' color='white' size={33}></Icon>
            </View>
       </TouchableOpacity>
      </View>
    );
  };

  /**
   * 
   * @returns Sign Up Code
   */
  const SignUp = () => {
    const[username,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    return (
      <View >
           <View style={{marginHorizontal:20}}>
          <TextInput
            style={{fontFamily:'Poppins-Regular'}}
            label="UserName"
            mode="outlined"
            value={username}
            onChangeText={(name)=>setUserName(name)}
            left={<TextInput.Icon name="account" size={23} color="black" />}/>
    </View>
    <View style={{marginHorizontal:20,marginTop:10}}>
          <TextInput
           style={{fontFamily:'Poppins-Regular'}}
            label="Email Address"
            mode="outlined"
            value={email}
            onChangeText={(name)=>setEmail(name)}
            left={<TextInput.Icon name="email" size={23} color="black" />}/>
    </View>
    <View style={{marginHorizontal:20,marginBottom:20,marginTop:10}}>
          <TextInput
           style={{fontFamily:'Poppins-Regular'}}
            label="Password"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={(name)=>setPassword(name)}
            left={<TextInput.Icon name="lock" size={23} color="black" />}/>
    </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              
              alignContent: 'center',
              fontFamily:'Poppins-Bold'
            }}>
            By pressing submit you are aggree to our
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              marginVertical: 10,
              alignContent: 'center',
              textDecorationLine: 'underline',
              fontFamily:'Poppins-Regular'
            }}>
            Terms & condition
          </Text>
        </View>
        <TouchableOpacity 
        onPress={()=>{
            props.navigation.navigate('Dummy')
        }}
        style={{flexDirection:'row', height:50,
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,marginBottom:30,marginTop:20,
        borderRadius:40,backgroundColor:Colors.textColor,}}>
            <Text  style={{flex:1,textAlign:'center',
            paddingLeft:40,color:'white',fontSize:18,
            fontFamily:'Poppins-Regular'}}>Sign Up</Text>
            <View style={{alignItems:'flex-end',
            justifyContent:'flex-end',paddingRight:10}}>
            <Icon  name='md-arrow-forward-circle' color='white' size={33}></Icon>
            </View>
       </TouchableOpacity>
      </View>
    );
  };

  /**
   * Main Screen Component Render.
   */
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            marginBottom: 20,
          }}>
          <View>
            {!isSignUpClicked ? (
              <Text
                style={{
                  fontSize: 30,
                  marginTop: '30%',
                  color: 'white',
                  marginHorizontal: 20,
                  fontFamily:'Poppins-Bold'
                }}>
                Welcome!
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 30,
                  marginTop: '30%',
                  color: 'white',
                  marginHorizontal: 20,
                  fontFamily:'Poppins-Bold'
                }}>
                Hello!
              </Text>
            )}
            {!isSignUpClicked ? (
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'white',
                  fontSize: 16,
                  marginVertical: 10,
                  marginBottom: 120,
                  fontFamily:'Poppins-Regular'
                }}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </Text>
            ) : (
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'white',
                  fontSize: 16,
                  marginVertical: 10,
                  marginBottom: 120,
                  fontFamily:'Poppins-Regular'
                }}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text.
              </Text>
            )}
          </View>
        </View>

        <View>
          <Card style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              <View>
                <Text
                  style={{fontSize: 16, color:Colors.textColor, fontFamily:'Poppins-Regular'}}
                  onPress={() => {
                    setIsLoginlicked(true);
                    setIsSignUpClicked(false);
                  }}>
                  Login
                </Text>
                {isLoginClicked ? (
                  <View
                    style={{
                      width: 50,
                      height: 2,
                      marginTop: 5,
                      backgroundColor: Colors.textColor,
                    }}></View>
                ) : null}
              </View>

              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{fontSize: 16, color:Colors.textColor, fontFamily:'Poppins-Regular'}}
                  onPress={() => {
                    setIsLoginlicked(false);
                    setIsSignUpClicked(true);
                  }}>
                  SignUp
                </Text>
                {isSignUpClicked ? (
                  <View
                    style={{
                      width: 60,
                      height: 2,
                      marginTop: 5,
                      backgroundColor: Colors.textColor,
                    }}></View>
                ) : null}
              </View>
            </View>
            <View style={{alignSelf:'baseline',width:'100%'}}>{isLoginClicked ? <Login /> : <SignUp />}</View>
          </Card>
        </View>
      </View>
      <View
        style={{
         
          justifyContent:'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>

     <View 
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginRight:20,
        }}>

         <TouchableOpacity style={{flex:0.7,marginTop:20}}> 
          <WithLocalSvg
             asset={require('../../assets/facebook.svg')} />
             </TouchableOpacity>
             
             <TouchableOpacity> 
             <WithLocalSvg
             asset={require('../../assets/google.svg')}/>
             </TouchableOpacity>
             </View>
          {/*<WithLocalSvg
              width="50"
              height="80"
              asset={require('../../assets/facebook.svg')}
             />
             <WithLocalSvg
              width="50"
              height="50"
              asset={require('../../assets/google.svg')}
          />
        <FAB
          style={styles.socialButton}
          small
          color="#222"
          icon="facebook"
          onPress={() => console.log('Pressed')}
        />
        <FAB
          style={styles.socialButton}
          small
          icon="google"
          color="#222"
          onPress={() => console.log('Pressed')}
          />*/}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: -100,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  fab: {
    right: 0,
    bottom: 0,
    marginTop: -30,
    backgroundColor: 'white',
    elevation: 10,
  },
  fabS: {
    right: 0,
    bottom: 0,
    marginTop: -48,
    elevation: 10,
    backgroundColor: '#4e4e4e',
  },
  submitButton: {
    bottom: 0,
    left: 0,
  },
  socialButton: {
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});

export default LoginScreen;