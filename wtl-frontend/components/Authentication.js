import React from "react";
import { Flex, Box } from "@chakra-ui/react";
const Authentication = ({ children }) => {
	return (
		<Flex
			w="100%"
			p={4}
			color="white"
			height={"100vh"}
			overflow={"hidden"}
			bgColor={"gray.50"}
			alignItems={"center"}
			justifyContent={"center"}
		>
			<Box
				p={"1rem 2rem"}
				bgColor={"white"}
				borderRadius={"2xl"}
				color={"gray.800"}
				width={"40%"}
				boxShadow={"2xl"}
			>
				{children}
			</Box>
		</Flex>
	);
};

export default Authentication;
