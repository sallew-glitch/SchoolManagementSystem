import React from 'react';

import {Card, Heading, Text, HStack, LinkText, Icon, ArrowRightIcon} from '@gluestack-ui/themed';

import { Link } from '@gluestack-ui/themed';

function SyllabusCard( props ) {
  return (

    <Card size="md" variant="outline" bg='$backgroundLight50' m="$3">
      <Heading mb="$1" size="md" color='$textLight950'>
        {props.subject}
      </Heading>
      <Text 
        color='$textLight950'
        size="sm"
        >Start building your next project in minutes</Text>

      <Link href="https://gluestack.io/">
        <HStack alignItems="center">
          <LinkText
            size="md"
            fontFamily="$heading"
            fontWeight="$semibold"
            color="$primary500"
            $dark-color="$primary300"
            textDecorationLine="none"
          >
            View Syllabus
          </LinkText>
          <Icon
            as={ArrowRightIcon}
            // size="sm"
            color="$primary600"
            mt="$0.5"
            ml="$0.5"
            $dark-color="$primary300"
          />
        </HStack>
      </Link>
    </Card>
      
  )
}

export default SyllabusCard