import React from 'react'
import './Header.css';
import { useHistory } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { connect } from 'react-redux';
import Logout from '@mui/icons-material/Logout';
import {doLogOut} from '../../Modules/user/user.action';
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

    <MenuItem onClick={() => { props.doLogOut(); history.push('/') }}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
}

function Header(props) {
  let history = useHistory();
  const {user} = props;
  const [showMenu, setShowMenu] = React.useState(false);
  const [userNameInitial,setuserNameInitial] = React.useState('');
  const handleMenuClose = () => setShowMenu(!showMenu);
  React.useEffect(()=>{
    if(user.user)
    {setuserNameInitial(user.user.name[0])}
  },[user.isUserAuthenticated])

  return (
    <div className='header-container'>
      <div className='logo' onClick={()=>history.push('/')}>My<span className='logo-hightlight'>Jobs</span></div>
      {props.user.isUserAuthenticated ? <div>
        <Button variant="contained" onClick={() =>
          history.push('/post-job')
        } style={{ background: 'transparent', boxShadow: 'none',}}>Post a Job</Button>
        <div className='userprofile'>{userNameInitial.toUpperCase()}</div>
        <ArrowDropDownIcon id='Arrowicon'onClick={() => handleMenuClose()} />
      </div> : <div className='authBtn' style={{cursor:'pointer'}}onClick={()=>history.push('/login')}>Login/SignUp</div>}
      {showMenu && <RenderUserMenu showMenu={showMenu} doLogOut={props.doLogOut} handleMenuClose={handleMenuClose} />}
    </div>
  )
}
function mapDispatchToProps(dispatch){
  return { doLogOut: () => dispatch(doLogOut())  }
}
const mapStateToProps=(state)=>({
      user:state.user
})
export default connect(mapStateToProps,mapDispatchToProps)(Header)