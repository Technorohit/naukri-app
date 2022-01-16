import React from 'react'
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getUser } from '../../Utility/util';
import { Link } from "react-router-dom";
import './Home.css';

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

export default function Home() {
    
    const [jobs, setJobs] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(1);
    React.useEffect(() => {
        // const url = 'https://jobs-api.squareboat.info/api/v1/jobs';
        const userDetails = getUser();
        console.log('userD', userDetails)
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
                console.log('data get', data)
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
                >
                    <HomeIcon style={{ color: 'white' }} sx={{ mr: 1 }} fontSize="inherit" />
                    <span style={{ color: 'white' }}>Home</span>
                </Link>
            </Breadcrumbs>
            <div className='cards'>
                {jobs.length > 0 ? jobs.map(job =>
                    <div className='job-card'>
                        <div className='job-title'>{job.title}</div>
                        <div className='job-desc'>{job.description}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: '0px auto' }}>
                            <div>
                                <LocationOnIcon style={{ color: '#43afff', fontSize: '16px', display: 'inline-block' }} sx={{ mr: 0.5 }} fontSize="inherit" />
                                <div className='job-location'>{job.location}</div>
                            </div>
                            <Button style={{ color: 'white', background: '#43afff', boxShadow: 'none', display: 'block' }}>View Application</Button>
                        </div>
                    </div>
                ) : RenderNoJobsUi()}

            </div>
            <div className='pagination'>
                <ArrowBackIosIcon
                    onClick={() => {
                        if (pageNumber > 1) { setPageNumber(pageNumber - 1) }
                      }
                    }
                    style={{ cursor: 'pointer', color: '#43afff', fontSize: '16px', display: 'inline-block' }} sx={{ mr: 0.5 }} fontSize="inherit" />
                <span>1</span>
                <ArrowForwardIosIcon onClick={() => setPageNumber(pageNumber + 1)} style={{ cursor: 'pointer', color: '#43afff', fontSize: '16px', display: 'inline-block' }} sx={{ ml: 1 }} fontSize="inherit" />

            </div>
        </div>
    )
}
