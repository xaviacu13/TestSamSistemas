import React, { FC, useState, useEffect } from "react";
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
  Divider,
} from "@mui/material";
import shortid from "shortid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import HederList from "./components/HederList/HederList";
import { Grid } from "@material-ui/core";

const Register = () => {
  let nitList = JSON.parse(localStorage.getItem("studentsList"));
  if (!nitList) {
    nitList = [];
  }
  const [openRModal, setOpenRModal] = useState(false);
  const [openDConfirmation, setOpenDConfirmation] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState({});
  const [studentsList, setStudentsList] = useState(nitList);
  const [editStudent, setEditStudent] = useState({});
  const [newStudent, setNewStudent] = useState({});

  useEffect(() => {
    localStorage.setItem("studentsList", JSON.stringify(studentsList));
  }, [studentsList, editStudent]);

  const handleClickOpenRegisterModal = () => {
    setOpenRModal(true);
  };

  const handleClose = () => {
    setOpenRModal(false);
    setOpenDConfirmation(false);
    resetList();
  };

  const resetList = () => {
    setDeleteStudent({ id: "", name: "", lastName: "", age: "", gender: "" });
    setNewStudent({ id: "", name: "", lastName: "", age: "", gender: "" });
    setEditStudent({ id: "", name: "", lastName: "", age: "", gender: "" });
  };

  useEffect(() => {
    if (editStudent !== null) {
      const student = editStudent;
      setNewStudent(student);
    } else {
      resetList();
    }
  }, [editStudent]);

  const handleEditStudent = (student: any) => {
    const newStudent = student;
    setEditStudent(newStudent);
    setOpenRModal(true);
  };
  const onDelete = (deleteStudent: any) => {
    const newList = studentsList.filter((list) => list.id !== deleteStudent.id);
    setStudentsList(newList);
    setOpenDConfirmation(false);
  };
  const isEditing = editStudent && editStudent.id ? true : false;
  const isDataValid =
    newStudent &&
    newStudent.name !== "" &&
    newStudent.lastName !== "" &&
    newStudent.age !== ""
      ? true
      : false;

  const saveChanges = () => {
    if (isEditing) {
      const newList = studentsList;
      newList.map((item) => {
        if (item.id === editStudent.id) {
          item.id = editStudent.id;
          item.name = newStudent.name;
          item.lastName = newStudent.lastName;
          item.age = newStudent.age;
          item.gender = newStudent.gender;
        }
      });
      setStudentsList(newList);
      resetList();
    } else {
      setStudentsList([...studentsList, newStudent]);
    }
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    saveChanges();
    setOpenRModal(false);
    resetList();
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
  const handleDeletStudent = (student: any) => {
    const deleteData = student;
    setOpenDConfirmation(true), setDeleteStudent(deleteData);
    setOpenDConfirmation(true);
  };

  return (
    <>
      <Grid>
        <Button
          onClick={handleClickOpenRegisterModal}
          endIcon={<AddIcon />}
          color="primary"
          variant="outlined"
        >
          Add new student
        </Button>
      </Grid>
      <Grid>
        <TableContainer>
          {studentsList && studentsList.length !== 0 && (
            <Typography color="primary">Students list</Typography>
          )}
          <Divider />
          <Table aria-label="simple table">
            {studentsList && studentsList.length === 0 ? (
              <Typography variant="h6">No records</Typography>
            ) : (
              <>
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
                        <EditIcon
                          onClick={() => handleEditStudent(student)}
                        ></EditIcon>
                        <DeleteIcon
                          onClick={() => handleDeletStudent(student)}
                        ></DeleteIcon>
                      </TableRow>
                    ))}
                </TableBody>
              </>
            )}
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
              Are you sure you want to delete <span>{deleteStudent.name}</span>?
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
              <DialogContentText>
                {isEditing ? "Edit student data" : "Enter new student data"}
              </DialogContentText>
              <TextField
                value={newStudent.name}
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
                value={newStudent.lastName}
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
                value={newStudent.age}
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
                value={newStudent.gender}
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
              <Button
                type="submit"
                color="primary"
                autoFocus
                disabled={!isDataValid}
              >
                {isEditing ? "Edit" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default Register;
