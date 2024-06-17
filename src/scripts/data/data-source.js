import API_ENDPOINT from "../globals/api-endpoints";

class DisasterDBSource{
    static async getWeather() {
        const response = await fetch(API_ENDPOINT.WEATHER);
    const responseJson = await response.json();
    return responseJson;
    }

    static async getAllReports() {
        const response =  await fetch(API_ENDPOINT.ALL_REPORTS);
        const responseJson = await response.json();
        return responseJson;
    }
    static async getAllNews() {
        const response =  await fetch(API_ENDPOINT.ALL_NEWS);
        const responseJson = await response.json();
        return responseJson;
    }

    static async addReport(data) {
        const response = await fetch(API_ENDPOINT.ADD_REPORT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        return response.json();
      }

      static async addReview(dataReview) {
          const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataReview),
          });
          return response.json();
        }
      

  static async detailReport(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}


export default DisasterDBSource;