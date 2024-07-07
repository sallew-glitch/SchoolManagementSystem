import {Button, ButtonText} from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

function AgeReport( props ) {

  const generatePDF = async () => {

    const tableData = vals.map((el, index) => {
      console.log(el);
      console.log('el');

      return `<tr>
        ${el.map((keys, ind) => {
          return `<td>${keys}</td>`
        })}
      </tr>`
    })
      
      let options = {
        html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Age Statistics</title>
                  <style>
                      table {
                          width: 100%;
                          border-collapse: collapse;
                          margin: 20px 0;
                      }
                      th, td {
                          border: 1px solid #ddd;
                          padding: 8px;
                          text-align: center;
                      }
                      th {
                          background-color: white;
                          font-weight: normal;
                      }
                  </style>
              </head>
              <body>
              
              <h1>Age Report</h1>
              
              <div id="tables-container">
              <table>
                  <tr>
                      ${headings.map((el, index) => {
                        return`<th>${el}</th>`
                      })}
                  </tr>
                  
                  ${tableData}
                  
              </table>
              </div>            
              </body>
              </html>`,
        fileName: 'AgeReport',
        directory: 'Documents',
      };
  
      let file = await RNHTMLtoPDF.convert(options);
      // console.log(file.filePath);
      alert(file.filePath);
    };

  const headings = ['Reg No', 'Name', 'Father Name', 'DOB', 'Age', 'Total Boys/Girls'];

  var vals = [];

  var i = 0;
  props.students.forEach((el) => {
    vals.push(Object.values(el));
    var dob = new Date(el.DOB);
    var age = Math.abs(new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970);
    vals[i].push(age);
    vals[i].push(age);
    i++;
  });

  console.log(vals);
  console.log("vals");

  const widths = [50, 100, 100, 120, 50, 50];

  return (
    // <View style={styles.container}>
    //   <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
    //     <Row data={headings} style={styles.head} textStyle={styles.text}/>
    //     <Rows data={vals} textStyle={styles.text}/>
    //   </Table>
    // </View>

    <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: 'transparent'}}>
              <Row data={headings} widthArr={widths} style={styles.header} textStyle={styles.textHead}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: 'transparent'}}>
                {
                  vals.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widths}
                      style={[styles.row, index%2 && {backgroundColor: '#F0F0F0'}]}
                      textStyle={styles.textBody}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        <Button m={10}  onPress={generatePDF}>
          <ButtonText>GENERATE PDF</ButtonText>
        </Button>
      </View>
  );
}

export default AgeReport;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   head: { height: 40, backgroundColor: '#f1f8ff' },
//   text: { margin: 6, color: "#000000" }
// });

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { height: 50 },
  textHead: { textAlign: 'center', fontWeight: '300', color: '#a0a0a0' },
  textBody: { textAlign: 'center', fontWeight: '400', color: "#000000" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: 'transparent' }
});