import React, {useLayoutEffect, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  Box,
  Pressable,
  HStack,
  Image,
  VStack,
  Divider,
  Text,
  Heading,
  Center,
} from '@gluestack-ui/themed';
import {
  User,
  Pen,
  Landmark,
  BookOpenText,
  CalendarClock,
  CalendarMinus2,
  ClipboardMinus,
  ClipboardPlus,
  FileText,
} from 'lucide-react-native';
import {ScrollView} from '@gluestack-ui/themed';
import Header from '../../components/Header';
import ServiceBox from '../../components/ServiceBox';

import AddStudent from './studentServices/AddStudent';
import ViewStudent from './studentServices/ViewStudent';
import UpdateStudent from './studentServices/UpdateStudent';
import DeleteStudent from './studentServices/DeleteStudent';

import AddFees from './feeServices/AddFees';
import UpdateFees from './feeServices/UpdateFees';
import ViewFees from './feeServices/ViewFees';
import DeleteFees from './feeServices/DeleteFees';

import ChangeTeacherClass from './teacherServices/ChangeTeacherClass';

import ManageTimetable from './otherServices/ManageTimetable';
import ManageSyllabus from './otherServices/ManageSyllabus';

const HomeScreen = ({navigation, route}, props) => {
  const [addStudentModal, setAddStudent] = useState(false);
  const [viewStudentModal, setViewStudent] = useState(false);
  const [updateStudentModal, setUpdateStudent] = useState(false);
  const [deleteStudentModal, setDeleteStudent] = useState(false);

  const [addFeesModal, setAddFees] = useState(false);
  const [viewFeesModal, setViewFees] = useState(false);
  const [updateFeesModal, setUpdateFees] = useState(false);
  const [deleteFeesModal, setDeleteFees] = useState(false);

  const [changeClassModal, setChangeClassModal] = useState(false);

  const [manageTimetableModal, setManageTimeTableModal] = useState(false);
  const [manageSyllabusModal, setManageSyllabusModal] = useState(false);

  const addStudentRef = useRef(null);
  const viewStudentRef = useRef(null);
  const UpdateStudentRef = useRef(null);
  const deleteStudentRef = useRef(null);

  const addFeesRef = useRef(null);
  const viewFeesRef = useRef(null);
  const updateFeesRef = useRef(null);
  const deleteFeesRef = useRef(null);

  const changeClassRef = useRef(null);
  const manageTimetableRef = useRef(null);
  const manageSyllabusRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} m="$3">
      <Center mb="$2">
        <Heading size="xl">Admin Panel</Heading>
      </Center>

      <Box rounded="$lg" bg="$blue700" px="$4" alignItems="center" py="$6">
        <HStack>
          <Image
            size="md"
            mx="$2"
            borderRadius="$full"
            source={{
              uri: 'https://img.freepik.com/free-photo/serious-pensive-young-student-looking-directly-camera_176532-8154.jpg?size=626&ext=jpg',
            }}
            alt="Student"
          />

          <VStack justifyContent="center" mx="$1">
            <Text size="lg" color="$textLight0" my="$0.5">
              Muhammad Nauman
            </Text>
            <HStack alignItems="center" my="$0.5">
              <Text size="sm" color="$textLight0">
                Admin
              </Text>
              <Divider
                orientation="vertical"
                mx="$1.5"
                h={13}
                bg="$backgroundLight0"
              />
              <Text size="sm" color="$textLight0"></Text>
            </HStack>
            <Text size="sm" color="$textLight0" my="$0.5">
              male
            </Text>
          </VStack>

          <User
            size={25}
            color="#ffffff"
            style={{marginHorizontal: 8}}
            onPress={() => console.log('Icon pressed')}
          />
        </HStack>
      </Box>
      <Box>
        <Box mt="$2">
          <Heading mb="$2">Student Services</Heading>
          <HStack alignItems="center">
            <Pressable onPress={() => setAddStudent(true)}>
              <ServiceBox
                text="Add"
                Icon={
                  <Landmark size={25} color="#000000" style={{margin: 10}} />
                }
              />
            </Pressable>
            <Pressable onPress={() => setViewStudent(true)}>
              <ServiceBox
                text="View"
                Icon={
                  <BookOpenText
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
            <Pressable onPress={() => setUpdateStudent(true)}>
              <ServiceBox
                text="Update"
                Icon={
                  <CalendarClock
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
            <Pressable onPress={() => setDeleteStudent(true)}>
              <ServiceBox
                text="Delete"
                Icon={
                  <CalendarMinus2
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
          </HStack>
        </Box>
        <Box mt="$2">
          <Heading mb="$2">Fee Services</Heading>
          <HStack>
            <Pressable onPress={() => setAddFees(true)}>
              <ServiceBox
                text="Add"
                Icon={
                  <Landmark size={25} color="#000000" style={{margin: 10}} />
                }
              />
            </Pressable>
            <Pressable onPress={() => setViewFees(true)}>
              <ServiceBox
                text="View"
                Icon={
                  <BookOpenText
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
            <Pressable onPress={() => setUpdateFees(true)}>
              <ServiceBox
                text="Update"
                Icon={
                  <CalendarClock
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
            <Pressable onPress={() => setDeleteFees(true)}>
              <ServiceBox
                text="Delete"
                Icon={
                  <CalendarMinus2
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
          </HStack>
        </Box>
        <Box mt="$2">
          <Heading mb="$2">Teacher Services</Heading>
          <HStack alignItems="center">
            <Pressable onPress={() => setChangeClassModal(true)}>
              <ServiceBox
                text="Class"
                Icon={<Pen size={25} color="#000000" style={{margin: 10}} />}
              />
            </Pressable>
          </HStack>
        </Box>
        <Box mt="$2">
          <Heading>Other Services</Heading>
          <HStack>
            <Pressable onPress={() => navigation.navigate('Age Report')}>
              <ServiceBox
                text="Age Report"
                Icon={<FileText size={25} color="#000000" style={{margin: 10}} />}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Result Report')}>
              <ServiceBox
                text="Result Report"
                Icon={<FileText size={25} color="#000000" style={{margin: 10}} />}
              />
            </Pressable>
            <Pressable onPress={() => setManageTimeTableModal(true)}>
              <ServiceBox
                text="Timetable"
                Icon={
                  <ClipboardMinus
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
            <Pressable onPress={() => setManageSyllabusModal(true)}>
              <ServiceBox
                text="Syllabus"
                Icon={
                  <ClipboardPlus
                    size={25}
                    color="#000000"
                    style={{margin: 10}}
                  />
                }
              />
            </Pressable>
          </HStack>
        </Box>
      </Box>
      {addStudentModal ? (
        <AddStudent
          showModal={addStudentModal}
          setShowModal={setAddStudent}
          ref={addStudentRef}
        />
      ) : null}
      {viewStudentModal ? (
        <ViewStudent
          showModal={viewStudentModal}
          setShowModal={setViewStudent}
          ref={viewStudentRef}
        />
      ) : null}
      {updateStudentModal ? (
        <UpdateStudent
          showModal={updateStudentModal}
          setShowModal={setUpdateStudent}
          ref={UpdateStudentRef}
        />
      ) : null}
      {deleteStudentModal ? (
        <DeleteStudent
          Student
          showModal={deleteStudentModal}
          setShowModal={setDeleteStudent}
          ref={deleteStudentRef}
        />
      ) : null}
      {addFeesModal ? (
        <AddFees
          showModal={addFeesModal}
          setShowModal={setAddFees}
          ref={addFeesRef}
        />
      ) : null}
      {viewFeesModal ? (
        <ViewFees
          showModal={viewFeesModal}
          setShowModal={setViewFees}
          ref={viewFeesRef}
        />
      ) : null}
      {deleteFeesModal ? (
        <DeleteFees
          showModal={deleteFeesModal}
          setShowModal={setDeleteFees}
          ref={deleteFeesRef}
        />
      ) : null}
      {updateFeesModal ? (
        <UpdateFees
          showModal={updateFeesModal}
          setShowModal={setUpdateFees}
          ref={updateFeesRef}
        />
      ) : null}
      {changeClassModal ? (
        <ChangeTeacherClass
          showModal={changeClassModal}
          setShowModal={setChangeClassModal}
          ref={changeClassRef}
        />
      ) : null}
      {manageTimetableModal ? (
        <ManageTimetable
          showModal={manageTimetableModal}
          setShowModal={setManageTimeTableModal}
          modalRef={manageTimetableRef}
        />
      ) : null}
      {manageSyllabusModal ? (
        <ManageSyllabus
          showModal={manageSyllabusModal}
          setShowModal={setManageSyllabusModal}
          modalRef={manageSyllabusRef}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    marginVertical: 10,
    width: 300,
    height: 200,
  },
});

export default HomeScreen;
