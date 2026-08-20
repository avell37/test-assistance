import baseAxios from "./api";

export const getVacations = async () => {
    const res = await baseAxios.get(`/`);
    return res.data;
};

export const createVacation = async (data) => {
    const res = await baseAxios.post(`/`, data);
    return res.data;
};

export const approveVacation = async (id) => {
    const res = await baseAxios.patch(`/${id}/approve`);
    return res.data;
};

export const rejectVacation = async (id, rejectionReason) => {
    const res = await baseAxios.patch(`/${id}/reject`, {
        rejectionReason,
    });
    return res.data;
};
