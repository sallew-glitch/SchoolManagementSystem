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
  Heading,
} from '@gluestack-ui/themed';
import {Text} from 'react-native';
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';
import ViewCard from '../../../components/ViewCard';
import firestore from '@react-native-firebase/firestore';

const ChangeTeacherClass = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  const [teacherClass, setTeacherClass] = useState('');
  const [teacher, setTeacher] = useState('');

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  const classElements = data.classes.map(Class => {
    return <SelectItem label={Class.className} value={Class} />;
  });

  console.log('TEACHER: ', teacher);
  console.log('CLASS: ', teacherClass);

  const teacherElements = data.teachers.map(teacher => {
    return <SelectItem label={teacher.name} value={teacher} />;
  });

  const changeClass = async () => {
    try {
      if (!teacher || !teacherClass) {
        throw new Error('Fill in all the required fields');
      }

      const classData = data.classes.find(
        Class => Class._id === teacherClass[0],
      );

      const newClassRef = firestore()
        .collection('classes')
        .doc(teacherClass[0]);

      const oldTeacher = classData.teacher;

      const newTeacherRef = firestore().collection('teachers').doc(teacher._id);

      if ((await oldTeacher.get()).id === teacher._id)
        throw Error('Teacher is already teaching this class');

      if (oldTeacher) await oldTeacher.update({class: null});

      if (!newTeacherRef) throw new Error('Teacher Not Found');

      await newClassRef.update({
        teacher: newTeacherRef,
      });

      await newTeacherRef.update({
        class: newClassRef,
      });

      setResultModal(true);
      setResultText('Class Successfully Changed');
      console.log('CHANGED');
    } catch (error) {
      setResultText(error.message);
      setResultModal(true);
    }
  };
  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={changeClass}
        actionText={'Change'}
        size="lg"
        heading="Change Class">
        <FormControl isRequired mb="$3">
          <FormControlLabel mb="$2">
            <FormControlLabelText>Select Teacher</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={teacher}
            onValueChange={async teacher => {
              setTeacher(teacher);
              const classData = await teacher.class.get();
              setTeacherClass([classData.id, classData.data().className]);
            }}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder={teacher ? ' ' + teacher.name : 'Select Teacher'}
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
                <ScrollView>{teacherElements}</ScrollView>
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>
        <FormControl isRequired isDisabled={!teacher ? true : false}>
          <FormControlLabel mb="$2">
            <FormControlLabelText>Change Class</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={teacherClass}
            onValueChange={teacherClass => {
              setTeacherClass(prev => [
                teacherClass._id,
                teacherClass.className,
              ]);
            }}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder={
                  teacherClass.length !== 0
                    ? ' ' + teacherClass[1]
                    : 'Select Class'
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

export default ChangeTeacherClass;
