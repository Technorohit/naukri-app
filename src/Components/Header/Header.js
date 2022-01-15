import React from 'react'
import './Header.css';
import { useHistory } from "react-router-dom";
import Auth from '../Auth/Auth'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { getUser, UserExist, removeUserSession } from '../../Utility/util';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const RenderUserMenu = (props) => {
  let history = useHistory();
  return <Menu
    id="account-menu"
    open={props.showMenu}
    onClose={props.handleMenuClose}
    onClick={props.handleMenuClose}
    style={{
      top: 30,
      margin: '10px -50px'
    }}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >

    <MenuItem onClick={() => { removeUserSession(); history.push('/') }}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
}

export default function Header() {
  const [userSession, setUserSession] = React.useState(false);
  let history = useHistory();
  const [showModal, setShowModal] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  console.log('getUser', getUser());
  React.useEffect(() => {
    if (getUser()) {
      setUserSession(true)
    }
  }, [UserExist])

  const handleMenuClose = () => setShowMenu(!showMenu);
  const showAuthModal = (props) => {
    console.log(props)
    history.push('/login');

    setShowModal(!showModal)
  }
  console.log('userSession', userSession);
  return (
    <div className='header-container'>
      <div className='logo'>My<span className='logo-hightlight'>Jobs</span></div>
      {userSession ? <div>
        <Button variant="contained" onClick={() =>
          history.push('/post-job')
        } style={{ background: 'transparent', boxShadow: 'none',}}>Post a Job</Button>
        <div className='userprofile'>R</div>
        <ArrowDropDownIcon id='Arrowicon'onClick={() => handleMenuClose()} />
      </div> : <div className='authBtn' style={{cursor:'pointer'}}onClick={showAuthModal}>Login/SignUp</div>}
      {showMenu && <RenderUserMenu showMenu={showMenu} handleMenuClose={handleMenuClose} />}
      {showModal&&<Auth/>}
    </div>
  )
}
