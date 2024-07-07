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
  Text,
} from '@gluestack-ui/themed';
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';
import firestore from '@react-native-firebase/firestore';

const UpdateStudent = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

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

  const [updateModal, setUpdateModal] = useState(false);
  const updateRef = useRef(null);

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  const studentElements = data.students.map(student => {
    return <SelectItem label={student.regNo} value={student.regNo} />;
  });

  const studentData = data.students.find(student => student.regNo === regNo);

  const classElements = data.classes.map(Class => {
    return <SelectItem label={Class.className} value={Class._id} />;
  });

  console.log('Student data: ', studentData);

  const updateStudent = async () => {
    try {
      const student = firestore().collection('students').doc(studentData._id);
      const updatedClass = firestore()
        .collection('classes')
        .doc(admissionClass);

      const oldClass = studentData.admissionClass;

      const oldClassData = await oldClass.get();
      const updatedClassData = await updatedClass.get();

      console.log('updated class: ', updatedClass);

      const studentToUpdate = {
        regNo: parseInt(regNo),
        dateOfReg: dateOfReg.toDateString(),
        DOB: DOB.toDateString(),
        gender: gender,
        fatherName: fatherName,
        caste: caste,
        occupation: occupation,
        residence: residence,
        admissionClass: updatedClass,
        name: studentName,
        email: email,
        password: password,
        remarks: remarks,
      };

      console.log('HERE AT THIS STEP');

      if (
        Object.values(studentToUpdate).some(
          value => value === null || value === undefined || value === '',
        )
      ) {
        throw new Error('All fields must be filled');
      }

      if (!student) throw Error('Student does not exist');

      await student.update(studentToUpdate);

      if (oldClassData.id !== admissionClass) {
        var oldStudentArray =
          oldClassData.data().students &&
          oldClassData.data().students.length !== 0
            ? oldClassData.data().students
            : [];

        oldStudentArray = oldStudentArray.filter(
          student => student.regNo !== parseInt(regNo),
        );

        console.log('OLD STUDENT ARRAY: ', oldStudentArray);
        console.log('OLD CLASS: ', oldClassData.id);

        await oldClass.update({
          students: oldStudentArray,
        });

        console.log('Student Array: ', updatedClassData.data().students);
        var studentArray =
          updatedClassData.data().students &&
          updatedClassData.data().students.length !== 0
            ? updatedClassData.data().students
            : [];

        console.log('STUDENT: ', student);

        studentArray.push({
          marks: updatedClassData.data().subjects.map(subject => {
            return {
              finalTerm: 0,
              firstTerm: 0,
              midTerm: 0,
              subject: subject.name,
            };
          }),
          regNo: parseInt(regNo),
          student: student,
        });

        await updatedClass.update({
          students: studentArray ? studentArray : [],
        });
      }

      setResultModal(true);
      setResultText('Student Updated');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const loadData = async () => {
    console.log('Updating: ', regNo);
    const Class = await studentData.admissionClass.get();

    console.log('CLASS: ', Class);

    setDateOfReg(new Date(studentData.dateOfReg));
    setStudentName(studentData.name);
    setDOB(new Date(studentData.DOB));
    setGender(studentData.gender);
    setFatherName(studentData.fatherName);
    setCaste(studentData.caste);
    setOccupation(studentData.occupation);
    setResidence(studentData.residence);
    setAdmissionClass(Class.data().className);
    setEmail(studentData.email);
    setPassword(studentData.password);
    setRemarks(studentData.remarks);
    setUpdateModal(true);
  };

  console.log('Admission Class: ', admissionClass);
  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={loadData}
        actionText={'Update'}
        heading="Update Student">
        <FormControl isRequired>
          <Select onValueChange={regNo => setRegNo(regNo)}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder={regNo ? ' ' + regNo : 'Select Registratio no'}
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
        action={updateStudent}
        actionText={'Update'}
        heading="Update Student"
        showModal={updateModal}
        setShowModal={setUpdateModal}
        ref={updateRef}>
        <VStack space="lg">
          <FormControlCustom
            type={'number'}
            value={'' + regNo}
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
            <Select
              selectedValue={admissionClass}
              onValueChange={admClass => setAdmissionClass(admClass)}>
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

export default UpdateStudent;
