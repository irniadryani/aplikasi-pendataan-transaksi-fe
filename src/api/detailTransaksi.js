import { Api } from "../lib/common";
const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

export const allDetailTransaksiFn = async () => {
	const response = await Api.get('detail')
	return response.data
}

export const submitDetailTransaksiFn = async (data) => {
	const response = await Api.post('transaksi', data, formDataconfig)
	return response.data
}

export const deleteDetailTransaksiFn = async (id) => {
	const response = await Api.delete(`transaksi/${id}`)
	return response.data
}




export const updateDetailTransaksiFn = async (id, data) => {
	const response = await Api.put(`detail/${id}`, data, formDataconfig)
	return response.data
}

export const detailTransaksiByIdFn = async (id) => {
	const response = await Api.get(`detail/${id}`)
	return response.data
}
