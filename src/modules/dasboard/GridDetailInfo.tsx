import { Avatar, Fab, Modal } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import InfoCard from './InfoCard';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      outline: 'none',
    },
  }),
);

const GridDetailInfo = ({ rows }: any) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [rowSelected, setRow] = React.useState(null);

  const handleOpen = (row: any) => {
    setRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setRow(null);
    setOpen(false);
  };

  const renderBody = () => {
    return (
      rows.map((row: any) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.manufacturer}</TableCell>
          <TableCell>{row.customer}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.serial}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>
            <Fab
              size="medium"
              aria-label="Add"
              onClick={() => handleOpen(row)}
            >
              <Avatar
                alt="Remy Sharp" src={row.imgSrc}
              />
            </Fab>
          </TableCell>
        </TableRow>
      ))
    );
  };

  const renderModal = () => (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <InfoCard data={rowSelected}/>
        </div>
      </Modal>
  );

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Serial</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderBody()}
        </TableBody>
      </Table>
      {renderModal()}
    </Paper>
  );
};

export default GridDetailInfo;
