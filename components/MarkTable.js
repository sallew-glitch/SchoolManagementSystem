import { HStack, VStack, View, Text } from '@gluestack-ui/themed';
import React from 'react';
import { DataTable } from 'react-native-paper';
import { Plus, Pencil } from 'lucide-react-native';

function MarkTable( props ) {
    console.log(props.marks);
    console.log("marks");

    return (
        <View>
            {/* <HStack style={{ margin: 16, alignItems:'center', justifyContent:'space-between' }}>
                <VStack style={{}}>
                    <Text mx="$2" my="$1" style={{justifyContent:'flex-start'}}>Bruno</Text>
                    <Text mx="$2" my="$1" style={{alignSelf:'flex-start'}}>FA21-BCS-001</Text>
                </VStack>
                <HStack style={{alignItems: 'flex-end'}}>
                    <Pencil size={30} color="#000000" style={{marginHorizontal: 10}}/>
                    <Plus size={30} color="#000000" style={{marginHorizontal: 10}}/>
                </HStack>

                {/* <Text mx="$2" style={{textAlign:'left'}}>Bruno</Text>
                <Text mx="$2" style={{textAlign:'left'}}>FA21-BCS-001</Text>
                <Pencil size={30} color="#000000" style={{marginHorizontal: 10}}/>
                <Plus size={30} color="#000000" style={{marginHorizontal: 10}}/>
            </HStack> */}
            <DataTable> 
                <DataTable.Header> 
                    <DataTable.Title>Subject</DataTable.Title> 
                    <DataTable.Title>First Term</DataTable.Title> 
                    <DataTable.Title>Mid Term</DataTable.Title> 
                    <DataTable.Title>Final Term</DataTable.Title> 
                </DataTable.Header> 

                {props.marks.map((element, index) => {
                    console.log(element);
                    console.log(element.subject);
                    console.log(element.first);
                    
                    return (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{element.subject}</DataTable.Cell>
                            <DataTable.Cell>{element.first}</DataTable.Cell>
                            <DataTable.Cell>{element.mid}</DataTable.Cell>
                            <DataTable.Cell>{element.final}</DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
        </View>
    )
}

export default MarkTable