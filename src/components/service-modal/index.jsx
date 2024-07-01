import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Form } from "react-router-dom";
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
  const [modalData, setModalData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
};
const handleSubmit = (e) => {
    e.preventDefault();
    setModalData({...modalData, [name]:value})
    console.log(modalData);

    // e.target.reset();
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
            <TextField
              fullWidth
              label="Mijoz ismi sharifi"
              margin="normal"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Xizmat turi"
              margin="normal"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Xizmat narxi (so‘m)"
              margin="normal"
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
