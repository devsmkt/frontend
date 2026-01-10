"use client";
import { Form, Formik } from "formik";
import SubmitBtn from "../../../_partials/SubmitBtn";
import useUtility from "@/app/_hooks/useUtility";
import { FormField, FormGroup } from "@/app/_forms/FormsStore";
import useDonation from "../_hooks/useDonation";

export default function DonationForm() {
    const { initialValues, validationSchema, handleSubmit, loading } = useDonation();
    const { trans } = useUtility();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (    
                <Form className="contact-form">
                    <h3 className="contact-form__title">{trans(`Make a Donation`)}</h3>
                    
                    <div className="row">
                        <div className="col-md-6">
                            <FormField className="form--control" name="full_name" label={trans('Full Name')} required={true} />
                        </div>
                        <div className="col-md-6">
                            <FormField className="form--control" name="email" label={trans('Email')} required={true} type="email" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <FormField className="form--control" name="amount" label={trans('Amount')} required={true} type="number" />
                        </div>
                        <div className="col-md-4">
                            <FormField className="form--control" name="currency" label={trans('Currency')} required={true} readOnly />
                        </div>
                        <div className="col-md-4">
                             {/* Hidden or ReadOnly Method Code */}
                            <FormField className="form--control" name="method_code" label={trans('Method Code')} required={true} readOnly />
                        </div>
                    </div>

                    <FormField className="form--control" name="message" type="textarea" label={trans('Message')} required={true} />
                 
                    <FormGroup className="mb-0" >
                        <SubmitBtn isSubmitting={loading} title={trans('Donate Now')} className="btn btn--base btn--shadow w-100"/>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    )
}
