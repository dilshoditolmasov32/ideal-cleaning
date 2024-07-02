import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Form } from "react-router-dom";
import service from "../service/service";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen }) {
  const [modalData, setModalData] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({...modalData, [name]:value})
    
};

const handleSubmit =async (e) => {
    e.preventDefault();

    try {
      const response=await service.create(modalData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    console.log(modalData);

    
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit}>
            {/* <TextField
              fullWidth
              label="Mijoz ismi sharifi"
              margin="normal"
              name="clientName"
              onChange={handleChange}
            /> */}

            <TextField
              fullWidth
              label="Xizmat turi"
              margin="normal"
              name="service_type"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Xizmat narxi (so'm)"
              margin="normal"
              name="service_price"
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Buyurtmani qo‘shish
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
