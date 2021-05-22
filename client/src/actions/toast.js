import { toast } from 'react-toastify';


export const successToast = (res) => {
    res.status == 1 ? toast.success(res.message, {
        position: "top-right",
    }) : toast.error(res.message, {
        position: "top-right",
    });
}

export const errorToast = (err) => {
    toast.error(err.message, {
        position: "top-right",
    });
}