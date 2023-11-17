import React, { useState } from "react"
import {
	View,
	Pressable,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
const FilterDropdown = () => {
	const [visible, setVisible] = useState(true)
	const [selectedFilter, setSelectedFilter] = useState("all")

	const filters = ["all", "recent", "popular", "favorites"]

	return (
		<View style={styles.container}>
			<View>
				<Pressable
					style={styles.button}
					title="Filter"
					onPress={() => setVisible(true)}
				>
					<Text style={styles.buttonText}>{selectedFilter}</Text>
				</Pressable>
			</View>

			<Modal
				transparent={true}
				animationType="slide"
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.title}>Select a filter:</Text>
						<Picker
							selectedValue={selectedFilter}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedFilter(itemValue)
							}
						>
							{filters.map((filter, index) => (
								<Picker.Item label={filter} value={filter} key={index} />
							))}
						</Picker>

						<TouchableOpacity
							style={styles.button}
							onPress={() => setVisible(false)}
						>
							<Text style={styles.buttonText}>Done</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		width: "80%",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#007bff",
		padding: 10,
		borderRadius: 5,
		width: 100,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 16,
	},
})

export default FilterDropdown
