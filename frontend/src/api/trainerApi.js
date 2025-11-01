import api from "../axios";

export const getAllTrainers = async () => {
    return api.get("/trainers");
};

export const createTrainer = async (data) => {
    return api.post("/trainers", data); 
};
