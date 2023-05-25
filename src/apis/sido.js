import axios from "axios";

export const getSido = async () => {
	const data = await axios({
		method: "get",
		url: "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000",
	});
	return data.data.regcodes;
};
export const getGu = async (code) => {
	const data = await axios({
		method: "get",
		url: `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${code}*000000`,
	});
	return data.data.regcodes;
};
