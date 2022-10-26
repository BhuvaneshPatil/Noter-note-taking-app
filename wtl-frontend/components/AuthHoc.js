import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AuthHoc = ({ children }) => {
	const router = useRouter();
	const toast = useToast();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			toast({ status: "info", title: "Not logged in", duration: "3000" });
			router.push("/login");
		}
	}, []);
	return <>{children}</>;
};

export default AuthHoc;
