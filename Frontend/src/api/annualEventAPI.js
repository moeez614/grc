import API from "./axios";

export const getAnnualEvents = () =>
    API.get("/annual-events");

export const getAnnualEvent = (id) =>
    API.get(`/annual-events/${id}`);

export const createAnnualEvent = (formData) =>
    API.post(
        "/annual-events",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

export const updateAnnualEvent = (
    id,
    formData
) =>
    API.put(
        `/annual-events/${id}`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

export const deleteAnnualEvent = (id) =>
    API.delete(
        `/annual-events/${id}`
    );

export const toggleRegistration = (id) =>
    API.patch(
        `/annual-events/${id}/status`
    );