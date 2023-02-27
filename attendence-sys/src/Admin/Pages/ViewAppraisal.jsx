import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../components/config/env"

export default function ViewAppraisal() {
  const { ID } = useParams();
  const { Date } = useParams();
  const [openTab, setOpenTab] = React.useState(1);
  const [appraisalData, setAppraisalData] = useState([]);
  useEffect(() => {
    const AppraisalData = async () => {
      const { apiUrl } = config()
      try {
        const response = await axios.get(`${apiUrl}getAppraisalById/${ID}`)
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].date === Date) {
            setAppraisalData(response.data[index]);
          }
          else {
            console.log("Not found")
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    AppraisalData()
  }, [Date, ID])

  return (
    <section>
      <div className='bg-gray-50 min-h-screen'>
        <div className="container mx-auto p-5">
          <h1 className="text-4xl font-medium pb-7">View Appraisal</h1>
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(1); }}
                    data-toggle="tab" href="#link1" role="tablist">
                    Technical Skills
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(2); }}
                    data-toggle="tab" href="#link2" role="tablist">
                    General Skills
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(3); }}
                    data-toggle="tab" href="#link3" role="tablist">
                    Behaviour
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(4); }}
                    data-toggle="tab" href="#link4" role="tablist">
                    Overall Remarks
                  </a>

                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 5 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(5); }}
                    data-toggle="tab" href="#link5" role="tablist">
                    CEO Remarks
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                        <h1 className="text-xl font-medium mb-5">Technical Skills</h1>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="understandnng">Understanding of the job:</label>
                          </div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.understanding_job}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.understanding_job_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Fulfillment">Fulfillment of the job:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.fulfillment_job}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.fulfillment_job_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Capacity">Capacity to organize his/her work:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.capacity_work}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.capacity_work_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Quality">Quality of work:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.quality_work}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.quality_work_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Learning">Learning & improvement of the job:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.learning_improvement}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.learning_improvement_comments}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                        <h1 className="text-xl font-medium mb-5">General Skills</h1>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Communication">Communication:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.communication}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.communication_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Responsibility">Responsibility:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.responsibility}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.responsibility_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Initiative">Initiative:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.initiative}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.initiative_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Motivation">Motivation:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.motivation}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.motivation_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="underline_select">Adaptability:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.adoptability}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.adoptability_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Reliability">Reliability:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.reliability}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.reliability_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Team">Team work:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.team_work}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.team_work_comments}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                      <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                        <h1 className="text-xl font-medium mb-5">Behaviour</h1>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Punctuality">Punctuality:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.punctuality}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.punctuality_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Presentation">Presentation:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.presentation}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.presentation_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Politeness">Politeness - Respect with other staff members:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.politenesss_respect}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.politenesss_respect_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Interaction">Interaction with other staff members:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.interaction}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.interaction_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="Interest">Interest in Cyber Sync activities:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.interest_cst}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.interest_cst_comments}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3  md:gap-6 mb-4">
                          <div className='px-5 text-center p-2 font-medium'>
                            <label htmlFor="underline_select">Contact / participation with clients / co-ordination:</label></div>
                          <div className='px-5 p-2 text-center'>
                            <p>{appraisalData.contact_coordination}</p>
                          </div>
                          <div className='px-5 text-center'>
                            <p>{appraisalData.contact_coordination_comments}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 4 ? "block" : "hidden"} id="link3">
                      <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                        <h1 className="text-xl font-medium mb-5">Overall Remarks</h1>
                        <label htmlFor="general_remarks" className='px-1 font-medium'>General Remarks On Performance Since Last Evaluation:</label>
                        <div className="px-1 py-3">
                          <p>{appraisalData.general_remarks}</p>
                        </div>
                        <label htmlFor="objectives" className='px-1 font-medium'>Objectives For The Next Evaluation Period (Quality of work, quantifiable objectives):</label>
                        <div className="px-1 py-3">
                          <p>{appraisalData.objective_next}</p>
                        </div>
                        <label htmlFor="proposal" className='px-1 font-medium'>Proposals For Staff Improvement (Training, change in post):</label>
                        <div className="px-1 py-3">
                          <p>{appraisalData.proposal_staff}</p>
                        </div>
                        <label htmlFor="Emp_remarks" className='px-1 font-medium'>Remarks From The Employee:</label>
                        <div className="px-1 py-3">
                          <p>{appraisalData.employee_remarks}</p>
                        </div>
                        <label htmlFor="Evaluator" className='px-1 font-medium'>Remarks From The Evaluator:</label>
                        <div className="px-1 py-3">
                          <p>{appraisalData.evaluator_remarks}</p>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 5 ? "block" : "hidden"} id="link3">
                      <div className='bg-white p-5 mt-4 border-2 shadow-lg'>
                        <h1 className="text-xl font-medium mb-5">CEO Remarks</h1>
                        <label htmlFor="ceo_remarks" className='px-1 font-medium'>Comments From CEO:</label>
                        <div className="px-1 py-3">
                          <p>{appraisalData.ceo_commensts}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
