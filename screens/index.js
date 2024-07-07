import React from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import {
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Box,
  Center,
} from '@gluestack-ui/themed';
import {CircleUser, LibraryBig, LockKeyhole, LogOut} from 'lucide-react-native';

function Index({navigation}) {
  return (
    <Box style={styles.container}>
      <Center>
        <Heading color="primary0" style={styles.heading}>
          Welcome to SMS
        </Heading>
        <Image
          source={require('../assets/index_Image.jpg')}
          style={styles.image}
        />
        <Box style={styles.body}>
          <Box style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.navigate('Login', {type: 'admin'})}
              borderRadius={20}
              w={150}
              h={120}
              size="lg">
              <ButtonIcon marginHorizontal={5} as={LockKeyhole} />
              <ButtonText>Admin</ButtonText>
            </Button>
          </Box>

          <Box style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.navigate('Login', {type: 'student'})}
              borderRadius={20}
              w={150}
              h={120}
              size="lg">
              <ButtonIcon marginHorizontal={5} as={LibraryBig} />
              <ButtonText>Student</ButtonText>
            </Button>
          </Box>

          <Box style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.navigate('Login', {type: 'teacher'})}
              borderRadius={20}
              w={150}
              h={120}
              size="lg">
              <ButtonIcon marginHorizontal={5} as={CircleUser} />
              <ButtonText>Teacher</ButtonText>
            </Button>
          </Box>

          <Box style={styles.buttonContainer}>
            <Button borderRadius={20} w={150} h={120} size="lg">
              <ButtonIcon marginHorizontal={5} as={LogOut} />
              <ButtonText>Exit</ButtonText>
            </Button>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    marginVertical: 30,
    marginBottom: 10,
    fontSize: 36,
    padding: 10,
  },
  image: {
    marginVertical: 10,
    width: 300,
    height: 200,
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
});

export default Index;
