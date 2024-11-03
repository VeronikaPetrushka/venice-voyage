import { View } from "react-native"
import Statistic from "../components/Statistic"

const StatisticScreen = () => {
    return (
        <View style={styles.container}>
            <Statistic />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default StatisticScreen;