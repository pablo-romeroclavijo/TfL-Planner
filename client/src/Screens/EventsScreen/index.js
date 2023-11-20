import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text, FlatList, pre } from "react-native";
import { EventHolder, Header } from "../../Components";

export default function EventsPage({ navigation }) {
	return (
		<View style={styles.container}>
			<Header />
			<Text style={styles.heading}>Events Page</Text>

			<EventHolder events={array} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		textAlign: "center",
		color: "black",
	},
	heading: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black",
		paddingTop: 20,
	},
	newEventContainer: {
		width: 350,
		margin: 40,
		backgroundColor: "lightblue",
		borderRadius: 10,
	},
	eventheader: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
	},
});

const array = [
	{
		creator_id: 4,
		date: "Fri, 08 Jan 1999 04:05:06 GMT",
		description: "Vintage hand-painted vase.",
		id: 21,
		postcode: "ABC123",
		share_code: "V7aEareETt",
		title: "The Floral Elegance",
	},
	{
		creator_id: 4,
		date: "Sat, 17 Jul 2001 15:30:00 GMT",
		description: "Antique brass compass.",
		id: 22,
		postcode: "DEF456",
		share_code: "Y6bHareUYu",
		title: "The Navigator's Guide",
	},
	{
		creator_id: 4,
		date: "Mon, 12 Aug 2002 09:20:17 GMT",
		description: "Rare collection of coins from the Roman Empire.",
		id: 23,
		postcode: "GHI789",
		share_code: "N3cVareNVv",
		title: "The Caesar's Treasure",
	},
	{
		creator_id: 4,
		date: "Thu, 25 Dec 2003 12:00:00 GMT",
		description: "First edition classic novel with original dust jacket.",
		id: 24,
		postcode: "JKL012",
		share_code: "T9dXareTXx",
		title: "The Literati Gem",
	},
	{
		creator_id: 4,
		date: "Wed, 15 Jun 2005 18:45:30 GMT",
		description: "Set of hand-crafted ceramic dinnerware.",
		id: 25,
		postcode: "MNO345",
		share_code: "U0eZareEZz",
		title: "The Gourmet's Set",
	},
	{
		creator_id: 4,
		date: "Fri, 28 Oct 2007 22:30:00 GMT",
		description: "Ornate wooden chess set with historical figures.",
		id: 26,
		postcode: "PQR678",
		share_code: "W1fAareAFa",
		title: "The Grandmaster's Legacy",
	},
	{
		creator_id: 4,
		date: "Sun, 20 Sep 2009 13:15:45 GMT",
		description: "Limited edition vinyl record of a famous jazz ensemble.",
		id: 27,
		postcode: "STU901",
		share_code: "X2gBareBFb",
		title: "The Jazz Chronicle",
	},
	{
		creator_id: 4,
		date: "Tue, 05 Apr 2011 07:00:00 GMT",
		description: "Original oil painting of a Mediterranean landscape.",
		id: 28,
		postcode: "VWX234",
		share_code: "Y3hCareCFc",
		title: "The Azure Vista",
	},
	{
		creator_id: 4,
		date: "Thu, 12 Jan 2012 20:20:20 GMT",
		description: "Signed basketball from a championship game.",
		id: 29,
		postcode: "YZA567",
		share_code: "Z4iDareDFd",
		title: "The Champion's Sphere",
	},
	{
		creator_id: 4,
		date: "Sat, 21 Mar 2015 11:11:11 GMT",
		description: "Custom-built vintage road bicycle.",
		id: 30,
		postcode: "BCD890",
		share_code: "A5jEareEF",
		title: "The Velocipede's Dream",
	},
];
