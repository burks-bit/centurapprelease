import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from './Menu'
import '../styles/custom_about.css'
import { Fade } from "react-awesome-reveal";
import Footer from "./Footer";
import { apiUrl } from "../services/BackendAPIUrl";

export default function About(){

    const [webdata, setWebdata] = useState([]);
    const [companyhistory, setCompanyHistory] = useState([]);

    useEffect(() => {
        const fetchCompanyHistory = async () => {
            try {
                const missionVisionResponse = await axios.get(apiUrl+'api/getmissionvision');
                // console.log(missionVisionResponse.data);
                setWebdata(missionVisionResponse.data.missionvision);
    
                const companyHistoryResponse = await axios.get(apiUrl+'api/getcompanyhistory');
                // console.log(companyHistoryResponse.data);
                setCompanyHistory(companyHistoryResponse.data.companyhistorydtl);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchCompanyHistory();
    }, []);

    return (
        <div>
            <Menu />
            <div className="ui container">
                <h1 className="about_h1">About Us</h1>
                {/* Mission */}
                <div className="ui two column stackable grid aboutMission">
                    <div className="column" style={{width: '50%'}}>
                        <Fade direction="left">
                            <div className="ui">
                                <h4 className="ui" style={{textAlign: 'center', color: '#096f9d'}}>Our Mission</h4>
                                {webdata.map(mission => (
                                    <p key={mission.id} dangerouslySetInnerHTML={{ __html: mission.mission }} />
                                ))}
                            </div>
                        </Fade>
                    </div>
                    <div className="column" style={{width: '50%'}}>
                        <Fade direction="right">
                            <div className="ui">
                                <img src="http://127.0.0.1:9000/web_images/lab.jpg" className="ui rounded image large" alt=""/>
                            </div>
                        </Fade>
                        </div>
                </div>

                {/* Vision */}
                <div className="ui two column stackable grid aboutVision">
                    <div className="column" style={{width: '50%'}}>
                        <Fade direction="left">
                            <div className="ui">
                                <img src="http://127.0.0.1:9000/web_images/lab2.jpg" className="ui rounded image large" alt=""/>
                            </div>
                        </Fade>
                    </div>
                    <div className="column" style={{width: '50%'}}>
                        <Fade direction="left">
                            <div className="ui">
                                <h4 className="ui" style={{textAlign: 'center', color: '#096f9d'}}>Our Vision</h4>
                                {webdata.map(vision => (
                                    // <p key={vision.id}>{vision.vision}</p>
                                    <p key={vision.id} dangerouslySetInnerHTML={{ __html: vision.vision }} />
                                ))}
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className="ui ourStory">
                    <h1 style={{textAlign: 'center', color: '#096f9d', marginTop: '5%'}}>Our Story</h1>
                    <div className="ui one column stackable grid" style={{marginTop: '20px'}}>
                        <img src="http://127.0.0.1:9000/web_images/about.jpeg" className="ui centered image large" alt=""/>
                        
                    </div>
                    {companyhistory.map(companyhistoryy => (
                        <p key={companyhistoryy.id} dangerouslySetInnerHTML={{ __html: companyhistoryy.company_history }} />
                    ))}
                </div>
            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}