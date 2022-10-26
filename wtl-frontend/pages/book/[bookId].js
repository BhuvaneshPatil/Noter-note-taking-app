import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { getBookById } from "../../api/book";
import { getNotesForBook, handleAddUpdate } from "../../api";
import { useQuill } from "react-quilljs";
import { useRef } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AuthHoc } from "../../components";
import Head from "next/head";
const BookPage = () => {
	const router = useRouter();
	const toast = useToast();
	const { quill, quillRef } = useQuill();
	const editorRef = useRef();
	const [book, setBook] = useState(null);
	// useEffect(() => {
	// 	if (quillRef) {
	// 		editorRef = quillRef;
	// 	}
	// }, [quill]);
	useEffect(() => {
		const { bookId } = router.query;

		const fetch = async () => {
			try {
				const res = await getBookById(bookId);
				setBook(res.data.book);
				const notes = await getNotesForBook(bookId);
				if (quill) {
					quill.setContents(JSON.parse(notes.data.content), "api");
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (bookId) {
			fetch();
		}
	}, [router, quill]);
	const handleSave = async () => {
		const { bookId } = router.query;
		const content = JSON.stringify(quill.getContents().ops);
		const res = await handleAddUpdate({ content: content }, bookId);
		toast({
			status: "success",
			description: "Updated successfuly",
			duration: 2000,
		});
	};
	return (
		<AuthHoc>
			<Head>
				<title>{book ? book.name : "Loading book"}</title>
			</Head>
			<Box p={"1rem 10%"}>
				<Button
					leftIcon={<ArrowBackIcon />}
					onClick={() => router.push("/user")}
				>
					{" "}
					View My Books
				</Button>
			</Box>
			<Box p={"0 10%"} pb="5rem">
				{book ? (
					<Box>
						<Text fontSize={"5xl"}>{book.name}</Text>
						{book.reason ? (
							<>
								<Text
									fontSize={"md"}
									mt={"1rem"}
									color={"gray.900"}
								>
									I am reading this book because -{" "}
								</Text>
								<Text fontSize={"md"} color={"gray.600"}>
									{book.reason}
								</Text>
							</>
						) : (
							<></>
						)}
					</Box>
				) : (
					<></>
				)}
				<Box height={"450px"} w={"100%"} m={"2rem 0"} pb={"2rem"}>
					<Box ref={quillRef}></Box>
				</Box>
				<Flex flexDirection={"row-reverse"}>
					<Button onClick={handleSave} colorScheme="green">
						Save
					</Button>
				</Flex>
			</Box>
		</AuthHoc>
	);
};

export default BookPage;
