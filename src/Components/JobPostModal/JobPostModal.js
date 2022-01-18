import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField,Button } from '@mui/material';
import { useHistory } from "react-router-dom";
import { getUser } from '../../Utility/util';

export default function JobPostModal() {
    const [showJobPostModal, setShowJobPostModal] = React.useState(false);
    const [location, setLocation] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    let history = useHistory();


    React.useEffect(() => setShowJobPostModal(true), []);
    const publishJob = (e) => {
        const url = `https://jobs-api.squareboat.info/api/v1/jobs/`;
        const userDetails = getUser();
        const body = JSON.stringify({
            title:title,
            description:description,
            location:location
        })

        fetch(url,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": userDetails.token
            },
            body
        }).then(res=>res.json()).then(data=>
           history.push("/home") 
           ).catch(er=>console.log('er',er))
    }
    return (<Modal
        open={true}
        onClose={() => setShowJobPostModal(!showJobPostModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box className="modal">
            <h4 style={{ fontWeight: '500', fontSize: '24px' }}>Post a Job</h4>
            <form onSubmit={e => {
                e.preventDefault();
                publishJob()
            }}>

                <p style={{ fontSize: '14px', fontFamily: 'Helvetica Neue' }}>Job Title*</p>
                <TextField id="outlined-basic" style={{ width: '100%', background: '#f5f6fa' }} 
                onChange={(e)=>setTitle(e.target.value)} 
                value={title}
                required label="Enter job title" variant="outlined" />
                <p style={{ fontSize: '14px', fontFamily: 'Helvetica Neue' }}>Description*</p>
                <TextField id="filled-multiline-static" multiline rows={6} 
                 onChange={(e)=>setDescription(e.target.value)}
                 value={description}
                 required maxRows={6} style={{ width: '100%', background: '#f5f6fa' }} label="Enter job description" variant="outlined" />
                <p style={{ fontSize: '14px', fontFamily: 'Helvetica Neue' }}>Location*</p>
                <TextField id="outlined-basic" style={{ width: '100%', background: '#f5f6fa' }} 
                 onChange={(e)=>setLocation(e.target.value)}
                 value={location}
                 required label="Enter job location" variant="outlined" />
                <Button type="submit" variant="contained" style={{ background: '#43afff', boxShadow: 'none', margin: '20px auto', display: 'block' }}>Post a Job</Button>
            </form>
        </Box>
    </Modal>);
}
