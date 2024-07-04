import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { orderValidationSchema } from "@validation";
import { order } from "../service/order";
import { useMask } from "@react-input/mask";
import SelectOption from "../select-option";
const defaultTheme = createTheme();

export default function ServiceModal({ open, setOpen, editData }) {
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues = {
    client_full_name: editData?.client_full_name || "",
    client_phone_number: editData?.client_phone_number || "",
    amount: editData?.amount || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const client_phone_number = values.client_phone_number.replace(/\D/g, "");
    const payload = {
      ...values,
      client_phone_number: `+${client_phone_number}`,
    };

    try {
      let response;
      if (editData && editData.id) {
        response = await order.update({ id: editData.id, ...payload });
      } else {
        response = await order.create(payload);
      }
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              padding: 4,
              borderRadius: 1,
              boxShadow: 24,
            }}
          >
            <Typography component="h1" variant="h5">
              Buyurtma ma‘lumotlari
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={orderValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="client_full_name"
                    type="text"
                    as={TextField}
                    label="Xaridorning ismi familyasi"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="client_full_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="client_phone_number"
                    as={TextField}
                    label="Telefon raqamingizni kiriting"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    inputRef={inputRef}
                    helperText={
                      <ErrorMessage
                        name="client_phone_number"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="amount"
                    type="number"
                    as={TextField}
                    label="Buyurtma miqdorini kiriting"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="amount"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

<SelectOption/>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? "Yuklanmoqda..." : "Saqlash"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </Modal>
  );
}
