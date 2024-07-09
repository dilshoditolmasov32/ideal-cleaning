import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMask } from "@react-input/mask";
import { orderValidationSchema } from "@validation";
import { service } from "../service/service";
import  {order}  from "../service/order";
const defaultTheme = createTheme();

export default function Index({ open, setOpen, editData }) {
  const [data, setData] = useState([]);
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues = {
    client_full_name: editData?.client_name || "",
    client_phone_number:editData?.client_phone_number || "",
    amount: editData?.amount || "",
    service_id: editData?.service_id || "",
  };

  const getData = async () => {
    try {
      const response = await service.get();
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values)
    const phone_number = values.client_phone_number.replace(/\D/g, "");
    const payload = { ...values, client_phone_number: `+${phone_number}` };
if (editData) {
  const payload = {
    id: editData.id, ...values,
  };
  try {
    const response = await order.update(payload);
    console.log(response)
    if (response.status === 200 || response.status === 201) {
      window.location.reload();
      setOpen(false)
    }
  } catch (error) {
    console.log(error.message);
  }
} else {
  try {
    const response = await order.create(payload);

    if (response.status === 201) {
      window.location.reload();
      setOpen(false);
    }
  } catch (error) {
    console.log(error.message);
  }
}
}
  

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

                  <Field
                    name="service_id"
                    type="text"
                    as={Select}
                    label="Buyurtma miqdorini kiriting"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="service_id"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  >
                    {data?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>

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
