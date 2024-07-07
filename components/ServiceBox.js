import React from 'react';
import {VStack, Card, Text} from '@gluestack-ui/themed';

const ServiceBox = ({Icon, text, action}) => {
  return (
    <VStack alignItems="center" mx="$2" my="$1">
      <Card
        size="md"
        variant="elevated"
        bg="$textLight0"
        p="$2"
        rounded="$lg"
        mb="$2">
        {Icon}
      </Card>
      <Text size="sm">{text}</Text>
    </VStack>
  );
};

export default ServiceBox;
