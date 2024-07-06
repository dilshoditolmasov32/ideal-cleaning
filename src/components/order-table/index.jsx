import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { order } from "../service/order";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import OrderModal from "../order-modal";
import { useState } from "react";

export default function BasicTable({ data }) {
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);

  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
        toast.info("Ma'lumot muvaqqiyati o'chirildi.");
      }
    } catch (error) {
      toast.error("Xatolik bor");
    }
  };

  const openModal = (item) => {
    setEditData(item);
    setOpen(true);
  };
  return (
    <>
      <OrderModal
        editData={editData}
        open={open}
        setOpen={() => setOpen(false)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>T/r</TableCell>
              <TableCell align="right">Xaridorning ismi familyasi</TableCell>
              <TableCell align="right">Telefon raqami</TableCell>
              <TableCell align="right">Xizmat nomi</TableCell>
              <TableCell align="right">Buyurtma narxi</TableCell>
              <TableCell align="right">Buyurtma miqdori</TableCell>
              <TableCell align="right" sx={{ paddingRight: "60px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right"> {item.client_name}</TableCell>
                <TableCell align="right"> {item.client_phone_number}</TableCell>
                <TableCell align="right"> {item.service_name}</TableCell>
                <TableCell align="right"> {item.price}</TableCell>
                <TableCell align="right"> {item.amount}</TableCell>
                <TableCell align="right" className="flex ">
                  <Button onClick={() => openModal(item)}>
                    <FaEdit />
                  </Button>
                  <Button onClick={() => deleteItem(item.id)}>
                    <RiDeleteBin6Line />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
