import {React, useState, useEffect, useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Heading,
  Button,
  ButtonText,
  ButtonIcon,
  Box,
  VStack,
  Center,
} from '@gluestack-ui/themed';
import FormControlCustom from '../components/FormControlCustom';
import {EyeIcon, MailCheck, User} from 'lucide-react-native';
import {AuthContext} from '../auth/AuthContext';

//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation, route}) => {
  const {user, loading, setUser} = useContext(AuthContext);
  const {type} = route.params;

  if (user)
    if (user.role === type) {
      navigation.pop();
      navigation.navigate(
        type === 'student'
          ? 'Student'
          : type === 'teacher'
          ? 'Teacher'
          : 'Admin',
      );
    }

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    try {
      if (type !== 'student') {
        const userCredential = await auth().signInWithEmailAndPassword(
          identity,
          password,
        );
        const {uid, email: userEmail} = userCredential.user;
        const userDoc = await firestore().collection('users').doc(uid).get();

        if (userDoc && type === userDoc.data().role) {
          setUser({
            uid: uid,
            email: userEmail,
            role: userDoc.data().role,
          });
          navigation.navigate(
            userDoc.data().role === 'admin' ? 'Admin' : 'Teacher',
          );
        } else {
          throw Error();
        }
      } else {
        const userDoc = await firestore()
          .collection('users')
          .where('regNo', '==', parseInt(identity))
          .where('password', '==', password)
          .get();

        const {regNo: studentRegNo} = userDoc.docs[0].data();
        const {uid} = userDoc.docs[0].id;

        if (userDoc.docs && type === userDoc.docs[0].data().role) {
          setUser({
            uid,
            regNo: studentRegNo,
            role: userDoc.docs[0].data().role,
          });
          navigation.navigate('Student');
        } else {
          throw Error();
        }
      }
    } catch (error) {
      console.log('Login Failed: ', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'} enabled>
      <ScrollView>
        <Center>
          <Image source={require('../assets/login.jpg')} style={styles.image} />
          <Heading style={styles.heading}>Login Now</Heading>
          <VStack style={styles.body}>
            <Box style={styles.margining}>
              <FormControlCustom
                label={type !== 'student' ? 'Email' : 'Registration no'}
                type={type !== 'student' ? 'email' : 'numeric'}
                placeholder={type !== 'student' ? 'Email' : 'Registration no'}
                helperText={
                  type !== 'student'
                    ? 'Must be a Registered Email'
                    : 'Must be a valid Registration no'
                }
                value={identity}
                onChange={setIdentity}
                icon={type !== 'student' ? MailCheck : User}
                keyboardType={type === 'student' ? 'numeric' : 'default'}
              />
            </Box>
            <Box style={styles.Lastmargining}>
              <FormControlCustom
                label="Password"
                type="password"
                placeholder="Password"
                helperText="Must be atleast 6 Characters"
                value={password}
                onChange={setPassword}
                icon={EyeIcon}
              />
            </Box>
            <Box style={styles.buttonContainer}>
              <Button
                onPress={handleLogin}
                style={styles.button}
                borderRadius={10}>
                <ButtonText>Login</ButtonText>
              </Button>
              <Text style={styles.note}>
                Note: Login details have been provided by school
              </Text>
            </Box>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    marginVertical: 10,
    width: 300,
    height: 300,
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1C588C',
    height: 50,
    marginBottom: 10,
  },
  body: {
    width: '80%',
  },
  heading: {
    color: '#1C588C',
  },
  margining: {
    marginVertical: 20,
  },
  Lastmargining: {
    marginBottom: 22,
  },
  note: {
    fontSize: 10,
  },
});

export default Login;
