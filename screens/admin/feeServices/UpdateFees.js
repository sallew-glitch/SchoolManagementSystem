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

const UpdateFees = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  const [feesID, setFeesID] = useState(null);
  const [regNo, setRegNo] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [lateFees, setLateFees] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [studentName, setStudentName] = useState('');
  const [remarks, setRemarks] = useState('');

  const [updateModal, setUpdateModal] = useState(false);
  const [feesDisplayModal, setFeesDisplayModal] = useState(false);

  const studentData = data.students.find(student => student.regNo === regNo);

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  const feesDisplayRef = useRef(null);
  const updateRef = useRef(null);

  console.log('AMOUNT DUE: ', amountDue);
  console.log('Type of amount due: ', typeof amountDue);

  const updateFees = async () => {
    try {
      const student = firestore().collection('students').doc(studentData._id);

      const doc = firestore().collection('fees').doc(feesID);

      const feesToUpdate = {
        amountDue: parseInt(amountDue),
        amountPaid: parseInt(amountPaid),
        lateFees: Boolean(lateFees),
        payableAmount: parseInt(payableAmount),
        paymentDate: paymentDate.toDateString(),
        student: student,
        studentName: studentName,
        regNo: parseInt(regNo),
        remarks: remarks,
      };

      if (
        Object.values(feesToUpdate).some(
          value => value === null || value === undefined || value === '',
        )
      ) {
        throw new Error('All fields must be filled');
      }

      if (!doc) throw Error('Fee record does not exist');
      if (!student) throw Error('Student does not exist');

      await doc.update(feesToUpdate);

      if (
        (await doc.get()).data().regNo === (await student.get()).data().regNo
      ) {
        await student.update({
          fees: [...studentData.fees, doc.id],
        });
      }

      setResultModal(true);
      setResultText('Fee Updated');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const displayData = () => {
    setFeesDisplayModal(true);
  };
  const loadData = () => {
    const fee = feesData.find(fee => fee._id === feesID);
    if (!fee) return console.log('FEE NOT FOUND');
    setRegNo(fee.regNo);
    setAmountDue(fee.amountDue);
    setAmountPaid(fee.amountPaid);
    setLateFees(fee.lateFees);
    setPayableAmount(fee.payableAmount);
    setPaymentDate(new Date(fee.paymentDate));
    setStudentName(fee.studentName);
    setRemarks(fee.remarks);

    setUpdateModal(true);
  };

  const studentElements = data.students.map(student => {
    return <SelectItem label={student.regNo} value={student.regNo} />;
  });

  const regNoElements = data.students.map(student => {
    return <SelectItem label={student.regNo} value={student.regNo} />;
  });

  const feesData = data.fees.filter(fees => fees.regNo === regNo);

  const feesElements = feesData.map(fees => {
    return (
      <ViewCard
        actionText="Update"
        action={loadData}
        setState={setFeesID}
        heading={fees.studentName}
        itemsData={fees}
      />
    );
  });

  console.log('FEES DATA:', feesData);

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={displayData}
        actionText={'Update'}
        heading="Update Fees">
        <FormControl isRequired>
          <Select
            selectedValue={regNo.toString()}
            onValueChange={regNo => setRegNo(regNo)}>
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
        showModal={feesDisplayModal}
        setShowModal={setFeesDisplayModal}
        ref={feesDisplayRef}
        action={() => setFeesDisplayModal(false)}
        actionText={'Close'}
        size="full"
        heading="Update Fees">
        {feesElements}
      </ModalCustom>

      <ModalCustom
        action={updateFees}
        actionText={'Update'}
        heading="Update Fees"
        showModal={updateModal}
        setShowModal={setUpdateModal}
        ref={updateRef}>
        <VStack space="lg">
          <FormControl isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Registration No</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue={regNo}
              onValueChange={regNo => setRegNo(regNo)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder={regNo ? '' + regNo : 'Select Registration No'}
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
                  <ScrollView>{regNoElements}</ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
          <FormControlCustom
            type={'text'}
            value={studentName}
            onChange={setStudentName}
            label="Student Name"
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={amountDue.toString()}
            onChange={setAmountDue}
            keyboardType="numeric"
            label="Amount Due"
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={amountPaid.toString()}
            onChange={setAmountPaid}
            keyboardType="numeric"
            label="Amount Paid"
            required={true}
          />
          <FormControlCustom
            type={'text'}
            value={payableAmount.toString()}
            onChange={setPayableAmount}
            keyboardType="numeric"
            label="Payable Amount"
            required={true}
          />
          <FormControl isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText>Payment Date</FormControlLabelText>
            </FormControlLabel>
            <Center>
              <DatePicker
                date={paymentDate}
                mode="date"
                onDateChange={date => setPaymentDate(date)}
                onConfirm={date => {
                  setPaymentDate(date);
                }}
              />
            </Center>
          </FormControl>
          <FormControl isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Late Fees</FormControlLabelText>
            </FormControlLabel>
            <Select
              selectedValue={lateFees.toString()}
              onValueChange={feeStatus => setLateFees(feeStatus)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder={
                    typeof lateFees === 'boolean' ? '' + lateFees : 'Fee Status'
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
                  <ScrollView>
                    <SelectItem label="True" value={true} />
                    <SelectItem label="False" value={false} />
                  </ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
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

export default UpdateFees;
