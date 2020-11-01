import axios from "axios";
import { APIURL } from "../../../Constants/apiUrl";

export async function getUser(payload) {
  return axios.post(`${APIURL}auth/login`, { ...payload });
}
export async function createUser(payload) {
  return axios.post(`${APIURL}auth/signup`, { ...payload });
}

export async function uploadImage(payload) {
  return axios.post(`${APIURL}user/upload`, { ...payload });
}
