import React, {useLayoutEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Index from '..';
import Header from '../../components/Header';
import AgeReport from './otherServices/AgeReport';
import AnotherAgeReport from './otherServices/AnotherAgeReport';
import ResultReport from './otherServices/ResultReport';
import {LogOut, Home} from 'lucide-react-native';
import {AuthContext} from '../../auth/AuthContext';

const Tab = createBottomTabNavigator();

const AdminDashboard = ({navigation}) => {
  const {setUser} = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const students = [
    {regNo: "59", name: "Muhammad Nauman", fatherName: "Muhammad Zahid", DOB: "Wed May 27 2015"},
    {regNo: "66", name: "Muhammad Salahuddin", fatherName: "Sajjad Ahmed", DOB: "Fri May 22 2015"}
  ]

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Index"
        options={{
          title: 'Logout',
          tabBarIcon: ({color, size}) => <LogOut color={color} size={size} />,
        }}
        component={({navigation}) => {
          setUser(null);
          navigation.popToTop();
        }}
      />
      <Tab.Screen name="Age Report">
        {(props) => <AgeReport {...props} students={students} />}
      </Tab.Screen>
      <Tab.Screen name="Result Report">
        {(props) => <ResultReport {...props} students={students} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AdminDashboard;
