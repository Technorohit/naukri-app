import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { setUserSession } from '../../Utility/util'
import HR from '../../asset/hr.png'
import Emp from '../../asset/employee.png'

import './Auth.css'

export default function Auth(props) {
    let history = useHistory();
    const primaryColor = "#43afff";
    const blackColor = "#303F60";
    const whiteColor = "#fff";
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
    const [loginPage, setLoginPage] = React.useState(true);
    const [role, setRole] = React.useState('');
    const loginHandler = (event) => {
        console.log(userName, password);
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
                    setModelOpen(!modelOpen)
                    history.push('/home')
                }
                else {
                    //setError
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
    React.useEffect(() => {
        setLoginPage(true);
    }, []);


    return (
        <Modal
            open={modelOpen}
            onClose={() => setModelOpen(!modelOpen)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {loginPage ? (
                <div>
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
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            // maxlength="20"
                            className="txt"
                            required
                            placeholder="Email Address"
                        />

                        <div className="pwd">
                            <div className="label">Password</div>
                            <div style={style.pwdHighlight}>Forgot Password ?</div>
                        </div>

                        <TextField
                            id="filled-basic"
                            className="txt"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required={true}
                            placeholder="Password"
                        />

                        <Button
                            type="submit"
                            onClick={loginHandler}
                            variant="contained"
                            style={style.loginBtn}
                        >
                            Login
                        </Button>
                        <div className="footer">
                            New to MyJob?{" "}
                            <span
                                onClick={() => setLoginPage(false)}
                                style={{ color: primaryColor }}
                            >
                                Create an account
                            </span>
                        </div>
                    </Box>
                </div>
            ) : (
                <Box className="modal" >
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
                            onClick={() => setRole(0)}
                            id="signupBtn"
                            startIcon={<img className="btnIcon" src={HR} />}
                        >
                            Recruiter
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setRole(1)}
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
                        value={name}
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
                        value={userName}
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
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
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
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
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
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        maxlength="20"
                        className="txt"
                        required
                        placeholder="Skills"
                    />
                    <Button
                        type="submit"
                        onClick={signUpHandler}
                        variant="contained"
                        style={style.loginBtn}
                    >
                        Login
                    </Button>
                </Box>
            )}
        </Modal>

    );
}
