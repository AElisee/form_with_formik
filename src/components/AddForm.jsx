import { Field, Formik, Form, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { date } from 'yup';

const AddForm = () => {
    const [successMesaage, setSuccessMesaage] = useState(null);
    const [errorMesaage, setErrorMesaage] = useState(null);
    const createdAt = ""

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, 'Le prénom doit contenir au moins 2 caractères')
            .required('Le prénom est requis'),
        lastName: Yup.string()
            .min(2, 'Le nom doit contenir au moins 2 caractères')
            .required('Le nom est requis'),
        email: Yup.string()
            .email('Adresse email invalide')
            .required('L\'adresse email est requise'),
        birthDay: Yup.date()
            .required('La date de naissance est requise')
            .nullable(),
    });

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                birthDay: '',
                createdAt: Date.now()

            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                    const response = await fetch('http://localhost:5001/datas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });
                    if (response.ok) {
                        setSuccessMesaage('Super, vous êtes inscrit !');
                        setTimeout(() => {
                            setSuccessMesaage(null);
                        }, 5000);
                        resetForm();
                    } else {
                        setErrorMesaage("Erreur lors de l'envoi des données.");
                    }
                } catch (error) {
                    setErrorMesaage("Oups! Une erreur est survevue lors de l'envoie !");
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <div className='w-full h-screen flex items-center justify-center'>
                    <Form action="" className="w-[700px] border rounded-md p-3">
                        <div className="flex gap-3">
                            <div className="w-1/2 flex flex-col gap-1">
                                <label htmlFor="lastName">Nom</label>
                                <Field type="text" id='lastName' name='lastName' placeholder='Votre nom' className='py-2 px-1 bg-slate-100' />
                                <span className='text-red-300'><small><ErrorMessage name="lastName" /></small></span>
                            </div>

                            <div className="w-1/2 flex flex-col gap-1">
                                <label htmlFor="firstName">Prénom</label>
                                <Field type="text" id='firstName' name='firstName' placeholder='Votre Prénom' className='py-2 px-1 bg-slate-100' />
                                <span className='text-red-300'><small><ErrorMessage name="firstName" /></small></span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-1/2 flex flex-col gap-1">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id='email' name='email' placeholder='Votre Adresse mail' className='py-2 px-1 bg-slate-100' />
                                <span className='text-red-300'><small><ErrorMessage name="email" /></small></span>
                            </div>

                            <div className="w-1/2 flex flex-col gap-1">
                                <label htmlFor="birthDay">Date de naissance</label>
                                <Field type="date" id='birthDay' name='birthDay' placeholder='Votre date de naissance' className='py-2 px-1 bg-slate-100' />
                                <span className='text-red-300'><small><ErrorMessage name="birthDay" /></small></span>
                            </div>
                        </div>

                        <div className='pt-4 flex justify-end'>
                            <button type="submit" className='p-2 bg-purple-400 rounded-md px-4 cursor-pointer' disabled={isSubmitting}>
                                Soumettre
                            </button>
                        </div>

                        <div className='flex items-center justify-center text-base'>
                            {errorMesaage && <span className='text-red-400'>{errorMesaage}</span>}
                            {successMesaage && <span className='text-green-400'>{successMesaage}</span>}
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default AddForm;
