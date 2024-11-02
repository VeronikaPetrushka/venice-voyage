import React, { useRef, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Details = ({ place }) => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [zoomedIn, setZoomedIn] = useState(false);
    const [markerSize, setMarkerSize] = useState(40);

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
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
            setMarkerSize(40);
        }
        setZoomedIn(!zoomedIn);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack('')}>
                <Icons type={'back'}/>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={place.image} style={styles.image} />
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: place.coordinates[0].lat,
                        longitude: place.coordinates[0].lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: place.coordinates[0].lat,
                            longitude: place.coordinates[0].lng,
                        }}
                    >
                        <Image
                            source={place.image}
                            style={[styles.markerImage, { width: markerSize, height: markerSize }]}
                        />
                    </Marker>
                    <TouchableOpacity style={styles.zoomButton} onPress={handleZoomToggle}>
                        <Text style={styles.zoomButtonText}>{zoomedIn ? "Zoom Out" : "Zoom In"}</Text>
                    </TouchableOpacity>
                </MapView>
                <TouchableOpacity style={styles.checkBtn}>
                    <Text style={styles.checkBtnText}>Check in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{place.name}</Text>
                <ScrollView style={{width: '100%', height: '35%'}}>
                    <Text style={styles.description}>{place.description}</Text>
                    <Text style={styles.fact}>{place.fact}</Text>
                    <View style={{height: 50}}/>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0
    },
    backIcon: {
        width: 65,
        height: 65,
        padding: 10,
        position: 'absolute',
        top: height * 0.055,
        left: 10,
        zIndex: 10
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 16,
    },
    mapContainer: {
        width: '100%',
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    map: {
        width: "48%",
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    checkBtn: {
        width: "48%",
        height: 200,
        borderRadius: 10,
        backgroundColor: '#FFD662',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBtnText: {
        color: "#C06014",
        fontSize: 20,
        fontWeight: '900',
    },
    markerImage: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#854442'
    },
    zoomButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#854442",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        zIndex: 10
    },
    zoomButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: '300',
    },
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        width: '100%'
    },
    name: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 15,
        color: '#854442',
        textAlign: 'center'
    },
    description: {
        fontSize: 17,
        marginBottom: 10,
        color: '#3C3C3B',
        textAlign: 'justify'
    },
    fact: {
        fontSize: 15,
        color: '#3C3C3B',
        textAlign: 'justify'
    },
});

export default Details;
