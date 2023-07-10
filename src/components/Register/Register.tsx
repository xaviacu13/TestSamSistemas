import React, { FC, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import shortid from "shortid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import HederList from "./components/HederList/HederList";
import { Grid } from "@material-ui/core";


const Register = () => {
  let listInit = JSON.parse(localStorage.getItem("studentsList"));
  if (!listInit) {
    listInit = [];
  }
  const [openRModal, setOpenRModal] = useState(false);
  const [openDConfirmation, setOpenDConfirmation] = useState(false);
  const [deleteStudent, setDeletStudent] = useState("");
  const [studentsList, setStudentsList] = useState(listInit);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    lastName: "",
    age: "",
    gender: "",
  });

useEffect(()=> {
  localStorage.setItem("studentsList", JSON.stringify(studentsList));
},[studentsList])
  const handleClickOpenRegisterModal = () => {
    setOpenRModal(true);
  };

  const handleClose = () => {
    setOpenRModal(false);
    setOpenDConfirmation(false);
  };

  const onEdit = (name: any) => {
    console.log("Editing....", name);
  };
  const onDelete = (name: any) => {
    const newList = studentsList.filter((list) => list.name !== name);
    setStudentsList(newList);
    setOpenDConfirmation(false);
  };
  const addNewStudent = () => {
    setStudentsList([...studentsList, newStudent]);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    addNewStudent();
    setOpenRModal(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown; name: any }>
  ) => {
    setNewStudent((item) => ({
      ...item,
      id: shortid.generate(),
      [event.target.name]: event.target.value,
    }));
  };
  const handleDeletStudent = (student: string) => {
    setOpenDConfirmation(true), setDeletStudent(student);
    setOpenDConfirmation(true);
  };

  return (
    <>
      <Grid>
        <Button onClick={handleClickOpenRegisterModal} endIcon={<AddIcon />}>
          Add new student
        </Button>
      </Grid>
      <Grid>
        <TableContainer>
          <Typography color="primary">Students list</Typography>
          <Table aria-label="simple table">
            <HederList />
            <TableBody>
              {studentsList &&
                studentsList.map((student: any) => (
                  <TableRow key={student.name}>
                    <TableCell component="th" scope="student">
                      {student.name}
                    </TableCell>
                    <TableCell align="right">{student.lastName}</TableCell>
                    <TableCell align="right">{student.age}</TableCell>
                    <TableCell align="right">{student.gender}</TableCell>
                    <EditIcon onClick={handleClickOpenRegisterModal}></EditIcon>
                    <DeleteIcon
                      onClick={() => handleDeletStudent(student.name)}
                    ></DeleteIcon>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <div>
        <Dialog
          open={openDConfirmation}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirmation message
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete <span>{deleteStudent}</span>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              CANCEL
            </Button>
            <Button
              onClick={() => onDelete(deleteStudent)}
              color="primary"
              autoFocus
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openRModal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={(event) => onSubmit(event)}>
            <DialogTitle id="form-dialog-title">Student register</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter new student data</DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="First name"
                placeholder="Enter your first name"
                type="text"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last name"
                placeholder="Enter your last name"
                type="text"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="age"
                id="age"
                label="Age"
                type="number"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="gender"
                name="gender"
                label="Gender"
                placeholder="Enter your gender"
                type=""
                fullWidth
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default Register;
