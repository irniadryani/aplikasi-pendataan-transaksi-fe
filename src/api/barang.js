import { Api } from "../lib/common";
const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

export const allBarangFn = async () => {
	const response = await Api.get('barang')
	return response.data
}

export const submitBarangFn = async (data) => {
	const response = await Api.post('barang', data, formDataconfig)
	return response.data
}

export const getBarangByIdFn = async (id) => {
	const response = await Api.get(`barang/${id}`);
	return response.data;
  };

  export const deleteBarangFn = async (id) => {
	const response = await Api.delete(`barang/${id}`)
	return response.data
}