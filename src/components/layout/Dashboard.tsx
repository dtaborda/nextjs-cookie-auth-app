import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBarTop: {
    boxShadow: 'none',
  },
  appBarTopLogoWrapper: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoTitle: {
    width: 195,
  },
  appBarTopProfileWrapper: {
    position: 'relative',
    marginLeft: 0,
    marginRight: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  appBarTopProfileAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    width: '32px',
    height: '32px',
  },
  appBarTopProfileUserName: {
    fontSize: '16px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  container: {
    margin: '20px',
  },
}));

interface Props {
  children: any;
  logout: any;
  userName: string;
}

const LayoutDashboard = ({ children, logout, userName }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const renderMenuProfile = () => (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar
          position="relative"
        >
          <Toolbar>
            <div className={classes.appBarTopLogoWrapper}>
              <img
                className={classes.logoTitle}
                // tslint:disable-next-line:max-line-length
                src="http://static1.squarespace.com/static/59a054c8f9a61e77faec97c4/t/59a1e2db37c581d09a105a13/1504594509669/?format=1500w"
              />
            </div>
            <div className={classes.appBarTopProfileWrapper}>
              <Avatar
                className={classes.appBarTopProfileAvatar}
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
              <Typography
                variant="h5"
                className={classes.appBarTopProfileUserName}
              >
                {userName}
              </Typography>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenuProfile()}
        <div className={classes.container}>
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
