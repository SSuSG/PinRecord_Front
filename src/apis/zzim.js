import { API } from "./index";
import axios from "axios";

function doZzim(zzimRequestDto) {
	return API.post("/zzims", zzimRequestDto);
}

function isZzim(zzimRequestDto) {
	return API.post("/zzims/zzim", zzimRequestDto);
}

export { doZzim, isZzim };
