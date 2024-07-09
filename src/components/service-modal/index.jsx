import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { serviceValidationSchema } from "@validation";
import { service } from "../service/service";

const defaultTheme = createTheme();

export default function ServiceModal({ open, setOpen, editData }) {
  const initialValues = {
    name: editData?.name ?? "",
    price: editData?.price ?? "",
  };
  

  const handleSubmit = async (values, { setSubmitting }) => {
    if (editData) {
      const payload = {
        id: editData.id, ...values,
      };
      try {
        const response = await service.update(payload);
        if (response.status === 200 || response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await service.create(values);
        if (response.status === 200 || response.status === 201) {
          window.location.reload();
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
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
              validationSchema={serviceValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    type="text"
                    as={TextField}
                    label="Xizmat nomi"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="price"
                    type="number"
                    as={TextField}
                    label="Xizmat narxi"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="price"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

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
