import axios from "axios";


const weeklyApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api/weekly-events"
});


export default weeklyApi;