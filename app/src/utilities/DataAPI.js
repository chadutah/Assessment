import axios from "axios";

export default {
    getDataType(communicationType) {
        return axios.get(`/api/data/${communicationType}`)
    },
    getDataReason(reason) {
        return axios.get(`/api/reason/${reason}`)
    },
    getAllData() {
        return axios.get("/api/data/allData")
    },
    getAllCount() {
        return axios.get("/api/data/count")
    }
}