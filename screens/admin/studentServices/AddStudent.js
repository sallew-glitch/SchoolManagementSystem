import React, {useState, useRef} from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  VStack,
  Center,
  Box,
  Select,
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
  Text,
} from '@gluestack-ui/themed';
import {CloseIcon} from '@gluestack-ui/themed';
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from '../../../contexts/FirebaseContext';

const AddStudent = ({showModal, setShowModal, ref}) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  console.log('Clicked');
  const [regNo, setRegNo] = useState('');
  const [dateOfReg, setDateOfReg] = useState(new Date());
  const [studentName, setStudentName] = useState('');
  const [DOB, setDOB] = useState(new Date());
  const [gender, setGender] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [caste, setCaste] = useState('');
  const [occupation, setOccupation] = useState('');
  const [residence, setResidence] = useState('');
  const [admissionClass, setAdmissionClass] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remarks, setRemarks] = useState('');

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  const classElements = data.classes.map(Class => {
    return <SelectItem label={Class.className} value={Class._id} />;
  });

  const addStudent = async () => {
    try {
      const Class = firestore().collection('classes').doc(admissionClass);
      const classData = await Class.get();

      const studentToAdd = {
        regNo: parseInt(regNo),
        dateOfReg: dateOfReg.toDateString(),
        DOB: DOB.toDateString(),
        gender: gender,
        fatherName: fatherName,
        caste: caste,
        occupation: occupation,
        residence: residence,
        admissionClass: Class,
        name: studentName,
        email: email,
        password: password,
        remarks: remarks,
        fees: [],
      };

      if (
        Object.values(studentToAdd).some(
          value => value === null || value === undefined || value === '',
        )
      ) {
        throw new Error('All fields must be filled');
      }

      if (data.students.find(student => student.regNo == regNo))
        throw new Error('Student already Exists');

      const doc = await firestore().collection('students').add(studentToAdd);

      const user = await firestore()
        .collection('users')
        .add({
          regNo: parseInt(regNo),
          password: password,
          role: 'student',
        });

      var studentArray =
        classData.data().students && classData.data().students.length !== 0
          ? classData.data().students
          : [];

      studentArray.push({
        marks: classData.data().subjects.map(subject => {
          return {
            finalTerm: 0,
            firstTerm: 0,
            midTerm: 0,
            subject: subject.name,
          };
        }),
        regNo: parseInt(regNo),
        student: doc,
      });

      await Class.update({
        students: studentArray ? studentArray : [],
      });

      if (!doc) {
        throw Error('Student not able to be created');
      }

      setResultModal(true);
      setResultText('Student added');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  return (
    <Box>
      <ModalCustom
        action={addStudent}
        actionText={'Add'}
        heading="Add Student"
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}>
        <VStack space="lg">
          <FormControlCustom
            type={'numeric'}
            value={regNo}
            onChange={setRegNo}
            keyboardType="numeric"
            label="Registration No"
            required={true}
          />

          <FormControl isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText>Date of Admission</FormControlLabelText>
            </FormControlLabel>
            <Center>
              <DatePicker
                date={dateOfReg}
                mode="date"
                onDateChange={date => setDateOfReg(date)}
                onConfirm={date => {
                  setDateOfReg(date);
                }}
              />
            </Center>
          </FormControl>
          <FormControlCustom
            type={'text'}
            value={studentName}
            onChange={setStudentName}
            label={'Student Name'}
            required={true}
          />
          <FormControl isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText>Date of Birth</FormControlLabelText>
            </FormControlLabel>
            <Center>
              <DatePicker
                date={DOB}
                mode="date"
                onDateChange={date => setDOB(date)}
                onConfirm={date => {
                  setDOB(date);
                }}
              />
            </Center>
          </FormControl>
          <FormControlCustom
            type={'text'}
            value={gender}
            onChange={setGender}
            label={'Gender'}
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={fatherName}
            onChange={setFatherName}
            label={'Father Name'}
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={caste}
            onChange={setCaste}
            label={'Caste'}
          />
          <FormControlCustom
            type={'text'}
            value={occupation}
            onChange={setOccupation}
            label={'Occupation'}
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={residence}
            onChange={setResidence}
            label={'Residence'}
            required={true}
          />
          <FormControl isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Admission Class</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={admClass => setAdmissionClass(admClass)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder={
                    admissionClass ? ' ' + admissionClass : 'Select Class'
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
                  <ScrollView>{classElements}</ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
          <FormControlCustom
            type={'email'}
            value={email}
            onChange={setEmail}
            label={'Email'}
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={password}
            onChange={setPassword}
            label={'Password'}
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={remarks}
            onChange={setRemarks}
            label={'Remarks'}
          />
        </VStack>
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

export default AddStudent;
