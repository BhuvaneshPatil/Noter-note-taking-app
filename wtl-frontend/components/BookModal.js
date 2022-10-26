import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addBook } from "../api";
const INTITIAL_STATE = { name: "", author: "", reason: "" };
const BookModal = ({ handleSubmit, isOpen, onClose, onOpen }) => {
	const [formData, setFormData] = useState(INTITIAL_STATE);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onFormSubmit = async (e) => {
		e.preventDefault();
		const data = {
			bookData: formData,
			profile: { id: localStorage.getItem("_id") },
		};
		const res = await addBook(data);
		handleSubmit(res.data.book);
		onClose();
	};
	return (
		<Modal
			blockScrollOnMount={false}
			isOpen={isOpen}
			onClose={onClose}
			width={"400px"}
		>
			<ModalOverlay />
			<ModalContent p={"2rem"} maxW={"70vw"}>
				<ModalHeader fontSize={"2xl"} pl={"0"}>
					Add a book
				</ModalHeader>
				<ModalCloseButton />
				<form>
					<FormControl isRequired>
						<FormLabel htmlFor="name">Book's Name</FormLabel>
						<Input
							id="name"
							name="name"
							type="text"
							onChange={handleChange}
						/>
						<FormHelperText>
							Provide the name of book you are reading
						</FormHelperText>
					</FormControl>
					<FormControl isRequired mt={"1.5rem"}>
						<FormLabel htmlFor="author">Author's Name</FormLabel>
						<Input
							id="author"
							name="author"
							type="text"
							onChange={handleChange}
						/>
						<FormHelperText>
							Provide the name of author of book you are reading
						</FormHelperText>
					</FormControl>
					<FormControl mt={"1.5rem"}>
						<FormLabel htmlFor="reason">
							Why are you reading this book
						</FormLabel>
						<Input
							id="reason"
							name="reason"
							type="text"
							onChange={handleChange}
						/>
						<FormHelperText>
							Provide the reason to read this book? just in case
							to inspire you
						</FormHelperText>
					</FormControl>

					<ModalFooter>
						<Button
							colorScheme={"green"}
							type="submit"
							onClick={onFormSubmit}
							mr="1rem"
						>
							Add
						</Button>
						<Button colorScheme="red" mr={3}>
							Close
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default BookModal;
