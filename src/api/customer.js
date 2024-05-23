import { Api } from "../lib/common";
const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

export const allCustomerFn = async () => {
	const response = await Api.get('customer')
	return response.data
}

export const submitCustomerFn = async (data) => {
	const response = await Api.post('customer', data, formDataconfig)
	return response.data
}

export const getCustomerByIdFn = async (id) => {
	const response = await Api.get(`customer/${id}`);
	return response.data;
  };

  export const deleteCustomerFn = async (id) => {
	const response = await Api.delete(`customer/${id}`)
	return response.data
}