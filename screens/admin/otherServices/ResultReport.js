import {Button, ButtonText, Text} from '@gluestack-ui/themed';
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

function ResultReport(props) {
  const classes = [
    {
      className: 'Nursery',
      students: [
        {
          regNo: '59',
          marks: [
            {
              firstTerm: '25',
              midTerm: '49',
              finalTerm: '78',
              name: 'English',
            },
            {firstTerm: '26', midTerm: '48', finalTerm: '79', name: 'Urdu'},
            {firstTerm: '27', midTerm: '47', finalTerm: '80', name: 'Math'},
            {
              firstTerm: '27',
              midTerm: '47',
              finalTerm: '80',
              name: 'Nazran e Quran',
            },
          ],
        },
        {
          regNo: '66',
          marks: [
            {
              firstTerm: '35',
              midTerm: '40',
              finalTerm: '81',
              name: 'English',
            },
            {firstTerm: '25', midTerm: '49', finalTerm: '77', name: 'Urdu'},
            {firstTerm: '30', midTerm: '46', finalTerm: '88', name: 'Math'},
            {
              firstTerm: '27',
              midTerm: '47',
              finalTerm: '80',
              name: 'Nazran e Quran',
            },
          ],
        },
      ],
    },
    {
      className: 'Prep',
      students: [
        {
          regNo: '52',
          marks: [
            {
              firstTerm: '25',
              midTerm: '49',
              finalTerm: '78',
              name: 'English',
            },
            {firstTerm: '26', midTerm: '48', finalTerm: '79', name: 'Urdu'},
            {firstTerm: '27', midTerm: '47', finalTerm: '80', name: 'Math'},
            {
              firstTerm: '27',
              midTerm: '47',
              finalTerm: '80',
              name: 'Nazran e Quran',
            },
            {
              firstTerm: '36',
              midTerm: '40',
              finalTerm: '90',
              name: 'General Knowledge',
            },
          ],
        },
        {
          regNo: '65',
          marks: [
            {
              firstTerm: '35',
              midTerm: '40',
              finalTerm: '81',
              name: 'English',
            },
            {firstTerm: '25', midTerm: '49', finalTerm: '77', name: 'Urdu'},
            {firstTerm: '30', midTerm: '46', finalTerm: '88', name: 'Math'},
            {
              firstTerm: '27',
              midTerm: '47',
              finalTerm: '80',
              name: 'Nazran e Quran',
            },
            {
              firstTerm: '31',
              midTerm: '39',
              finalTerm: '80',
              name: 'General Knowledge',
            },
          ],
        },
      ],
    },
  ];

  const generatePDF = async () => {

    const tableData = marksStatistics.map((obj, ind) => {

      var firstClassRow = true;
    
    return obj.stats.map((el, index) => {

      console.log(el);

        return `<tr>
                                ${
                                  firstClassRow
                                    ? `<td className="className" rowspan="${obj.stats.length * 3}">${obj.className}</td>`
                                    : ``
                                }
                                ${(firstClassRow = false)}
                                
                                <td rowspan="3">${el.name}</td>
                                <td>High</td>
                                <td>${el.firstTerm.highest}</td>
                                <td>${el.midTerm.highest}</td>
                                <td>${el.finalTerm.highest}</td>
                            </tr>
                            
                            <tr>

                                <td>Low</td>
                                <td>${el.firstTerm.lowest}</td>
                                <td>${el.midTerm.lowest}</td>
                                <td>${el.finalTerm.lowest}</td>

                            </tr>
                
                            <tr>

                                <td>Average</td>
                                <td>${el.firstTerm.average}</td>
                                <td>${el.midTerm.average}</td>
                                <td>${el.finalTerm.average}</td>

    //                         </tr>`;
      
    })})

    let options = {
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Marks Statistics</title>
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
                    .className, #clr {
                        background-color: #a2bae5;
                    }
                </style>
            </head>
            <body>
            
            <h1>Result Report</h1>
            
            <div id="tables-container">
            <table>
                <tr>
                    <th colspan="3" id="clr" >Classes</th>
                    <th>First</th>
                    <th>Mid</th>
                    <th>Final</th>
                </tr>
                
                ${tableData}
                
            </table>
            </div>            
            </body>
            </html>`,
      fileName: 'ResultReport',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  };

  var classNames = [];

  var i = 0;
  classes.forEach(el => {
    if (!classNames.includes(el.className)) {
      classNames.push(el.className);
    }
  });

  console.log('Classes : ' + classNames);

  function calculateMarksStats(classes) {
    let classStats = [];

    classes.forEach(cls => {
      let marksData = {};

      cls.students.forEach(student => {
        student.marks.forEach(mark => {
          if (!marksData[mark.name]) {
            marksData[mark.name] = {
              firstTerm: [],
              midTerm: [],
              finalTerm: [],
            };
          }
          marksData[mark.name].firstTerm.push(parseInt(mark.firstTerm));
          marksData[mark.name].midTerm.push(parseInt(mark.midTerm));
          marksData[mark.name].finalTerm.push(parseInt(mark.finalTerm));
        });
      });

      let stats = [];
      for (let name in marksData) {
        let firstTermMarks = marksData[name].firstTerm;
        let midTermMarks = marksData[name].midTerm;
        let finalTermMarks = marksData[name].finalTerm;

        stats.push({
          name: name,
          firstTerm: {
            highest: Math.max(...firstTermMarks),
            lowest: Math.min(...firstTermMarks),
            average: (
              firstTermMarks.reduce((a, b) => a + b, 0) / firstTermMarks.length
            ).toFixed(2),
          },
          midTerm: {
            highest: Math.max(...midTermMarks),
            lowest: Math.min(...midTermMarks),
            average: (
              midTermMarks.reduce((a, b) => a + b, 0) / midTermMarks.length
            ).toFixed(2),
          },
          finalTerm: {
            highest: Math.max(...finalTermMarks),
            lowest: Math.min(...finalTermMarks),
            average: (
              finalTermMarks.reduce((a, b) => a + b, 0) / finalTermMarks.length
            ).toFixed(2),
          },
        });
      }

      classStats.push({
        className: cls.className,
        stats: stats,
      });
    });

    return classStats;
  }

  const marksStatistics = calculateMarksStats(classes);
  console.log('HEREEEEEEEE');
  console.log(marksStatistics);

  function findSubjectsInClasses(classes) {
    let classSubjects = [];

    classes.forEach(cls => {
      let names = new Set();

      cls.students.forEach(student => {
        student.marks.forEach(mark => {
          names.add(mark.name);
        });
      });

      classSubjects.push({
        className: cls.className,
        names: Array.from(names),
      });
    });

    return classSubjects;
  }

  const newSubs = findSubjectsInClasses(classes);

  var tableData = [['First'], ['Mid'], ['Final']];

  marksStatistics.forEach(el => {
    el.stats.forEach(stat => {
      tableData[0].push(stat.firstTerm.highest);
      tableData[0].push(stat.firstTerm.lowest);
      tableData[0].push(stat.firstTerm.average);
      tableData[1].push(stat.midTerm.highest);
      tableData[1].push(stat.midTerm.lowest);
      tableData[1].push(stat.midTerm.average);
      tableData[2].push(stat.finalTerm.highest);
      tableData[2].push(stat.finalTerm.lowest);
      tableData[2].push(stat.finalTerm.average);
    });
  });

  var newSubsFlat = [];

  var totalLength = 0;
  newSubs.forEach(el => {
    totalLength += el.names.length;
    newSubsFlat.push(el.names);
  });

  newSubsFlat = newSubsFlat.flat();

  var newTest = new Array(totalLength).fill(['High', 'Low', 'Average']);
  newTest = newTest.flat();
  console.log(newTest);

  var marksHeights = new Array(totalLength * 3).fill(25);
  marksHeights.unshift(40);

  //   new Array(classNames.length).fill(totalLength * 75)

  var classHeightArray = [];
  newSubs.forEach(el => {
    classHeightArray.push(el.names.length * 75);
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* Left Wrapper */}
          <TableWrapper style={{flex: 2}}>
            <Cell
              data="Classes"
              style={styles.singleHead}
              textStyle={{color: '#000000', alignSelf: 'center'}}
            />
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col
                data={classNames}
                style={styles.head}
                heightArr={classHeightArray}
                textStyle={styles.text}
              />
              <Col
                data={newSubsFlat}
                style={styles.title}
                heightArr={new Array(totalLength).fill(75)}
                textStyle={styles.titleText}></Col>
              <Col
                data={newTest}
                style={styles.title}
                heightArr={new Array(totalLength * 3).fill(25)}
                textStyle={styles.titleText}></Col>
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{flex: 1}}>
            <Cols
              style={{width: 50}}
              data={tableData}
              heightArr={marksHeights}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </ScrollView>

      <Button m={10}  onPress={generatePDF}>
        <ButtonText>GENERATE PDF</ButtonText>
      </Button>
    </View>
  );
}

export default ResultReport;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 5, backgroundColor: '#fff'},
  singleHead: {height: 40, backgroundColor: '#c8e1ff'},
  head: {flex: 1, backgroundColor: '#c8e1ff'},
  title: {flex: 2, backgroundColor: '#f6f8fa'},
  titleText: {marginRight: 6, textAlign: 'center', color: '#000000'},
  text: {textAlign: 'center', color: '#000000'},
  btn: {
    width: 58,
    height: 18,
    marginLeft: 15,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText: {textAlign: 'center'},
});
