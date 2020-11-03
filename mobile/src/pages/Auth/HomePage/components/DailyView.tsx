import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import Center from "../../../../components/Center";
import { devalidateSession } from "../../../../state/session/session.slice";

const DailyView: React.FC<{}> = () => {
	const dispatch = useDispatch();
	return (
		<Center>
			<Text>Daily</Text>
		</Center>
	);
};

export default DailyView;
