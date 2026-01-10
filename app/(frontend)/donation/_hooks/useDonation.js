import ENDPOINTS from "@/lib/endpoints";
import { useState } from 'react';
import { getFormData, notifyToast, request } from "@/lib/helpers";
import * as Yup from 'yup';
import toast from "react-hot-toast";

export default function useDonation() {
    const [loading, setLoading] = useState(false);

    const initialValues = {
        amount: 50,
        method_code: '101',
        currency: 'USD',
        full_name: '',
        message: ''
    };

    const validationSchema = Yup.object().shape({
        amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
        method_code: Yup.string().required('Method code is required'),
        currency: Yup.string().required('Currency is required'),
        full_name: Yup.string().nullable(),
        message: Yup.string().nullable(),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.DONATION_STORE, values, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (data.status === 'success') {
                if (data.data?.redirect_url) {
                    window.location.href = data.data.redirect_url;
                } else {
                    notifyToast(data);
                    resetForm();
                }
            } else {
                notifyToast(data);
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        initialValues,
        validationSchema,
        handleSubmit,
        loading
    };
}
