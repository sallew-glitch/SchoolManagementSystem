import {
  Box,
  Card,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import {
  User,
  ClipboardMinus,
  Landmark,
  BookOpenText,
  CalendarClock,
} from 'lucide-react-native';
import React from 'react';
import {useFirebase} from '../../contexts/FirebaseContext';

function StudentDashboard(props) {
  const navigation = props.navigation;

  const {data} = useFirebase();

  const user = data.users.find((user) => {
    return user.regNo === 59;
  })

  return (
    <View m="$5">
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
              {user.regNo}
            </Text>
            <HStack alignItems="center" my="$0.5">
              <Text size="sm" color="$textLight0">
                {user.regNo}th Grade
              </Text>
              <Divider
                orientation="vertical"
                mx="$1.5"
                h={13}
                bg="$backgroundLight0"
              />
              <Text size="sm" color="$textLight0">
                {user.regNo}
              </Text>
            </HStack>
            <Text size="sm" color="$textLight0" my="$0.5">
              {user.gender}
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

      <Heading my="$5">Explore Services</Heading>

      <Box>
        <HStack alignItems="center">
          <VStack alignItems="center" mx="$2">
            <Card
              size="md"
              variant="elevated"
              bg="$textLight0"
              p="$2"
              rounded="$lg"
              mb="$2">
              <ClipboardMinus size={25} color="#000000" style={{margin: 10}} onPress={() => navigation.navigate('ViewMarks')} />
            </Card>
            <Text size="sm">Marks</Text>
          </VStack>
          <VStack justifyContent="center" alignItems="center" mx="$2">
            <Card
              size="md"
              variant="elevated"
              bg="$textLight0"
              p="$2"
              rounded="$lg"
              mb="$2">
              <Landmark size={25} color="#000000" style={{margin: 10}} onPress={() => navigation.navigate('ViewFees')} />
            </Card>
            <Text size="sm">Fee</Text>
          </VStack>
          <VStack justifyContent="center" alignItems="center" mx="$2">
            <Card
              size="md"
              variant="elevated"
              bg="$textLight0"
              p="$2"
              rounded="$lg"
              mb="$2">
              <BookOpenText size={25} color="#000000" style={{margin: 10}} onPress={() => navigation.navigate('ViewSyllabus')} />
            </Card>
            <Text size="sm">Syllabus</Text>
          </VStack>
          <VStack justifyContent="center" alignItems="center" mx="$2">
            <Card
              size="md"
              variant="elevated"
              bg="$textLight0"
              p="$2"
              rounded="$lg"
              mb="$2">
              <CalendarClock size={25} color="#000000" style={{margin: 10}} />
            </Card>
            <Text size="sm">Timetable</Text>
          </VStack>
        </HStack>
      </Box>
    </View>
  );
}

export default StudentDashboard;
