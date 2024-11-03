import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const CheckIn = ({ place }) => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [photo, setPhoto] = useState(null);
    const [zoomedIn, setZoomedIn] = useState(false);
    const [markerSize, setMarkerSize] = useState(40);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [visited, setVisited] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            if (!place || !place.name) {
                Alert.alert('Error', 'Place is not defined or missing necessary information.');
                return;
            }
            
            const { arrivalDate, departureDate } = place;
            setArrivalDate(arrivalDate);
            setDepartureDate(departureDate);
    
            await fetchTrips();
            await checkIfVisited();
        };
    
        const fetchTrips = async () => {
            try {
                const storedTrip = await AsyncStorage.getItem('trip');
                const tripArray = storedTrip ? JSON.parse(storedTrip) : [];
    
                const filteredTrips = tripArray.filter(trip => !trip.isChecked && trip.quest);
    
                const formattedTrips = filteredTrips.map((trip, index) => ({
                    label: `${trip.arrivalDate} - ${trip.departureDate}`,
                    value: trip,
                    key: index,
                }));
    
                setItems(formattedTrips);
            } catch (error) {
                Alert.alert('Error', 'Could not load trips: ' + error.message);
            }
        };
    
        const checkIfVisited = async () => {
            try {
                const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
                const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];
    
                const visitedTrip = visitedTripsArray.find(trip => 
                    trip.place && trip.place.name === place.name
                );
    
                setVisited(!!visitedTrip);
            } catch (error) {
                Alert.alert('Error', 'Could not check visit status: ' + error.message);
            }
        };
    
        initialize();
    }, [place]);    

    const handleZoomToggle = () => {
        const { lat, lng } = place.coordinates[0];

        if (!zoomedIn) {
            mapRef.current.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0017,
                longitudeDelta: 0.0017,
            }, 1000);
            setMarkerSize(80);
        } else {
            mapRef.current.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            }, 1000);
            setMarkerSize(40);
        }
        setZoomedIn(!zoomedIn);
    };

    const handleSelectPhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                Alert.alert('Photo selection cancelled');
            } else if (response.error) {
                Alert.alert('Error selecting photo', response.error);
            } else if (response.assets && response.assets.length > 0) {
                setPhoto(response.assets[0].uri);
            }
        });
    };

    const handleSubmit = async () => {
        if (!photo || !value) {
            Alert.alert('Error', 'Please upload a photo and select a trip date range.');
            return;
        }

        const selectedTrip = value;
        const newVisitedTrip = {
            place,
            trip: selectedTrip,
            visitedDate: new Date().toISOString(),
            image: photo,
            arrivalDate: selectedTrip.arrivalDate,
            departureDate: selectedTrip.departureDate,
            quest: selectedTrip.quest,
            isChecked: true,
        };

        try {
            const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
            const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];

            const updatedVisitedTrips = [...visitedTripsArray, newVisitedTrip];

            await AsyncStorage.setItem('visitedTrips', JSON.stringify(updatedVisitedTrips));

            const randomScore = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

            const storedScore = await AsyncStorage.getItem('score');
            const currentScore = storedScore ? JSON.parse(storedScore) : 0;

            const newScore = currentScore + randomScore;
            await AsyncStorage.setItem('score', JSON.stringify(newScore));

            setVisited(true);
            Alert.alert('Success', `You've checked in at ${place.name} and get +${randomScore} to your total score! Great job! Keep exploring to earn more points!`);

            setPhoto(null);
            setValue(null);

            navigation.goBack();
        } catch (error) {
            console.error('Error during check-in:', error);
            Alert.alert('Error', 'Could not save your check-in: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack('')}>
                <Icons type={'back'} />
            </TouchableOpacity>

            <Text style={styles.title}>{place.name}</Text>

            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: place.coordinates[0].lat,
                        longitude: place.coordinates[0].lng,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: place.coordinates[0].lat,
                            longitude: place.coordinates[0].lng,
                        }}
                    >
                        <View>
                            <Image
                                source={place.image}
                                style={[styles.markerImage, { width: markerSize, height: markerSize }]}
                            />
                            {visited && (
                                <View style={styles.visitedIcon}>
                                    <Icons type={'visited'} />
                                </View>
                            )}
                        </View>
                    </Marker>
                </MapView>
                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomToggle}>
                    <Text style={styles.zoomButtonText}>{zoomedIn ? "Zoom Out" : "Zoom In"}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPhoto}>
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </TouchableOpacity>

            {photo ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: photo }} style={styles.image} />
                </View>
            ) : (
                <View style={styles.imagePlaceholder}>
                    <View style={styles.imageIcon}>
                        <Icons type={'image'} />
                    </View>
                </View>
            )}

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a trip date range"
                style={styles.picker}
                dropDownContainerStyle={{ borderColor: '#854442', backgroundColor: '#FAF3E0' }}
                placeholderStyle={{ color: '#3C3C3B', fontSize: 16 }}
                textStyle={{ color: '#854442', fontSize: 16 }}
                dropDownDirection="BOTTOM"
                onSelectItem={(item) => {
                    setValue(item.value);
                    setOpen(false);
                }}
            />

            <TouchableOpacity style={styles.checkBtn} onPress={handleSubmit}>
                <Text style={styles.checkBtnText}>Check in</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FAF3E0',
        padding: 16,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.05
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
    title: {
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 30,
        color: '#3C3C3B',
        width: width * 0.8,
        textAlign: 'center'
    },
    mapContainer: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerImage: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#854442',
    },
    zoomButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#854442",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        zIndex: 10,
    },
    zoomButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: '300',
    },
    uploadButton: {
        backgroundColor: '#854442',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 20,
        width: 200,
        alignSelf: 'center'
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
    },
    imageContainer: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    imagePlaceholder: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C06014',
        backgroundColor: 'rgba(192, 96, 20, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    imageIcon: {
        width: 80,
        height: 80
    },
    picker: {
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: '#854442',
        marginBottom: 15
    },
    checkBtn: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFD662',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBtnText: {
        color: "#C06014",
        fontSize: 17,
        fontWeight: '900',
    },
    visitedIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 15
    }
});

export default CheckIn;
