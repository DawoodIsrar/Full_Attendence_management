import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { config } from "../../components/config/env"
export default function AddAppraisal() {
    const today = new Date().toISOString().substr(0, 10);
    const [appraisal, setAppraisal] = useState({
        date: today,
        USERID: '',
        name: '',
        understanding_job: '',
        fulfillment_job: '',
        capacity_work: '',
        quality_work: '',
        learning_improvement: '',
        communication: '',
        responsibility: '',
        initiative: '',
        motivation: '',
        adoptability: '',
        reliability: '',
        team_work: '',
        punctuality: '',
        presentation: '',
        politenesss_respect: '',
        interaction: '',
        interest_cst: '',
        contact_coordination: '',
        understanding_job_comments: '',
        fulfillment_job_comments: '',
        capacity_work_comments: '',
        quality_work_comments: '',
        learning_improvement_comments: '',
        communication_comments: '',
        responsibility_comments: '',
        initiative_comments: '',
        motivation_comments: '',
        adoptability_comments: '',
        reliability_comments: '',
        team_work_comments: '',
        punctuality_comments: '',
        presentation_comments: '',
        politenesss_respect_comments: '',
        interaction_comments: '',
        interest_cst_comments: '',
        contact_coordination_comments: '',
        general_remarks: '',
        objective_next: '',
        proposal_staff: '',
        employee_remarks: '',
        evaluator_remarks: '',
        ceo_commensts: '',
    });
    const handleInputChange = (event) => {
        setAppraisal({
            ...appraisal,
            [event.target.name]: event.target.value,
        });
    }
    const handleFormSubmit = (event) => {
        const { apiUrl } = config()
        event.preventDefault();
        axios
            .post(`${apiUrl}addAppraisals`, appraisal)
            .then((res) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Appraisal Added',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    window.location.assign(`/Employee/Profile/${appraisal.name}/${[appraisal.USERID]} `)
                }, 1600)
                setAppraisal({
                    date: today,
                    USERID: '',
                    name: '',
                    understanding_job: '',
                    fulfillment_job: '',
                    capacity_work: '',
                    quality_work: '',
                    learning_improvement: '',
                    communication: '',
                    responsibility: '',
                    initiative: '',
                    motivation: '',
                    adoptability: '',
                    reliability: '',
                    team_work: '',
                    punctuality: '',
                    presentation: '',
                    politenesss_respect: '',
                    interaction: '',
                    interest_cst: '',
                    contact_coordination: '',
                    understanding_job_comments: '',
                    fulfillment_job_comments: '',
                    capacity_work_comments: '',
                    quality_work_comments: '',
                    learning_improvement_comments: '',
                    communication_comments: '',
                    responsibility_comments: '',
                    initiative_comments: '',
                    motivation_comments: '',
                    adoptability_comments: '',
                    reliability_comments: '',
                    team_work_comments: '',
                    punctuality_comments: '',
                    presentation_comments: '',
                    politenesss_respect_comments: '',
                    interaction_comments: '',
                    interest_cst_comments: '',
                    contact_coordination_comments: '',
                    general_remarks: '',
                    objective_next: '',
                    proposal_staff: '',
                    employee_remarks: '',
                    evaluator_remarks: '',
                    ceo_commensts: '',
                })
            },

            )
            .catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Invalid User ID or Employee Name',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    };
    return (
        <section>
            <div className='bg-gray-50 min-h-screen'>
                <div className="container mx-auto p-5">
                    <h1 className="text-4xl font-medium pb-7">Add Appraisal</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="number" name="USERID" id="USERID" value={appraisal.USERID} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="USERID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee ID</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="name" id="name" value={appraisal.name} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="date" name="date" id="date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={today} disabled onChange={handleInputChange} required />
                                    <label htmlFor="date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                            <h1 className="text-xl font-medium mb-5">Technical Skills</h1>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="understanding_job">Understanding of the job:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id='understanding_job' name="understanding_job" value={appraisal.understanding_job} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required >
                                        <option disabled defaultValue hidden value="">Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="understanding_job_comments" name="understanding_job_comments" value={appraisal.understanding_job_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="fulfillment_job">Fulfillment of the job:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="fulfillment_job" name="fulfillment_job" value={appraisal.fulfillment_job} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value="">Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="fulfillment_job_comments" name="fulfillment_job_comments" value={appraisal.fulfillment_job_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="capacity_work">Capacity to organize his/her work:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="capacity_work" name="capacity_work" value={appraisal.capacity_work} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value="">Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="capacity_work_comments" name="capacity_work_comments" value={appraisal.capacity_work_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="quality_work">Quality of work:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="quality_work" name="quality_work" value={appraisal.quality_work} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value="">Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="quality_work_comments" name="quality_work_comments" value={appraisal.quality_work_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="learning_improvement">Learning & improvement of the job:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="learning_improvement" name="learning_improvement" value={appraisal.learning_improvement} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value="" >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="learning_improvement_comments" name="learning_improvement_comments" value={appraisal.learning_improvement_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                            <h1 className="text-xl font-medium mb-5">General Skills</h1>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="communication">Communication:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="communication" name="communication" value={appraisal.communication} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value="" >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="communication_comments" name="communication_comments" value={appraisal.communication_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="responsibility">Responsibility:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="responsibility" name="responsibility" value={appraisal.responsibility} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value="" >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="responsibility_comments" name="responsibility_comments" value={appraisal.responsibility_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="initiative">Initiative:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="Initiative" name="initiative" value={appraisal.initiative} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="initiative_comments" name="initiative_comments" value={appraisal.initiative_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="motivation">Motivation:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="motivation" name="motivation" value={appraisal.motivation} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="motivation_comments" name="motivation_comments" value={appraisal.motivation_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="adoptability">Adaptability:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="adoptability" name="adoptability" value={appraisal.adoptability} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="adoptability_comments" name="adoptability_comments" value={appraisal.adoptability_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="reliability">Reliability:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="reliability" name="reliability" value={appraisal.reliability} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="reliability_comments" name="reliability_comments" value={appraisal.reliability_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="team_work">Team work:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="team_work" name="team_work" value={appraisal.team_work} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="team_work_comments" name="team_work_comments" value={appraisal.team_work_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                            <h1 className="text-xl font-medium mb-5">Behaviour</h1>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="punctuality">Punctuality:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="punctuality" name="punctuality" value={appraisal.punctuality} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="punctuality_comments" name="punctuality_comments" value={appraisal.punctuality_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="presentation">Presentation:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="presentation" name="presentation" value={appraisal.presentation} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="presentation_comments" name="presentation_comments" value={appraisal.presentation_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="politenesss_respect">Politeness - Respect with other staff members:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="politenesss_respect" name="politenesss_respect" value={appraisal.politenesss_respect} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="politenesss_respect_comments" name="politenesss_respect_comments" value={appraisal.politenesss_respect_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="interaction">Interaction with other staff members:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="interaction" name="interaction" value={appraisal.interaction} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="interaction_comments" name="interaction_comments" value={appraisal.interaction_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="interest_cst">Interest in Cyber Sync activities:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="interest_cst" name="interest_cst" value={appraisal.interest_cst} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="interest_cst_comments" name="interest_cst_comments" value={appraisal.interest_cst_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                                <div className='px-5 text-center p-2'>
                                    <label htmlFor="contact_coordination">Contact / participation with clients / co-ordination:</label>
                                </div>
                                <div className='px-5 p-2'>
                                    <select id="contact_coordination" name="contact_coordination" value={appraisal.contact_coordination} onChange={handleInputChange} className="block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required>
                                        <option disabled defaultValue hidden value=""  >Select</option>
                                        <option value="Very Good +++">Very Good +++</option>
                                        <option value="Good ++">Good ++</option>
                                        <option value="OK +">OK +</option>
                                        <option value="To be improved">To be improved</option>
                                        <option value="Not evaluated">Not evaluated</option>
                                    </select>
                                </div>
                                <div className='px-5'>
                                    <textarea id="contact_coordination_comments" name="contact_coordination_comments" value={appraisal.contact_coordination_comments} onChange={handleInputChange} rows="2" className="block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                            <h1 className="text-xl font-medium mb-5">Overall Remarks</h1>
                            <label htmlFor="general_remarks" className='px-1'>General Remarks On Performance Since Last Evaluation:</label>
                            <textarea id="general_remarks" name="general_remarks" value={appraisal.general_remarks} onChange={handleInputChange} rows="3" className="my-5 block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                            <label htmlFor="objective_next" className='px-1'>Objectives For The Next Evaluation Period (Quality of work, quantifiable objectives):</label>
                            <textarea id="objective_next" name="objective_next" value={appraisal.objective_next} onChange={handleInputChange} rows="3" className="my-5 block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                            <label htmlFor="proposal_staff" className='px-2'>Proposals For Staff Improvement (Training, change in post):</label>
                            <textarea id="proposal_staff" name="proposal_staff" value={appraisal.proposal_staff} onChange={handleInputChange} rows="3" className="my-5 block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                            <label htmlFor="employee_remarks" className='px-2'>Remarks From The Employee:</label>
                            <textarea id="employee_remarks" name="employee_remarks" value={appraisal.employee_remarks} onChange={handleInputChange} rows="3" className="my-5 block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                            <label htmlFor="evaluator_remarks" className='px-2'>Remarks From The Evaluator:</label>
                            <textarea id="evaluator_remarks" name="evaluator_remarks" value={appraisal.evaluator_remarks} onChange={handleInputChange} rows="3" className="my-5 block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" placeholder="Comments" required></textarea>
                        </div>
                        <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                            <h1 className="text-xl font-medium mb-5">CEO Remarks</h1>
                            <label htmlFor="ceo_commensts" className='px-1'>Comments From CEO:</label>
                            <textarea id="ceo_commensts" name="ceo_commensts" value={appraisal.ceo_commensts} onChange={handleInputChange} rows="3" className="my-5 block w-full text-sm p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 " placeholder="Comments" required></textarea>
                        </div>
                        <div className='flex justify-end'>
                            <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
