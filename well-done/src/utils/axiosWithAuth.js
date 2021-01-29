import axios from 'axios'

export const axiosWithAuth = () => {
	const token = process.env.TOKEN
	// const token = localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: token,
		},
	})
}
