"use client";

import useUtility from '@/app/_hooks/useUtility';
import { bookImage, showDateTime } from '@/lib/helpers';
import React from 'react';
import { Image } from 'react-bootstrap';
import BookAbout from './BookAbout';
import BookSyllabus from './BookSyllabus';

export default function BookDetails({ book }) {

    const { trans } = useUtility();

    return (
        <>
            <section className="course-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="course-banner-content">
                                <h2 className="course-banner__title text-white">{trans(book?.title)}</h2>
                                <p className="course-banner__desc text-white mb-3">{trans(book?.category?.name)}</p>

                                <div className="course-banner__meta">
                                    <div className="course-banner__meta-item">
                                        <span className="icon"><i className="far fa-clock"></i></span>
                                        <span className="text text-white">{showDateTime(book?.created_at, 'DD MMM YYYY')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="course-banner-thumb">
                                <Image src={bookImage(book?.image)} className="fit-image" alt="book_image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-50">
                <div className="container">
                    <div className="row justify-content-center">
                         <div className="col-lg-12">
                            <div className="card custom--card border-0">
                                <div className="card-body p-4 p-lg-5">
                                    <BookAbout book={book} />
                                    <BookSyllabus book={book} />
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </section>
        </>
    );
}
