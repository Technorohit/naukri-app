import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { setUserSession } from '../../Utility/util'
import HR from '../../asset/hr.png'
import Emp from '../../asset/employee.png'

import './Auth.css'

const primaryColor = "#43afff";
const blackColor = "#303F60";
const whiteColor = "#fff";

function RenderForgotPassword(props) {

    const submitPasswordRequest = () => {
        console.log(props.userName)
        const url = `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${props.userName}`
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            props.setResetToken(data.data.token)
            props.setPageNumber(3)
        }
        ).catch((e) => console.log(e))

    }

    return (<Box className="modal" style={{ textAlign: 'left' }}>
        <Typography
            className="title"
            id="modal-modal-title"
            variant="h6"
            component="h2">
            Forgot your password?
        </Typography>
        <div style={{ margin: '25px 0' }}>Enter the email associated with your account and we’ll send you instructions to reset your password.</div>
        <div className="label" >Email Address</div>
        <TextField
            type="email"
            className="txt"
            required
            value={props.userName}
            placeholder="Enter your email Address"
            onChange={e => props.setUserName(e.target.value)}
        />
        <Button
            type="submit"
            className=""
            variant="contained"
            style={{
                background: primaryColor,
                color: 'white',
                width: "150px",
                height: "50px",
                fontSize: "16px",
                display: "block",
                margin: "20px auto 0px"
            }}
            onClick={submitPasswordRequest}
        >
            Submit
        </Button>
    </Box>)
}

function RenderResetUI(props) {
   const {password,confirmPassword,resetToken}=props;

const ResetPassword = ()=>{
    if(password===confirmPassword){

        const url = "https://jobs-api.squareboat.info/api/v1/auth/resetpassword";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({password:password,confirmPassword:confirmPassword,token:resetToken}),
        }).then(res=>res.json()).then(data=>alert('Password Reset Successfully!, please close me i am the temporary feedback'))
    }
    else{
//introduce Error State
    }
  
}

    return (
    <form onSubmit={e=>{
        e.preventDefault();
        ResetPassword()}}>
    <Box className="modal" style={{ textAlign: 'left' }}>
        <Typography
            className="title"
            id="modal-modal-title"
            variant="h6"
            component="h2">
            Reset Your Password
        </Typography>
        <div style={{ margin: '25px 0' }}>Enter your new password below.</div>
        <div className="label" >New password</div>
        <TextField
            type="password"
            className="txt"
            required
            value={props.password}
            onChange={e=>props.setPassword(e.target.value)}
            placeholder="Enter your password"
        />

        <div className="label">Confirm new password</div>
        <TextField
            type="password"
            className="txt"
            required
            value={props.confirmPassword}
            onChange={e=>props.setConfirmPassword(e.target.value)}
            placeholder="Enter your password"
        />

        <Button
            type="submit"
            className=""
            variant="contained"
            style={{
                background: primaryColor,
                color: 'white',
                width: "150px",
                height: "50px",
                fontSize: "16px",
                display: "block",
                margin: "20px auto 0px"
            }}
        >
            Reset
        </Button>
    </Box>
    </form>)
}

const RenderLoginUi = (props, style) => {
    return <form onSubmit={e => {
        e.preventDefault();
        props.loginHandler()
    }}>
        <Box className="modal">
            <Typography
                className="title"
                id="modal-modal-title"
                variant="h6"
                component="h2">
                Login
            </Typography>
            <div className="label">Email Address</div>
            <TextField

                type="email"
                // minlength="5"
                value={props.userName}
                onChange={(e) => props.setUserName(e.target.value)}
                // maxlength="20"
                className="txt"
                required
                placeholder="Email Address"
            />

            <div className="pwd">
                <div className="label">Password</div>
                <div style={props.style.pwdHighlight} onClick={() => props.setPageNumber(2)}>Forgot Password ?</div>
            </div>

            <TextField
                id="filled-basic"
                className="txt"
                onChange={(e) => props.setPassword(e.target.value)}
                value={props.password}
                required={true}
                placeholder="Password"
            />

            <Button
                type="submit"
                variant="contained"
                style={props.style.loginBtn}
            >
                Login
            </Button>
            <div className="footer">
                New to MyJob?{" "}
                <span
                    onClick={() => props.setPageNumber(1)}
                    style={{ color: primaryColor }}
                >
                    Create an account
                </span>
            </div>
        </Box>

    </form>
}

