import axios from "axios";
import { Data } from "./types";

export default async function fetchImages(query: string, page = 1): Promise<Data> {
    const response = await axios.get<Data>("https://api.unsplash.com/search/photos", {
      params: {
        query,
        page,
        orientation: "landscape",
      },
      headers: {
        Authorization: "Client-ID 5knI-AnvTFL1idO7zkF8y4O3wT_bpZCyT5WL-n0Ruho",
      },
    });
    return response.data;
}
