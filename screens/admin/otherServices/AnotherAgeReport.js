import {ScrollView, View, Text} from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component';

function AnotherAgeReport( props ) {

  return (
    <View style={styles.container}>
      {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={headings} style={styles.head} textStyle={styles.text}/>
        <Rows data={vals} textStyle={styles.text}/>
      </Table> */}

      <DataTable> 
                <DataTable.Header> 
                    <DataTable.Title style={{flex:1}}>Reg No</DataTable.Title> 
                    <DataTable.Title style={{flex:4}}>Name</DataTable.Title> 
                    <DataTable.Title style={{flex:4}}>Father Name</DataTable.Title> 
                    <DataTable.Title style={{flex:4}}>DOB</DataTable.Title>
                    <DataTable.Title style={{flex:1}}>Age</DataTable.Title>
                    <DataTable.Title style={{flex:2}}>Total Boys/Girls</DataTable.Title>
                </DataTable.Header> 


        {props.students.map((element, index) => {
          console.log(element);

          var dob = new Date(element.DOB);
          var monthDiff = Date.now() - dob.getTime();
          var ageDate = new Date(monthDiff);
          var age = Math.abs(ageDate.getUTCFullYear() - 1970);

          return (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{padding: 2, flex:1}}>{element.regNo}</DataTable.Cell>
              <DataTable.Cell style={{padding: 2, flex:4}}>{element.name}</DataTable.Cell>
              <DataTable.Cell style={{padding: 2, flex:4}}>{element.fatherName}</DataTable.Cell>
              <DataTable.Cell style={{padding: 2, flex:4}}>{element.DOB}</DataTable.Cell>
              <DataTable.Cell style={{padding: 2, flex:1}}>{age}</DataTable.Cell>
              <DataTable.Cell style={{padding: 2, flex:2}}>{age}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
        </DataTable>
    </View>
  );
}

export default AnotherAgeReport;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: "#000000" }
});