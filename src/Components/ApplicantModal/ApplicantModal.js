import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { getUser } from '../../Utility/util';
import './Applicant.css';
import Typography from '@mui/material/Typography';

//Mock Data
const Applicants = [{
    name:'Eliza Lucas',
    email:'abc123@email.com',
    skills:'Coding, designing, graphics, website, app ui',
},{
    name:'Nick Gordon',
    email:'abc123@email.com',
    skills:'Coding, designing, graphics, website, app ui',
},{
    name:'Matthew Pierce',
    email:'abc123@email.com',
    skills:'Coding, designing, graphics, website, app ui',
},{
    name:'Emma Green',
    email:'abc123@email.com',
    skills:'Coding, designing, graphics, website, app ui',
},{
    name:'Roger Reid',
    email:'abc123@email.com',
    skills:'Coding, designing, graphics, website, app ui',
},{
    name:'Janet Cooper',
    email:'abc123@email.com',
    skills:'Coding, designing, graphics, website, app ui',
},{
    name:'Rohit Singh',
    email:'test@gmail.com',
    skills:'HTTP,WEV',
}]

function NoApplicantUI(){
 return   <div style={{}}>
         <AssignmentIndIcon style={{ margin:'40% 50%',color: 'darkgrey',fontSize:'140px' }} sx={{ mr: 1 }} fontSize="inherit" />
            <div style={{width:'fit-content',bottom: '200px',left: '160px',position:'relative',color:'#A9AFBC',fontSize:'28px',fontWeight:'400'}}>No applications available!</div>
    </div>
}

export default function ApplicantModal(props) {
const [jobApplicants,setJobApplicants] = React.useState([]);
React.useEffect(()=>{
    const userDetails = getUser();
    const url =`https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${props.selectedJobId}/candidates`
    fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": getUser().token
        },
    }).then(res=>res.json()).then(data=>{
        if(data.message!=='No candidates have applied for the job posting')
        {
            setJobApplicants(data.data.data);
        }
    })
 //get unique job id from props and fetch the details
    //

},[])


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.openApplicantModal}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
   
          <Box className='box'>
         <div style={{display:'flex',padding:'0px 0px 20px',justifyContent:'space-between',fontSize:'22px',borderBottom: '1px solid lightgrey'}}> <Typography id="transition-modal-title" variant="h6" component="h2">
             <span style={{fontWeight:'400',fontSize:'22px'}}> Applicants for this job </span> 
            </Typography>
            <span onClick={props.handleClose} style={{fontWeight: '900',cursor:'pointer'}}>X</span>
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             Total {Applicants.length} applicants
            </Typography>
            <div className='container'>
                {Applicants.length!==0?Applicants.map((applicant,i)=>{
                    return <div className='card' key={i}>
                        <div className='candidiate-info'>
                        <div className='user-photo'><div>{applicant.name[0]}</div></div>
                        <div className='nameAndEmail'>
                            <div className='applicantName'>{applicant.name}</div>
                            <div className='applicantEmail'>{applicant.email}</div>

                        </div>
                        </div>
                        <div className='candidiate-skills'>
                        <div className='skills-title'>Skills</div>
                            <div>{applicant.skills}</div>

                        </div>
                          
                    </div>
                }): NoApplicantUI()}
               
            </div>
          </Box>
      </Modal>
    </div>
  );
}