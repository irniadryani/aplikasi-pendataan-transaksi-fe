import { Api } from "../lib/common";
const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

export const allTransaksiFn = async () => {
	const response = await Api.get('sales')
	return response.data
}

export const submitTransaksiFn = async (data) => {
	const response = await Api.post('sales', data, formDataconfig)
	return response.data
}