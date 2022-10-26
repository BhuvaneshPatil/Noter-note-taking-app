import {
	Box,
	Button,
	Flex,
	Spinner,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { getBooksForUser } from "../../api/book";
import { AuthHoc } from "../../components";
import BookModal from "../../components/BookModal";

const User = () => {
	const [books, setBooks] = useState([]);
	const router = useRouter();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(true);
	const handleBookAdd = (data) => {
		setBooks([...books, data]);
	};
	useEffect(() => {
		const fetch = async () => {
			const res = await getBooksForUser(localStorage.getItem("_id"));
			setBooks(res.data.books);
			setLoading(false);
		};
		fetch();
	}, []);
	const handleLogout = () => {
		localStorage.removeItem("token");
		toast({
			status: "info",
			title: "Logged out successfuly. Happy Reading ! ",
			duration: 2000,
		});
		router.push("/login");
	};
	return (
		<AuthHoc>
			<Head>
				<title>My Books</title>
			</Head>
			<Box m={"0 10%"}>
				<Flex
					alignItems={"center"}
					justifyContent={"space-between"}
					p={"1rem 0"}
				>
					<Text fontSize={"3xl"}>Your Books</Text>
					<Box>
						<Button
							colorScheme={"green"}
							onClick={onOpen}
							mr="1rem"
						>
							Add Book
						</Button>
						<Button colorScheme={"gray"} onClick={handleLogout}>
							Logout
						</Button>
					</Box>
				</Flex>
				<BookModal
					isOpen={isOpen}
					onClose={onClose}
					onOpen={onOpen}
					handleSubmit={handleBookAdd}
				/>
				{/* list */}
				{loading ? (
					<Spinner
						position={"absolute"}
						top={"50vh"}
						right="50%"
						transform={"translate(-50%,-50%)"}
					/>
				) : books.length ? (
					<Box>
						<Flex direction={"column"}>
							{books.map((item) => {
								return (
									<Flex
										key={item._id}
										width={"100%"}
										m={"1rem 0"}
										borderRadius={"2xl"}
										boxShadow={"lg"}
										alignItems="center"
										justifyContent="space-between"
										p={"2rem"}
										onClick={() =>
											router.push(`book/${item._id}`)
										}
										cursor={"pointer"}
									>
										<Text
											fontWeight={"bold"}
											fontSize={"large"}
										>
											{item.name}
										</Text>
										<Text
											color={"gray.400"}
											display="inline"
										>
											<span>
												<Text fontWeight={"semibold"}>
													Added -{" "}
												</Text>
											</span>
											{moment(item.createdAt).format(
												"LLL"
											)}
										</Text>
									</Flex>
								);
							})}
						</Flex>
					</Box>
				) : (
					<Box>
						<Text fontSize={"2xl"}>There are no books yet</Text>
					</Box>
				)}
			</Box>
		</AuthHoc>
	);
};

export default User;
