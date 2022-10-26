import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
export default function Home() {
	const router = useRouter();
	return (
		<Flex
			width={"100%"}
			height={"100vh"}
			overflow="hidden"
			alignItems={"center"}
			justifyContent="center"
			flexDirection={"column"}
		>
			<Head>
				<title>Noter - Ultimate note taking app</title>
			</Head>
			<Text color={"purple.500"} fontSize="7xl" fontWeight={"bold"}>
				noter;
			</Text>
			<Text fontSize={"5xl"} mt={"2rem"}>
				Take Notes on the go..!
			</Text>
			<Text mt="2rem" color={"gray.600"} maxW="50%" textAlign={"center"}>
				Ultimate tool to help your efficiency while reading. No need to
				carry notebook and pen. Take notes. Update them. Read them.
			</Text>
			<Button
				rightIcon={<ArrowForwardIcon />}
				mt={"4rem"}
				colorScheme="purple"
				onClick={() => router.push("/signup")}
			>
				Get Started
			</Button>
		</Flex>
	);
}
