import ENDPOINTS from "@/lib/endpoints";
import { useState } from 'react';
import { getFormData, notifyToast, request } from "@/lib/helpers";
import * as Yup from 'yup';
import toast from "react-hot-toast";

export default function useDonation() {
    const [loading, setLoading] = useState(false);

    const initialValues = {
        amount: 100,
        method_code: '101',
        currency: 'USD',
        full_name: 'John Doe',
        email: 'john@example.com',
        message: 'Keep up the good work!'
    };

    const validationSchema = Yup.object().shape({
        amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
        method_code: Yup.string().required('Method code is required'),
        currency: Yup.string().required('Currency is required'),
        full_name: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        message: Yup.string().required('Message is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = getFormData(values);
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.DONATION_STORE, formData);
            
            if (data.status === 'success') {
                notifyToast(data);
                resetForm();
            } else {
                notifyToast(data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
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
