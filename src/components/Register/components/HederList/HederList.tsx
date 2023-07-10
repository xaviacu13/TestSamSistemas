import React from "react";
import { TableRow, TableHead, TableCell } from "@mui/material";

const HederList = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Last Name</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">Gender</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default HederList;
