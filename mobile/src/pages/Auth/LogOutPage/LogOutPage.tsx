import React, { useEffect } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import Center from "../../../components/Center";
import { devalidateSession } from "../../../state/session/session.slice";

const LogOutPage: React.FC<{}> = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(devalidateSession());
	});

	return (
		<Center>
			<Text>Loading...</Text>
		</Center>
	);
};

export default LogOutPage;
