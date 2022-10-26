import React, { useEffect, useState } from "react";
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	Text,
	InputGroup,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Authentication } from "../../components";
import { axiosInstance } from "../../api/axios";
import { userLogin } from "../../api";
import Head from "next/head";
const INTITAL_DATA = { email: "", password: "" };
const Login = () => {
	const toast = useToast();
	const router = useRouter();
	const [formData, setFormData] = useState(INTITAL_DATA);
	const [btnLoading, setBtnLoading] = useState(false);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setBtnLoading(true);
		try {
			if (formData["email"] && formData["password"]) {
				const res = await userLogin(formData);
				toast({
					description: "Logged in successfuly",
					status: "success",
					duration: 2000,
				});
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("_id", res.data.user._id);
				axiosInstance.defaults.headers[
					"Authorization"
				] = `Bearer ${res.data.token}`;
				router.push("/user");
			} else {
				toast({
					description: "Please fill all required fields",
					status: "warning",
					duration: 2000,
				});
			}
		} catch (err) {
			toast({
				description: err.response.data.message,
				duration: 3000,
				title: "Check Credentials",
				status: "error",
				isClosable: true,
			});
		}
		setBtnLoading(false);
	};
	return (
		<Authentication>
			<Head>
				<title>Login</title>
			</Head>
			<Text fontSize={"4xl"} textAlign="center">
				Login
			</Text>
			<form>
				<FormControl isRequired mt={"1.5rem"}>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input
						id="email"
						type="email"
						p={"1.5rem"}
						placeholder="Enter your email"
						onChange={handleChange}
					/>
				</FormControl>
				<FormControl isRequired mt={"1.5rem"}>
					<FormLabel htmlFor="password">Password</FormLabel>
					<Input
						id="password"
						p={"1.5rem"}
						type="password"
						placeholder="Enter password"
						onChange={handleChange}
					/>
				</FormControl>
				<Button
					colorScheme={"green"}
					width={"100%"}
					mt={"2rem"}
					p={"1.5rem"}
					onClick={handleSubmit}
					isLoading={btnLoading}
					type="submit"
				>
					Login
				</Button>
			</form>
			<Text textAlign={"center"} mt={"1"}>
				Don&apos;t have an account? Create one
			</Text>
			<Link href={"/signup"}>
				<Text
					color={"blue.500"}
					cursor={"pointer"}
					textAlign={"center"}
				>
					SignUp
				</Text>
			</Link>
		</Authentication>
	);
};

export default Login;
