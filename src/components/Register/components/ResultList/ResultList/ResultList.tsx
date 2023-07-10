import React from "react";
import { Typography, TableCell, TableRow } from "@mui/material";

const ResultList = (item: any) => {
  if (!item) return null
  return (
    <>
      <TableRow key={item.name}>
        <TableCell component="th" scope="item">
          {item.name}
        </TableCell>
        <TableCell align="right">{item.lastName}</TableCell>
        <TableCell align="right">{item.age}</TableCell>
        <TableCell align="right">{item.gender}</TableCell>
      </TableRow>
    </>
  );
};

export default ResultList;
