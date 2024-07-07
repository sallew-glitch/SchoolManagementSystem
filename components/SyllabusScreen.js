import React from 'react'
import SyllabusCard from './SyllabusCard'
import { ScrollView } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/themed';

function SyllabusScreen(props) {
  return (
    <ScrollView my="$3">
        <VStack>
            <SyllabusCard subject={props.subjects[0]} />
            <SyllabusCard subject={props.subjects[1]} />
            <SyllabusCard subject={props.subjects[2]} />
            <SyllabusCard subject={props.subjects[3]} />
            <SyllabusCard subject={props.subjects[4]} />
            <SyllabusCard subject={props.subjects[5]} />
            <SyllabusCard subject={props.subjects[6]} />
            <SyllabusCard subject={props.subjects[7]} />
            <SyllabusCard subject={props.subjects[8]} />
        </VStack>
    </ScrollView>
  )
}

export default SyllabusScreen