"use client";
import { Form, Formik, ErrorMessage } from "formik";
import useUtility from "@/app/_hooks/useUtility";
import { FormField } from "@/app/_forms/FormsStore";
import Input from "@/app/_forms/Input";
import useDonation from "../_hooks/useDonation";
import Link from "next/link";

export default function DonationForm() {
    const { initialValues, validationSchema, handleSubmit, loading } = useDonation();
    const { trans } = useUtility();

    return (
        <div className="donation-wrapper">
        
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form className="donation-form">
                        {/* Hidden fields to satisfy validation/backend for now */}
                        <div className="d-none">
                            <FormField name="full_name" />
                            <FormField name="currency" />
                            <FormField name="message" />
                        </div>

                        <div className="card custom--card mb-4 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h4 className="mb-4">{trans('Make a Onetime Donation')}</h4>
                                
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">{trans('Amount (USD)')}</label>
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-light border-end-0">$</span>
                                        <Input 
                                            name="amount" 
                                            className="form-control border-start-0 ps-0 fs-4 fw-bold" 
                                            placeholder="0.00" 
                                            type="number"
                                        />
                                    </div>
                                    <ErrorMessage name="amount" component="div" className="text-danger mt-1 small" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">{trans('Payment Method to Use')}</label>
                                    
                                    <div className="payment-methods">
                                        {/* Credit Card Option */}
                                        <div 
                                            className={`payment-method-item border rounded p-3 mb-3 cursor-pointer ${values.method_code === '101' ? 'border-primary bg-light' : ''}`}
                                            onClick={() => setFieldValue('method_code', '101')}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="method_code" 
                                                        checked={values.method_code === '101'}
                                                        onChange={() => setFieldValue('method_code', '101')}
                                                        value="101"
                                                    />
                                                </div>
                                                <div className="ms-3">
                                                    <div className="fw-medium mb-1">{trans('Credit or Debit Card')}</div>
                                                    <div className="d-flex gap-2">
                                                        <i className="fab fa-cc-visa fa-lg text-primary"></i>
                                                        <i className="fab fa-cc-mastercard fa-lg text-danger"></i>
                                                        <i className="fab fa-cc-amex fa-lg text-primary"></i>
                                                        <i className="fab fa-cc-discover fa-lg text-warning"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PayPal Option */}
                                        <div 
                                            className={`payment-method-item border rounded p-3 cursor-pointer ${values.method_code === '102' ? 'border-primary bg-light' : ''}`}
                                            onClick={() => setFieldValue('method_code', '102')}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="method_code" 
                                                        checked={values.method_code === '102'}
                                                        onChange={() => setFieldValue('method_code', '102')}
                                                        value="102"
                                                    />
                                                </div>
                                                <div className="ms-3">
                                                    <div className="fw-medium mb-1">{trans('PayPal')}</div>
                                                    <i className="fab fa-paypal fa-2x text-primary"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ErrorMessage name="method_code" component="div" className="text-danger mt-1 small" />
                                </div>

                                <div className="mb-4">
                                    <Link href="/login" className="text-decoration-none d-flex align-items-center gap-2">
                                        <i className="las la-info-circle fs-5"></i>
                                        {trans('Log in to use Direct Debit (ACH)')}
                                    </Link>
                                </div>

                                <div className="mb-4 text-muted small">
                                    {trans('This site is protected by reCAPTCHA and the Google')} <Link href="/policy/privacy-policy">{trans('Privacy Policy')}</Link> {trans('and')} <Link href="/policy/terms-of-service">{trans('Terms of Service')}</Link> {trans('apply')}.
                                </div>

                                <div className="d-flex gap-3">
                                    <button type="button" className="btn btn-light border px-4">{trans('Cancel')}</button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary border px-4 flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                        disabled={loading}
                                    >
                                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                        {loading ? trans('Please wait...') : trans('Donate')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="card custom--card border-0 shadow-sm mt-4">
                <div className="card-body p-4">
                    <h4 className="mb-3">{trans('Set Up Monthly Donations')}</h4>
                    <p className="text-muted mb-4">
                        {trans('You can set up automatic monthly donations and manage your donation information if you log in.')}
                    </p>
                    <div className="d-flex gap-3">
                        <Link href="/login" className="btn btn-outline-primary d-flex align-items-center gap-2">
                            <i className="las la-sign-in-alt"></i>
                            {trans('Log In')}
                        </Link>
                        <Link href="/register" className="btn btn-outline-primary d-flex align-items-center gap-2">
                            <i className="las la-user-plus"></i>
                            {trans('Create Account')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
