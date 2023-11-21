import { View } from "react-native"
import Svg, { Text, Path, Circle, Line, Rect, Image } from "react-native-svg"
import BlinkingCircle from "../BlinkingCircle"

import tube from "../../assets/map_logos/Underground.png"

let logos = {
	tube: tube,
}

const SVG = ({ journey, user }) => {
	const legSpacing = 60 // Vertical space between legs
	const nodeRadius = 5 // Radius of the circle representing a node
	let currentY = 40 // Initial Y position to accommodate departure point text


	const svgElements = journey.legs.map((leg, legIndex) => {
		let elements = []
		let departure = new Date(leg.departure)
		let now = new Date()
		let arrival = new Date(leg.arrival)

		// Add departure point at the start of the leg

		let timeText = `${departure.getHours()}:${departure
			.getMinutes()
			.toString()
			.padStart(2, "0")}`

		elements.push(
			<Text
				x="60"
				y={currentY + 5}
				fontFamily="Verdana"
				fontSize="11"
				key={"departurePoint-" + legIndex}
			>
				{leg.departurePoint}
			</Text>
		)
		elements.push(
			<Circle
				cx="50"
				cy={currentY}
				r={nodeRadius}
				fill="white"
				stroke="darkgrey"
				strokeWidth="3"
				key={"circle-" + legIndex}
			/>
		)
		elements.push(
			<Text
				x="0"
				y={currentY + 5}
				fontFamily="Verdana"
				fontSize="11"
				key={"timeText-" + legIndex}
			>
				{timeText}
			</Text>
		)

		// Add a line to represent the leg
		let styling = line_object[leg.mode] // make sure line_object is defined and accessible
		if (leg.mode == "tube") {
			styling.color = tube_lines[leg.line].boxColor
		}
		elements.push(
			<Line
				x1="50"
				y1={currentY + 6}
				x2="50"
				y2={currentY + legSpacing}
				stroke={styling.color}
				strokeWidth="3"
				strokeDasharray={styling.line_dash}
				key={"line-" + legIndex}
			/>
		)

		if (user == true) {
			//console.log(now < arrival && now > departure)
			if (now < arrival && now > departure) {
				let minutes = (now.getTime() - departure.getTime()) / 60000
				let userY = currentY + (legSpacing * minutes) / leg.duration
				// elements.push(
				//   <BlinkingCircle userY = {userY}/>
				// );

				elements.push(
					<Circle
						cx="50"
						cy={userY}
						r={5}
						fill="red"
						stroke="red"
						strokeWidth="3"
						key={"user" + legIndex}
					/>
				)
			}
		}

		let stopsText
		if (leg.mode === "walking") {
			stopsText = leg.distance
		} else {
			stopsText = leg.stops.length > 0 ? `${leg.stops.length} stops` : "Direct"
		}
		const durationText = `${leg.duration} min`
		elements.push(
			<Text
				x="80"
				y={currentY + 25}
				fontFamily="Verdana"
				fontSize="10"
				key={"durationText-" + legIndex}
			>
				{durationText} - {stopsText}
			</Text>
		)

		// Add a box with rounded edges for the mode
		let modeText = leg.mode.charAt(0).toUpperCase() + leg.mode.slice(1)
		let boxWidth = styling.boxSize
		const modeTextY = currentY + legSpacing / 2 + 18
		const boxX = 80
		const boxY = modeTextY - 15
		let boxColor = styling.boxColor
		let textColor = styling.textColor

		if (leg.mode == "tube") {
			modeText = leg.line
			boxColor = tube_lines[leg.line].boxColor
			//color = tube_lines[leg.line].boxColor
			boxWidth = tube_lines[leg.line].boxSize
			textColor = tube_lines[leg.line].textColor
		}

		elements.push(
			<Rect
				x={boxX}
				y={boxY}
				width={boxWidth}
				height="20"
				rx="5"
				ry="5"
				fill={boxColor}
				stroke="black"
				strokeWidth="1"
				key={"rect-" + legIndex}
			/>
		)
		//console.log(tube)
		elements.push(
			<Image
				x={boxX - 20}
				y={boxY + 2}
				source={tube}
				width="15" // Set the width as needed
				height="15" // Set the height as needed
				preserveAspectRatio="xMidYMid slice"
			/>
		)

		elements.push(
			<Text
				x={boxX + 5}
				y={modeTextY}
				fontFamily="Verdana"
				fill={textColor}
				fontSize="12"
				key={"modeText-" + legIndex}
			>
				{modeText == "Bus" ? `Bus line ${leg.line}` : modeText}
			</Text>
		)

		// Update currentY for next leg
		currentY += legSpacing + 5 // Adjust for arrival point text

		// Add arrival point at the end of the journey
		if (legIndex === journey.legs.length - 1) {
			let dateArrival = new Date(leg.arrival)
			let arrivalText = `${dateArrival.getHours()}:${dateArrival
				.getMinutes()
				.toString()
				.padStart(2, "0")}`

			elements.push(
				<Text
					x="60"
					y={currentY + 5}
					fontFamily="Verdana"
					fontSize="12"
					key={"arrivalPoint-" + legIndex}
				>
					{leg.arrivalPoint}
				</Text>
			)
			elements.push(
				<Circle
					cx="50"
					cy={currentY}
					r={nodeRadius}
					fill="white"
					stroke="darkgrey"
					strokeWidth="3"
					key={"arrivalCircle-" + legIndex}
				/>
			)
			elements.push(
				<Text
					x="0"
					y={currentY + 5}
					fontFamily="Verdana"
					fontSize="11"
					key={"arrivalText-" + legIndex}
				>
					{arrivalText}
				</Text>
			)
		}

		return elements
	})
	const svgHeight = currentY + 20 // Add some padding at the bottom

	return (
		<View>
			<Svg height={svgHeight} width="250">
				{svgElements}
			</Svg>
		</View>
	)
}

