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
			<Text style={{ color: "white", fontSize: 28 }}>Wylogwywanie...</Text>
		</Center>
	);
};

export default LogOutPage;
