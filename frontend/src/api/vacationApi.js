import baseAxios from "./api";

export const getVacations = async () => {
    const res = await baseAxios.get(`/`);
    return res.data;
};
