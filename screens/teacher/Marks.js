import React from 'react';

import { View, HStack, VStack, Text} from '@gluestack-ui/themed';

import MarkTable from '../../components/MarkTable';

import { Plus, Pencil } from 'lucide-react-native';

function Marks({ navigation }) {

  const marks = [
    {subject: 'english', first: 48, mid: 42, final: 88},
    {subject: 'urdu', first: 45, mid: 26, final: 74},
    {subject: 'maths', first: 35, mid: 20, final: 75},
    {subject: 'general', first: 41, mid: 45, final: 90},
    {subject: 'social', first: 41, mid: 45, final: 90},
    {subject: 'islamiyat', first: 41, mid: 45, final: 90},
    {subject: 'comp1', first: 41, mid: 45, final: 90},
    {subject: 'comp2', first: 41, mid: 45, final: 90},
    {subject: 'quran', first: 41, mid: 45, final: 90},
  ];

  const subjects = [
    "English",
    "Math",
    "Urdu",
    "General Knowledge",
    "Social Studies",
    "Islamiyat"
  ]

  return (
    <View>

      <HStack
        style={{
          margin: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <VStack style={{}}>
          <Text mx="$2" my="$1" style={{justifyContent: 'flex-start'}}>
            Bruno
          </Text>
          <Text mx="$2" my="$1" style={{alignSelf: 'flex-start'}}>
            FA21-BCS-001
          </Text>
        </VStack>
        <HStack style={{alignItems: 'flex-end'}}>
          <Pencil size={30} color="#000000" style={{marginHorizontal: 10}} onPress={() => console.log("")} />
          <Plus size={30} color="#000000" style={{marginHorizontal: 10}} onPress={navigation.navigate('AddMarks', {subjects: subjects})} />
        </HStack>
      </HStack>

      <MarkTable marks={marks} />
    </View>
  );
}

export default Marks;
