import { View, StyleSheet, SafeAreaView } from "react-native";
import RoutesScreenForm from "../../Components/RoutesScreenForm";
import Header from "../../Components/Header";

<<<<<<< HEAD

export default function Routes({navigation}){

    return(
        <View style={styles.view}>
            <RoutesScreenForm navigation={navigation}/>
        </View>
    )
    
=======
export default function Routes() {
	return (
		<View style={styles.view}>
			<Header />
			<RoutesScreenForm />
		</View>
	);
>>>>>>> acb9319bc4f90cf490fc6e22f97d3254ac60da79
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "center",
	},
});
