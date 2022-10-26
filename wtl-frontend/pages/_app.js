import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { axiosInstance } from "../api/axios";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "../styles/quill.css";
function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		axiosInstance.defaults.headers.Authorization =
			window.localStorage.getItem("token")
				? `Bearer ${window.localStorage.getItem("token")}`
				: null;
	}, [router]);
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
