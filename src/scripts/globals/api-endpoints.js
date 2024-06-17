import CONFIG from "./config";

const API_ENDPOINT = {
    ALL_REPORTS: `${CONFIG.BASE_URL}reports`,
    DETAIL: (id) => `${CONFIG.BASE_URL}reports/${id}`,
    ADD_REPORT:`${CONFIG.BASE_URL}reports`,
    ALL_DISASTER: `${CONFIG.BASE_URL}disaster-types`,
    WEATHER: `${CONFIG.BASE_WEATHER}`,
    ALL_NEWS: `${CONFIG.BASE_URL}news`,
    ADD_REVIEW: `${CONFIG.BASE_URL}comment`,
}

export default API_ENDPOINT;