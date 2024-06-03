import API_ENDPOINT from "../globals/api-endpoints";

class DisasterDBSource{
    static async getWeather() {
        const response = await fetch(API_ENDPOINT.WEATHER);
    const responseJson = await response.json();
    return responseJson;
    }
}


export default DisasterDBSource;