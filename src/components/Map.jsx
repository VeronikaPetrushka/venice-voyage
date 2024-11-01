import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import places from '../constants/places.js';

const { height } = Dimensions.get('window');

const Map = () => {
    const mapRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [markerSize, setMarkerSize] = useState(40);

    useEffect(() => {
        if (mapRef.current) {
            const coordinates = places.map((item) => ({
                latitude: item.coordinates[0].lat,
                longitude: item.coordinates[0].lng,
            }));
            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, []);

    const handleNextMarker = () => {
        const nextIndex = (currentIndex + 1) % places.length;
        setCurrentIndex(nextIndex);

        const { lat, lng } = places[nextIndex].coordinates[0];
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        }, 1000);
    };

    const handlePlaceChange = (region) => {
        const zoomFactor = 0.1 / region.latitudeDelta;
        const newSize = 40 * zoomFactor;
        setMarkerSize(Math.max(20, Math.min(newSize, 120)));
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 45.4371908,
                    longitude: 12.3345898,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onRegionChange={handlePlaceChange}
            >
                {places.map((item) => (
                    <Marker
                    key={item.name}
                    coordinate={{
                        latitude: item.coordinates[0].lat,
                        longitude: item.coordinates[0].lng,
                    }}
                    title={item.name}
                >
                    <Image
                        source={ item.image }
                        style={[styles.markerImage, { width: markerSize, height: markerSize }]}
                    />
                </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.btn} onPress={handleNextMarker}>
                <Text style={styles.btnText}>Next place</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '63%',
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#854442'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        left: '35%',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#854442',
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerImage: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#854442'
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    iconBack: {
        padding: 10,
        transform: [{ rotate: '180deg' }],
        width: 65,
        height: 65,
        position: 'absolute',
        top: height * 0.05,
        left: 15,
        zIndex: 10
    },
});

export default Map;
