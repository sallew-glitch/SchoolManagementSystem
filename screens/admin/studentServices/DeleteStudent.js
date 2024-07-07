import React, {useState, useRef} from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  VStack,
  Center,
  Select,
  Box,
  SelectItem,
  SelectTrigger,
  SelectIcon,
  SelectInput,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectPortal,
  Icon,
  ChevronDownIcon,
  ScrollView,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';
import ViewCard from '../../../components/ViewCard';
import firestore from '@react-native-firebase/firestore';

const DeleteFees = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  const [regNo, setRegNo] = useState('');

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  console.log('REG NO: ', regNo);

  const studentData = data.students.find(student => student.regNo === regNo);

  console.log('Student Data: ', studentData);

  const studentDisplayRef = useRef(null);

  const deleteStudents = async () => {
    try {
      const studentRef = firestore().collection('students').doc(regNo[1]);
      const studentGet = await studentRef.get();

      const studentClassRef = studentGet.data().admissionClass;
      const studentClassGet = await studentClassRef.get();

      if (!studentRef) throw Error('Student Does not exist');
      if (!studentClassRef)
        throw Error('Student registered class does not exist');

      await studentRef.delete();

      var oldStudentArray =
        studentClassGet.data().students &&
        studentClassGet.data().students.length !== 0
          ? studentClassGet.data().students
          : [];

      oldStudentArray = oldStudentArray.filter(
        student => student.regNo !== parseInt(regNo),
      );

      await studentClassRef.update({
        students: oldStudentArray,
      });

      setResultModal(true);
      setResultText('Student Deleted');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const studentElements = data.students.map(student => {
    return (
      <SelectItem label={student.regNo} value={[student.regNo, student._id]} />
    );
  });

  console.log('FEES DATA:', studentData);

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={deleteStudents}
        actionText={'Delete'}
        heading="Delete Student">
        <FormControl isRequired>
          <Select
            selectedValue={regNo}
            onValueChange={regNo => setRegNo(regNo)}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder={
                  regNo.length !== 0 ? ' ' + regNo[0] : 'Select Registratio no'
                }
              />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <ScrollView>{studentElements}</ScrollView>
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>
      </ModalCustom>

      <ModalCustom
        action={() => setResultModal(false)}
        actionText={'OK'}
        heading={'Alert'}
        showModal={resultModal}
        setShowModal={setResultModal}
        ref={resultRef}>
        <Box>
          <Text>{resultText}</Text>
        </Box>
      </ModalCustom>
    </Box>
  );
};

export default DeleteFees;