const RenderRegisterUI = (props) => {
    return <Box className="modal" >
        <Typography
            // style={style.title}
            className="title"
            id="modal-modal-title"
            variant="h6"
            component="h2"
        >
            Signup
        </Typography>
        I'm a*
        <div style={{ display: 'flex' }}>
            <Button
                onClick={() => props.setRole(0)}
                id="signupBtn"
                startIcon={<img className="btnIcon" src={HR} />}
            >
                Recruiter
            </Button>
            <Button
                type="button"
                onClick={() => props.setRole(1)}
                id="signupBtn"
                startIcon={<img className="btnIcon" src={Emp} />}
            >
                Candidate
            </Button>
        </div>
        <div className="label">Full Name</div>
        <TextField
            id="filled-basic"
            type="text"
            minLength="5"
            value={props.name}
            onChange={(e) => setName(e.target.value)}
            maxlength="20"

            className="txt"
            required
            placeholder="Email Address"
        />

        <div className="label">Email Address</div>
        <TextField
            id="filled-basic"
            type="email"
            minLength="5"
            value={props.userName}
            onChange={(e) => setUserName(e.target.value)}
            maxlength="20"
            className="txt"
            required
            placeholder="Email Address"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "45%",
                }}
            >
                <div className="label">Password</div>
                <TextField
                    id="filled-basic"
                    className="txt"
                    onChange={(e) => props.setPassword(e.target.value)}
                    value={props.password}
                    required={true}
                    placeholder="Password"
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "45%",
                }}
            >
                <div className="label"> Confirm Password</div>
                <TextField
                    id="filled-basic"
                    className="txt"
                    onChange={(e) => props.setConfirmPassword(e.target.value)}
                    value={props.confirmPassword}
                    required={true}
                    placeholder="Confirm Password"
                />
            </div>
        </div>
        <div className="label">Skills</div>
        <TextField
            id="filled-basic"
            type="text"
            minLength="5"
            value={props.skills}
            onChange={(e) => props.setSkills(e.target.value)}
            maxlength="20"
            className="txt"
            required
            placeholder="Skills"
        />
        <Button
            type="submit"
            onClick={props.signUpHandler}
            variant="contained"
            style={props.style.loginBtn}
        >
            Login
        </Button>
    </Box>
}

export default function Auth(props) {
    let history = useHistory();
    const style = {
        title: {
            margin: "10px 0px 30px",
            fontWeight: "600",
            color: blackColor,
        },
        pwdHighlight: {
            color: primaryColor,
            cursor: "pointer",
        },
        loginBtn: {
            background: primaryColor,
            color: whiteColor,
            width: "150px",
            height: "50px",
            fontSize: "16px",
            display: "block",
            margin: "20px auto",
        },
        footer: {
            textAlign: "center",
            marginTop: "20px",
        },
    };

    const [modelOpen, setModelOpen] = React.useState(true);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [skills, setSkills] = React.useState("");
    const [role, setRole] = React.useState('');
    const [pageNumber, setPageNumber] = React.useState(0);
    const [resetToken,setResetToken]=React.useState('');
    const loginHandler = () => {
        const body = {
            email: userName,
            password: password,
        };
        const url = "https://jobs-api.squareboat.info/api/v1/auth/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data)
                    setUserSession(data.data)
                    console.log('modelOpen', modelOpen)
                    setModelOpen(false)
                    history.push('/home')
                }
                else {
                    alert(`Something Went Wrong : ${data.message}`)
                    console.log('error',data);
                }
            });
    };

    const signUpHandler = () => {
        console.log(userName, password);
        const body = {
            email: userName,
            userRole: role,
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            skills: skills

        };
        const url = "https://jobs-api.squareboat.info/api/v1/auth/register";
        if (userName && password) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    };

    const RenderComponent = () => {    //setPagen
        //0 for login
        //1 for Register
        //2 for forgot Password
        //3 for Reset Password
        if (pageNumber === 1) {
            return RenderRegisterUI({ userName, setUserName, skills, setSkills, role, setRole, password, setPassword, confirmPassword, setConfirmPassword, signUpHandler, style });
        }
        else if (pageNumber === 2) {
            return RenderForgotPassword({ userName, setUserName, setPageNumber,setResetToken });
        }
        else if (pageNumber === 3) {
            return RenderResetUI({password,setConfirmPassword,setPassword,confirmPassword,resetToken,history});
        }
        else {
            return RenderLoginUi({ userName, setUserName, style, password, setPassword, setPageNumber, loginHandler });
        }
    }

    return (
        <div>
            {RenderComponent()}
        </div>

    );
}
