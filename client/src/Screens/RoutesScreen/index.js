import { View, StyleSheet } from "react-native"
import RoutesScreenForm from "../../Components/RoutesScreenForm"


export default function Routes(){

    return(
        <View style={styles.view}>
            <RoutesScreenForm />
        </View>
    )
    
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 50,
        flex: 1,
        justifyContent: "center"
    }
})