const line_object = {
	"walking": {
		line_dash: 5.5,
		color: "grey",
		boxColor: "white",
		boxSize: 52,
		textColor: "black",
	},
	"overground": {
		line_dash: 0,
		color: "#ee7c0e",
		boxColor: "#ee7c0e",
		boxSize: 73,
		textColor: "white",
	},
	"tube": {
		line_dash: 0,
		color: "blue",
		boxColor: "blue",
		boxSize: 35,
		textColor: "black",
	},
	"dlr": { line_dash: 0, color: "#00a4a7", boxColor: "#00a4a7", boxSize: 10 },
	"elizabeth-line": {
		line_dash: 0,
		color: "#802bc2",
		boxColor: "#802bc2",
		boxSize: 81,
		textColor: "white",
	},
	"national-rail": {
		line_dash: 0,
		color: "#0e46b5",
		boxColor: "#0e46b5",
		boxSize: 75,
		textColor: "black",
	},
	"bus": {
		line_dash: 0,
		color: "red",
		boxColor: "red",
		boxSize: 75,
		textColor: "white",
	},
}

const tube_lines = {
	Bakerloo: {
		color: "grey",
		boxColor: "#b36305",
		boxSize: 55,
		textColor: "black",
	},
	Central: {
		color: "grey",
		boxColor: "#e32017",
		boxSize: 45,
		textColor: "white",
	},
	Circle: {
		color: "grey",
		boxColor: "#ffd300",
		boxSize: 45,
		textColor: "black",
	},
	District: {
		color: "grey",
		boxColor: "#00782a",
		boxSize: 52,
		textColor: "black",
	},
	Hammersmith: {
		color: "grey",
		boxColor: "#f3a9bb",
		boxSize: 70,
		textColor: "black",
	},
	Jubilee: {
		color: "grey",
		boxColor: "#a0a5a9",
		boxSize: 48,
		textColor: "black",
	},
	Metropolitan: {
		color: "grey",
		boxColor: "#9b0056",
		boxSize: 70,
		textColor: "black",
	},
	Northern: {
		color: "grey",
		boxColor: "#000000",
		boxSize: 55,
		textColor: "white",
	},
	Piccadilly: {
		color: "grey",
		boxColor: "#003688",
		boxSize: 61,
		textColor: "white",
	},
	Victoria: {
		color: "grey",
		boxColor: "	#0098d4",
		boxSize: 55,
		textColor: "black",
	},
	Waterloo: {
		color: "grey",
		boxColor: "#95cdba",
		boxSize: 55,
		textColor: "black",
	},
}

export default SVG
