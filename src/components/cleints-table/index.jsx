import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { cleint } from "../service/cleint";
import { toast } from "react-toastify";

export default function BasicTable({ data }) {
    console.log(data)
  const [tableData, setTableData] = useState(data);
  const [loading, setLoading] = useState(false);

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const response = await cleint.delete(id)
      if (response.status === 200 || response.status === 201) {
        setTableData((prevData) => prevData.filter((item) => item.id !== id));
        toast.info("Ma'lumot muvaffaqiyatli o'chirildi.");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>T/r</TableCell>
            <TableCell align="right">Xaridorning ismi familyasi</TableCell>
            <TableCell align="right">Telefon raqami</TableCell>
            <TableCell align="right" sx={{ paddingRight: "60px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((item, index) => (
            <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 1 } }}>
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell align="right">{item.full_name}</TableCell>
              <TableCell align="right">{item.phone_number}</TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteItem(item.id)} disabled={loading}>
                  <RiDeleteBin6Line />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
