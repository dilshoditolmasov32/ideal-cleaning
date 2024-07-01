import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useMask } from "@react-input/mask";
import auth from "../../components/service/auth";
import Modal from "../../components/modal";
import { signUpValidationSchema } from "@validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState({});
  const [showModal, setShowModal] = useState(false);
const navigate=useNavigate()
  const initialValues = {
    email: "",
    full_name: "",
    password: "",
    phone_number: "",
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });


  const handleClick = () => {
    console.log("Ok")
    navigate("/");
  };


  const handleSubmit = async (values) => {
    console.log(values);
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    try {
      const result = await auth.sign_up(payload);
      if (result.status === 200) {
        localStorage.setItem("email", values.email);
        toast.success("Tabriklaymiz 1-bosqichdan muvaqqiyatli o'tdingiz");

        setTimeout(() => {
          setShowModal(true);
        }, 1000);
      }
    } catch (error) {
      toast.error("Xatolik bor");
    }
    
    values.target.reset()
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3 className="text-4xl">Register</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={signUpValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field
                      name="email"
                      type="email"
                      as={TextField}
                      label="Email"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      helperText={
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-[red] text-[15px]"
                        />
                      }
                    />
                    <Field
                      name="full_name"
                      type="text"
                      as={TextField}
                      label="FullName"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      helperText={
                        <ErrorMessage
                          name="full_name"
                          component="p"
                          className="text-[red] text-[15px]"
                        />
                      }
                    />

                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      as={TextField}
                      label="Password"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="text-[red] text-[15px]"
                        />
                      }
                    />

                    <Field
                      name="phone_number"
                      as={TextField}
                      label="Phone number"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      inputRef={inputRef}
                      helperText={
                        <ErrorMessage
                          name="phone_number"
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
                      {isSubmitting ? "Loading..." : "Tizimga kirish"}
                    </Button>

                    <div className="flex justify-end">
                  <p
                    onClick={handleClick}
                    className="hover:cursor-pointer hover:underline text-[20px] font-medium"
                  >
                   Login
                  </p>
                
                </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>
        </ThemeProvider>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
