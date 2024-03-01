import axiosClient from "./axiosClient";

const questionApi = {
    getAll(params) {
        const url = '/';
        return axiosClient.get(url, {params})
    },

    get(id) {
        const url = `/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/create';
        return axiosClient.get(url,data);
    },

    update(data) {
        const url = `/update/${data.idQuestionContent}`;
        return axiosClient.get(url,data);
    },

    remove(id) {
        const url = `/delete/${id}`;
        return axiosClient.get(url);
    }
};

export default questionApi;