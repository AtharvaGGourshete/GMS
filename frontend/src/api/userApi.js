import api from "../axios";

export const getAllUsers = async () => {
    return api.get("/users");
};
