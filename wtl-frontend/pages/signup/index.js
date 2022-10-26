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
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Authentication } from "../../components";
import { userSignup } from "../../api";
import { useRouter } from "next/router";
import Head from "next/head";
const INITIAL_STATE = { email: "", password: "" };
let child;
function SignUp() {
	const router = useRouter();
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [confPassword, setConfPassword] = useState("");
	const [passConfirmed, setPassConfirmed] = useState(false);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	useEffect(() => {
		if (formData["password"]) {
			setPassConfirmed(formData["password"] === confPassword);
		}
	}, [confPassword, formData]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await userSignup({ user: { ...formData } });
		localStorage.setItem("token", res.data.token);
		localStorage.setItem("_id", res.data.user._id);
		router.push("/user");
	};
	return (
		<Authentication>
			<Head>
				<title>Sign up</title>
			</Head>
			<Text fontSize={"4xl"} textAlign="center">
				Sign Up
			</Text>
			<form>
				<FormControl isRequired mt={"1rem"}>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input
						id="email"
						type="email"
						p={"1rem"}
						placeholder="Enter your email"
						onChange={handleChange}
					/>
					<FormHelperText>
						We&apos;ll never share your email.
					</FormHelperText>
				</FormControl>
				<FormControl isRequired mt={"1rem"}>
					<FormLabel htmlFor="password">Password</FormLabel>
					<Input
						id="password"
						p={"1rem"}
						type="password"
						placeholder="Enter password"
						onChange={handleChange}
					/>
					<FormHelperText>Enter a strong passwprd</FormHelperText>
				</FormControl>
				<FormControl isRequired mt={"1rem"}>
					<FormLabel htmlFor="confPassword">
						Confirm Password
					</FormLabel>
					<InputGroup>
						<Input
							id="confPassword"
							p={"1rem"}
							type="password"
							placeholder="Confirm password"
							disabled={!formData["password"].length}
							onChange={(e) => setConfPassword(e.target.value)}
						/>
						{confPassword ? (
							<InputRightElement>
								{passConfirmed ? (
									<CheckIcon color="green.500" />
								) : (
									<CloseIcon color="red.500" />
								)}
							</InputRightElement>
						) : (
							<></>
						)}
					</InputGroup>
					<FormHelperText>Re-enter your password</FormHelperText>
				</FormControl>
				<Button
					colorScheme={"green"}
					width={"100%"}
					mt={"2rem"}
					p={"1.5rem"}
					onClick={handleSubmit}
					disabled={!passConfirmed}
					type="submit"
				>
					Sign Up
				</Button>
			</form>
			<Text textAlign={"center"} mt={"1"}>
				Already have an account?
			</Text>
			<Link href={"/login"}>
				<Text
					color={"blue.500"}
					cursor={"pointer"}
					textAlign={"center"}
				>
					Login
				</Text>
			</Link>
		</Authentication>
	);
}

export default SignUp;
