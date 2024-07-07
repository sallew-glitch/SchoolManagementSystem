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
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';
import ViewCard from '../../../components/ViewCard';
import firestore from '@react-native-firebase/firestore';

const ViewStudent = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  const [feesID, setFeesID] = useState(null);
  const [regNo, setRegNo] = useState('');

  const studentData = data.students;

  const studentElements = studentData.map(student => {
    return (
      <ViewCard
        actionText="Explore"
        action={() => console.log('viewed')}
        setState={setFeesID}
        heading={student.name}
        itemsData={student}
      />
    );
  });

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={() => setShowModal(false)}
        actionText={'Close'}
        size="full"
        heading="Students">
        {studentElements}
      </ModalCustom>
    </Box>
  );
};

export default ViewStudent;
