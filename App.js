import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Intro, OnBoarding, QuizGame} from './screen/stack';
import TabMenu from './screen/menu/TabMenu';
import SearchingResults from './screen/stack/SearchingResults';
import {ContextProvider} from './store/context';

const Stack = createNativeStackNavigator();

function App() {
  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 7500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <ContextProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              //backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/image/bg/loader1.png')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('./assets/image/bg/loader2.png')}
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="TabMenu" component={TabMenu} />
            <Stack.Screen
              name="SearchingResults"
              component={SearchingResults}
            />
            <Stack.Screen name="QuizGame" component={QuizGame} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
