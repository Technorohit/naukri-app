import React from 'react'
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button'
import { useHistory ,Link} from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { getUser } from '../../Utility/util';
import './Home.css';
import ApplicantModal from '../ApplicantModal/ApplicantModal';

// const Jobs = [{ title: 'UI UX Designer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt…', location: 'Bengaluru' },
// { title: 'Front-end Designer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt…', location: 'Gurgaon' },
// ];

const RenderNoJobsUi = () => {
    let history = useHistory();
    return <div style={{ margin: '5vh auto 0px' }}>
        <NoteAltIcon style={{ color: '#DCDCDC', fontSize: '150px' }} sx={{ mr: 1 }} fontSize="inherit" />
        <div>Your Posted Jobs will show here</div>
        <Button variant="contained" onClick={() =>
            history.push('/post-job')
        } style={{ background: '#43afff', boxShadow: 'none', margin: '20px' }}>Post a Job</Button>

    </div>
}


export default function Home(props) {
    const [jobs, setJobs] = React.useState([]);
    const [selectedJobId,setSelectedJobId] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [openApplicantModal, setOpenApplicantModal] = React.useState(false);
    const handleOpen = (jobId) =>{
        setSelectedJobId(jobId)
        setOpenApplicantModal(true);
    }
    const handleClose = () => setOpenApplicantModal(false);
    React.useEffect(() => {
        // const url = 'https://jobs-api.squareboat.info/api/v1/jobs';
        const userDetails = getUser();
        const url = 'https://jobs-api.squareboat.info/api/v1/recruiters/jobs'
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": userDetails.token
            },
        }).then(res => res.json()).then(data => {
            if (data.message === "No jobs posted") {
                setJobs([])
            } else {
                setJobs(data.data.data)
            }
        }
        ).catch(e => console.log(e))
    }, [])
    // React.useEffect(() => {

    //     const url = `https://jobs-api.squareboat.info/api/v1/jobs?page=${pageNumber}`;
    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //     }).then(res => res.json()).then(data => setJobs(data.data))
    // }, [pageNumber]);


    return (
        <div>
            <Breadcrumbs style={{ marginLeft: '200px', marginTop: '10px' }} aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                    to="/"
                >
                    <HomeIcon style={{ color: 'white' }} sx={{ mr: 1 }} fontSize="inherit" />
                    <span style={{ color: 'white' }}>Home</span>
                </Link>
            </Breadcrumbs>
            <div className='cards'>
                {jobs.length > 0 ? jobs.map((job) =>
                    <div key={job.id} className='job-card'>
                        <div className='job-title'>{job.title}</div>
                        <div className='job-desc'>{job.description}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: '10px auto' }}>
                            <div>
                                <LocationOnIcon style={{ color: '#43afff', fontSize: '16px', display: 'inline-block' }} sx={{ mr: 0.5 }} fontSize="inherit" />
                                <div className='job-location'>{job.location}</div>
                            </div>
                            <Button onClick={()=>handleOpen(job.id)} style={{ color: 'white', background: '#43afff', boxShadow: 'none', display: 'block' }}>View Application</Button>
                        </div>
                    </div>
                ) : RenderNoJobsUi()}

            </div>
            {openApplicantModal&&<ApplicantModal openApplicantModal={openApplicantModal} handleClose={handleClose} selectedJobId={selectedJobId}/>}
            <div className='pagination'>
            <button style={{width:'20px'}}>
                <ArrowLeftIcon
                    onClick={() => {
                        if (pageNumber > 1) { setPageNumber(pageNumber - 1) }
                      }
                    }
                    style={{ cursor: 'pointer', color: '#43afff', fontSize: '21px', display: 'inline-block' }} sx={{ mr: 1 }} fontSize="inherit" /></button>
                <span style={{fontSize:'21px',margin:'0px 10px'}}>1</span>
                    <button style={{width:'20px'}}>
                <ArrowRight onClick={() => setPageNumber(pageNumber + 1)} style={{ cursor: 'pointer', color: 'black', fontSize: '21px', display: 'inline-block' }} sx={{ ml: 0 }} fontSize="inherit" />

                    </button>
            </div>
        </div>
    )
}
