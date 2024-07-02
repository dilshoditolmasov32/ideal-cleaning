import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState, useMemo } from "react";
import service from "../../components/service/service";
import Modal2 from "../../components/service-modal";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
 


  const getData = async () => {
    try {
      const response = await service.get()
      if (response.status===200 && response?.data?.services) {
        console.log(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData()
  
  }, []);
  
  return (
    <>
      <Modal2  />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">T/r</TableCell>
              <TableCell align="left">Mijoz ismi sharifi</TableCell>
              <TableCell align="left">Xizmat turi</TableCell>
              <TableCell align="left">Narxi</TableCell>
              <TableCell align="left">Holat</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {modalData?.map((item, index) => (
              console.log(item)
              // <TableRow
              //   key={item.id}
              //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              // >
              //   <TableCell component="th" scope="row">
              //     {item.name}
              //   </TableCell>
              //   <TableCell align="">{item.calories}</TableCell>
              //   <TableCell align="right">{item.fat}</TableCell>
              //   <TableCell align="">{item.carbs}</TableCell>
              //   <TableCell align="">{item.protein}</TableCell>
              // </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </>
  );
}
