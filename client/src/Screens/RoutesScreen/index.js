import { View, StyleSheet } from "react-native"
import RoutesScreenForm from "../../Components/RoutesScreenForm"


export default function Routes({navigation}){

    return(
        <View style={styles.view}>
            <RoutesScreenForm navigation={navigation}/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center"
    }
})
