import React from 'react';
import {Box, HStack, Center, Text} from '@gluestack-ui/themed';
import {StyleSheet, SafeAreaView} from 'react-native';

const Header = props => {
  return (
    <SafeAreaView style={styles.container}>
      <HStack>
        <Text>{props.children}</Text>
      </HStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: '#1C588C',
  },
});

export default Header;
