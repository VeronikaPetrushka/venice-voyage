import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Statistic = () => {
    const navigation = useNavigation();
    const [score, setScore] = useState(0);
    const [visitedTrips, setVisitedTrips] = useState([]);
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);

    useEffect(() => {
        const fetchScore = async () => {
            try {
                const storedScore = await AsyncStorage.getItem('score');
                const currentScore = storedScore ? JSON.parse(storedScore) : 0;
                setScore(currentScore);
            } catch (error) {
                console.error('Error retrieving score:', error);
            }
        };

        const fetchVisitedTrips = async () => {
            try {
                const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
                const tripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];
                setVisitedTrips(tripsArray);
            } catch (error) {
                console.error('Error retrieving visited trips:', error);
            }
        };

        fetchScore();
        fetchVisitedTrips();
    }, []);

    const handleDayPress = (day) => {
        if (!arrivalDate) {
            setArrivalDate(day.dateString);
        } else if (!departureDate) {
            setDepartureDate(day.dateString);
        } else {
            setArrivalDate(day.dateString);
            setDepartureDate(null);
        }
    };

    const filteredTrips = visitedTrips.filter(trip => {
        const tripArrivalDate = trip.arrivalDate.split('.').reverse().join('-');
        const tripDepartureDate = trip.departureDate.split('.').reverse().join('-');
        
        const selectedArrivalDate = arrivalDate;
        const selectedDepartureDate = departureDate;

        return selectedArrivalDate && selectedDepartureDate &&
            (
                (selectedArrivalDate >= tripArrivalDate && selectedArrivalDate <= tripDepartureDate) ||
                (selectedDepartureDate >= tripArrivalDate && selectedDepartureDate <= tripDepartureDate) ||
                (selectedArrivalDate <= tripArrivalDate && selectedDepartureDate >= tripDepartureDate)
            );
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    };

    return (
        <ImageBackground source={require('../assets/newDiz/back.png')} style={{ flex: 1 }}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <Icons type={'back'} />
            </TouchableOpacity>

            <Text style={styles.title}>Total Score</Text>
            <Text style={styles.score}>{score}</Text>

            <Calendar
                style={{ marginTop: 10, borderRadius: 14, width: width * 0.9 }}
                onDayPress={handleDayPress}
                markedDates={{
                    [arrivalDate]: { selected: true, selectedColor: '#854442' },
                    [departureDate]: { selected: true, selectedColor: '#854442' },
                }}
                theme={{
                    selectedDayBackgroundColor: '#854442',
                    todayTextColor: '#C06014',
                    arrowColor: '#854442',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500',
                }}
            />

            {(!arrivalDate && !departureDate) && (
                <Text style={styles.selectedRange}>
                    Select any date range to see visited places
                </Text>
            )}

            {!arrivalDate || !departureDate && (
                <Text style={styles.selectedRange}>
                    Select any date range to see visited places
                </Text>
            )}

            {arrivalDate && departureDate && (
                <Text style={styles.selectedRange}>
                    Selected Date Range: {formatDate(arrivalDate)} - {formatDate(departureDate)}
                </Text>
            )}

            <Text style={styles.tripTitle}>Matching Trips:</Text>

            {filteredTrips.length === 0 && arrivalDate && departureDate && (
                <Text style={styles.noTripsText}>No matching trips found in the selected date range.</Text>
            )}

            <FlatList
                style={{width: '100%'}}
                data={filteredTrips}
                keyExtractor={(item) => item.visitedDate}
                renderItem={({ item }) => (
                    <View style={styles.tripContainer}>
                        <Image source={{ uri: item.image }} style={styles.image}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.tripText}>
                                {item.place.name} - {formatDate(item.visitedDate)}
                            </Text>
                            <Text style={styles.tripPlanned}>Planned: {formatDate(arrivalDate)} - {formatDate(departureDate)}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.07,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FAF3E0',
    },
    score: {
        fontSize: 36,
        fontWeight: '700',
        color: '#C06014',
    },
    tripTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginTop: 15,
        marginBottom: 10,
        color: '#FAF3E0',
    },
    tripContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    textContainer: {
        padding: 5,
        borderRadius: 14,
        backgroundColor: '#C06014'
    },
    tripText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },
    tripPlanned: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '300'
    },
    backIcon: {
        width: 65,
        height: 65,
        padding: 10,
        position: 'absolute',
        top: height * 0.052,
        left: 10,
        zIndex: 10
    },
    selectedRange: {
        fontSize: 13,
        color: '#FFD662',
        marginTop: 15
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 7
    },
    noTripsText: {
        fontSize: 16,
        color: '#FFD662',
        marginTop: 30,
        textAlign: 'center'
    }
});

export default Statistic;
