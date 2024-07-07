import { Box, View, HStack, Pressable, Text, Divider } from '@gluestack-ui/themed';
import React, {useState} from 'react'
import MarkTable from '../../components/MarkTable';

function ViewMarks() {
    
    const [current, setCurrent] = useState(true);

    const marks = [
        {subject: "english", first: 48, mid: 42, final: 88},
        {subject: "urdu", first: 45, mid: 26, final: 74},
        {subject: "maths", first: 35, mid: 20, final: 75},
        {subject: "general", first: 41, mid: 45, final: 90},
        {subject: "social", first: 41, mid: 45, final: 90},
        {subject: "islamiyat", first: 41, mid: 45, final: 90},
        {subject: "comp1", first: 41, mid: 45, final: 90},
        {subject: "comp2", first: 41, mid: 45, final: 90},
        {subject: "quran", first: 41, mid: 45, final: 90}
    ]

    const markObjs = [marks, marks, marks];

  return (
    <View>
        <Box my="$5">
            <HStack justifyContent="center" alignItems='center'>
                <Pressable
                    onPress={() => {
                        setCurrent(true);

                    }} p={current ? "$5" : "$1"} bg={current ? "$primary500" : "$backgroundLight0"}>
                    <Text color={current ? "white" : "black"}>Current Year</Text>
                </Pressable>
                <Divider
                orientation="vertical"
                mx="$2.5"
                bg="$emerald500"
                h={15}
                $dark-bg="$emerald400"
                />
                
                <Pressable
                    onPress={() => setCurrent(false)} p={current ? "$1" : "$5"} bg={current ? "$backgroundLight0" : "$primary500"}>
                    <Text color={current ? "black" : "white"}>Previous Years</Text>
                </Pressable>
            </HStack>
        </Box>

        {current ? 
            //current month
            <View>
                <MarkTable marks={marks} />
            </View>

            :
            
            //past months
            <View>
                {markObjs.forEach((markOb) => {
                    <MarkTable marks={markOb} />
                })}
            </View>
        }

    </View>
  )
}

export default ViewMarks