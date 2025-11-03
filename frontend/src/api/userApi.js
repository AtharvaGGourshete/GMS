import api from "../axios";

export const getAllUsers = async () => {
    return api.get("/users");
};

export const createUser = async () => {
    return api.post("/user")
}