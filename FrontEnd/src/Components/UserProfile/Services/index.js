import axios from "axios";
import { APIURL } from "../../../Constants/apiUrl";

export async function patchUserDetails(data) {
  const { id, ...rest } = data;
  return axios.patch(`${APIURL}user/${id}`, { ...rest });
}

export async function fetchUserDetails(data) {
  const { id } = data;
  return axios.get(`${APIURL}user/${id}`);
}
