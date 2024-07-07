import React from 'react';

import {
  Card,
  Heading,
  Text,
  HStack,
  LinkText,
  Button,
  ButtonText,
  Icon,
  ArrowRightIcon,
  ScrollView,
} from '@gluestack-ui/themed';
import {DataTable} from 'react-native-paper';

import {Link} from '@gluestack-ui/themed';

function ViewCard({itemsData, heading, setState, actionText, action}) {
  const data = itemsData;

  console.log('INSIDE');

  console.log('DATA IS PASSED, ', data);
  var elements = [];

  for (var key in data) {
    if (typeof data[key] === 'object') continue;
    console.log('FEES STATUS: ', data[key]);
    elements.push(
      <DataTable.Row>
        <DataTable.Title>{key}</DataTable.Title>
        <DataTable.Cell>{'' + data[key]}</DataTable.Cell>
      </DataTable.Row>,
    );
  }

  return (
    <Card size="md" variant="outline" bg="$backgroundLight50" m="$3">
      <Heading mb="$1" size="md" color="$textLight950">
        {heading}
      </Heading>

      <DataTable>
        <ScrollView>{elements}</ScrollView>
      </DataTable>
      <HStack mt="$3" reversed={true}>
        <Button
          size="sm"
          onPress={() => {
            setState(data._id);
            action();
          }}>
          <ButtonText>{actionText}</ButtonText>
        </Button>
      </HStack>
    </Card>
  );
}

export default ViewCard;
