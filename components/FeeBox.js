import { Box, VStack, Text, HStack } from '@gluestack-ui/themed'
import React from 'react'

function FeeBox(props) {
  return (
    <Box p="$3" bg='$blue200' rounded="$3xl">
        <VStack justifyContent='center'>
            <VStack p="$4">
                <Text>Amount Due : {props.fee.amountDue}</Text>
                <Text>Amount Paid : {props.fee.amountPaid}</Text>
            </VStack>

            <VStack p="$4">
                <Text>Payable Amount : {props.fee.payableAmount} - {props.fee.amountDue - props.fee.amountPaid}</Text>
            </VStack>

            <VStack p="$4">
                <Text>Payment Date : {props.fee.paymentDate}</Text>
            </VStack>

            <VStack p="$4">
                <Text>Late Fees : {props.fee.late}</Text>
            </VStack>

            <VStack p="$4">
                <Text>Remarks : {props.fee.remarks}</Text>
            </VStack>
        </VStack>
    </Box>
  )
}

export default FeeBox