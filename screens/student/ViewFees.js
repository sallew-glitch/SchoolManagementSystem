import {
  Box,
  Heading,
  Text,
  VStack,
  View,
  HStack,
  Divider,
  Pressable,
} from '@gluestack-ui/themed';
import React, {useState, useEffect} from 'react';
import FeeBox from '../../components/FeeBox';

function ViewFees() {
  const [current, setCurrent] = useState(true);

  const fee = {
    amountDue: 1000,
    amountPaid: 950,
    payableAmount: this.amountDue - this.amountPaid,
    paymentDate: '24th May, 2024',
    late: true,
    remarks: '',
  };

  const feeObjs = [fee, fee, fee];

  return (
    <View>
      <Box
        p="$5"
        alignItems="center"
        bg="$blue700"
        style={{borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}>
        <VStack justifyContent="center" alignItems="center">
          <Text color="$textLight50" size="md">
            Your Balance Is :{' '}
          </Text>
          <HStack justifyContent="center" alignItems="center">
            <Heading py="$5" mx="$2" color="$textLight50" size="xl">
              PKR 9,999.00
            </Heading>
            <Text size="sm" paddingStart="$5" bold color="white">
              UNPAID
            </Text>
          </HStack>
          <Text color="$textLight50" size="md">
            5th June 2024, Monday
          </Text>
        </VStack>
      </Box>

      <Box my="$5">
        <HStack justifyContent="center" alignItems="center">
          <Pressable
            onPress={() => {
              setCurrent(true);
            }}
            p={current ? '$5' : '$1'}
            bg={current ? '$primary500' : '$backgroundLight0'}>
            <Text color={current ? 'white' : 'black'}>Current Month</Text>
          </Pressable>
          <Divider
            orientation="vertical"
            mx="$2.5"
            bg="$emerald500"
            h={15}
            $dark-bg="$emerald400"
          />

          <Pressable
            onPress={() => setCurrent(false)}
            p={current ? '$1' : '$5'}
            bg={current ? '$backgroundLight0' : '$primary500'}>
            <Text color={current ? 'black' : 'white'}>Past Months</Text>
          </Pressable>
        </HStack>
      </Box>

      {current ? (
        //current month
        <View>
          <FeeBox fee={fee} />
        </View>
      ) : (
        //past months
        <View>
          {feeObjs.forEach(feeOb => {
            console.log(feeOb.amountDue);
            <FeeBox fee={feeOb} />;
          })}
        </View>
      )}
    </View>
  );
}

export default ViewFees;
