import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Dimensions, Alert, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from "react-native-linear-gradient";
import { Calendar } from 'react-native-calendars';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const TripModal = ({ visible, onClose }) => {
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isArrival, setIsArrival] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({
        arrivalDate: '',
        departureDate: '',
    });
    const [duplicateDateError, setDuplicateDateError] = useState('');

    useEffect(() => {
        if (visible) {
            setArrivalDate(null);
            setDepartureDate(null);
            setErrors({ arrivalDate: '', departureDate: '' });
        }
    }, [visible]);

    const handleDayPress = (day) => {
        const selectedDate = new Date(day.dateString);
        if (isArrival) {
            setArrivalDate(selectedDate);
        } else {
            setDepartureDate(selectedDate);
        }
        setShowCalendar(false);
    
        if (arrivalDate || departureDate) {
            setIsChecked(false);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        if (arrivalDate && !departureDate) {
            newErrors.departureDate = 'Please select a departure date.';
            valid = false;
        } else if (!arrivalDate && departureDate) {
            newErrors.arrivalDate = 'Please select an arrival date.';
            valid = false;
        } else if (!isChecked) {
            if (!arrivalDate) {
                newErrors.arrivalDate = 'Arrival date is required';
                valid = false;
            } else if (arrivalDate <= today) {
                newErrors.arrivalDate = 'Please select a future arrival date.';
                valid = false;
            }
    
            if (!departureDate) {
                newErrors.departureDate = 'Departure date is required';
                valid = false;
            } else if (departureDate <= today) {
                newErrors.departureDate = 'Please select a future departure date.';
                valid = false;
            } else if (departureDate <= arrivalDate) {
                newErrors.departureDate = 'Departure must be after arrival.';
                valid = false;
            }
        }
    
        setErrors(newErrors);
        return valid;
    };    

    const handleCheckboxToggle = () => {
        if (!isChecked && (arrivalDate || departureDate)) {
            setArrivalDate(null);
            setDepartureDate(null);
        }
        setIsChecked(!isChecked);
    };
    
    const handleSubmit = async (quest) => {
        if (validateForm()) {
            const tripDetails = {
                arrivalDate: arrivalDate ? arrivalDate.toLocaleDateString('en-GB').replace(/\//g, '.') : null,
                departureDate: departureDate ? departureDate.toLocaleDateString('en-GB').replace(/\//g, '.') : null,
                isChecked,
                quest
            };
    
            try {
                const storedTrip = await AsyncStorage.getItem('trip');
                const tripArray = storedTrip ? JSON.parse(storedTrip) : [];

                const duplicateTrip = tripArray.find(trip => 
                    trip.arrivalDate === tripDetails.arrivalDate && 
                    trip.departureDate === tripDetails.departureDate
                );

                if (duplicateTrip) {
                    setDuplicateDateError('This combination of arrival and departure dates is already recorded. Please choose different dates.');
                    return;
                } else {
                    setDuplicateDateError('');
                }
    
                tripArray.push(tripDetails);
    
                await AsyncStorage.setItem('trip', JSON.stringify(tripArray));
    
                setIsChecked(false);
                onClose();
            } catch (error) {
                Alert.alert('Storage Error', 'There was an error saving the trip: ' + error.message);
            }
        } else {
            Alert.alert('Validation Error', 'Please ensure both dates are selected or check the box.');
        }
    };    


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
                <View style={styles.modalOverlay}>
                        <TouchableOpacity style={styles.infoBtn} onPress={onClose}>
                            <LinearGradient
                                colors={['#C06014', '#854442']}
                                start={{ x: -0.15, y: 0.5 }}
                                end={{ x: 1.1, y: 0.5 }}
                                style={[styles.gradient]}
                            >
                                <Text style={styles.btnText}>Your trip</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.modalContent}>

                            <ScrollView style={{width: '100%'}}>

                                <Text style={styles.modalQuestion}>How many days you will spend in Venice ?</Text>

                                <Text style={styles.modalTitle}>Select your trip dates</Text>

                                <View style={styles.datesContainer}>
                                    {/* Arrival Date Button */}
                                    <TouchableOpacity 
                                        style={styles.dateBtn}
                                        onPress={() => { setIsArrival(true); setShowCalendar(!showCalendar); }}
                                        >
                                        <Text style={styles.dateText}>{arrivalDate ? arrivalDate.toLocaleDateString() : 'Arrival Date'}</Text>
                                    </TouchableOpacity>

                                    <View style={styles.dateLine} />

                                    {/* Departure Date Button */}
                                    <TouchableOpacity 
                                        style={styles.dateBtn}
                                        onPress={() => { setIsArrival(false); setShowCalendar(!showCalendar); }}
                                        >
                                        <Text style={styles.dateText}>{departureDate ? departureDate.toLocaleDateString() : 'Departure Date'}</Text>
                                    </TouchableOpacity>
                                </View>

                                {errors.arrivalDate ? <Text style={styles.error}>{errors.arrivalDate}</Text> : null}

                                {errors.departureDate ? <Text style={styles.error}>{errors.departureDate}</Text> : null}

                                {duplicateDateError ? <Text style={styles.error}>{duplicateDateError}</Text> : null}

                                {showCalendar && (
                                    <Calendar
                                        style={{ marginTop: 20 }}
                                        onDayPress={handleDayPress}
                                        markedDates={{
                                            [arrivalDate?.toISOString().split('T')[0]]: { selected: true, selectedColor: '#854442' },
                                            [departureDate?.toISOString().split('T')[0]]: { selected: true, selectedColor: '#854442' },
                                        }}
                                        theme={{
                                            selectedDayBackgroundColor: '#854442',
                                            todayTextColor: '#C06014',
                                            arrowColor: '#854442',
                                            textDayFontWeight: '500',
                                            textMonthFontWeight: 'bold',
                                            textDayHeaderFontWeight: '500'
                                        }}
                                    />
                                )}

                                <Text style={styles.text}>OR</Text>

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
                                    <Text style={styles.modalText}>I haven`t decided yet</Text>
                                    <TouchableOpacity 
                                        style={styles.checkbox}
                                        onPress={handleCheckboxToggle}>
                                        { isChecked && (
                                            <View style={styles.icon}>
                                                <Icons type={'check'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => handleSubmit(true)} style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Start your quest!</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cancelBtn} onPress={() => handleSubmit(false)}>
                                    <Text style={styles.submitButtonText}>I’m just looking</Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </View>
                </View>
        </Modal>
    )
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: height * 0.07,
        paddingHorizontal: 15,
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },

    modalContent: {
        width: '100%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },

    modalQuestion: {
        fontSize: 19,
        fontWeight: '900',
        lineHeight: 19.36,
        color: '#3C3C3B',
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 23
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 19.36,
        color: '#854442',
        marginBottom: 20,
        textAlign: 'center',
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
    },

    datesContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    dateBtn: {
        width: '43%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 12,
        borderColor: '#854442',
        borderWidth: 0.5,
    },

    dateText: {
        fontSize: 15,
        fontWeight: '300',
        color: '#3C3C3B',
    },

    dateLine: {
        width: '7%',
        height: 1,
        backgroundColor: '#854442',
    },

    modalText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#3C3C3B',
        marginRight: 10
    },

    infoBtn: {
        width: width * 0.7,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 30,
        marginRight: 76
    },

    btnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '800'
    },

    error: {
        color: 'red',
        marginTop: 5,
    },

    text: {
        fontSize: 17,
        color: '#3C3C3B',
        fontWeight: '400',
        marginVertical: 20,
        textAlign: 'center'
    },

    checkbox: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderColor: '#854442',
        borderWidth: 0.5
    },

    icon: {
        width: 22,
        height: 22,
        position: 'absolute',
        bottom: 3,
        left: 2
    },

    submitButton: {
        width: '100%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#C06014',
    },

    submitButtonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '800',
    },

    cancelBtn: {
        width: '100%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#854442',
        marginTop: 10,
    },

});

export default TripModal;
