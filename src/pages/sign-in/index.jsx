import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import auth from "../../components/service/auth";

const defaultTheme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("email", response?.data?.email)
        localStorage.setItem("access_token", response?.data?.access_token);
        navigate("/main");
        toast.success("Xush kelibsiz");
      }
    } catch (error) {
      toast.error("Email yoki parol xato, qaytadan urinib ko'ring");
    }
    setSubmitting(false);
  };

  const handleClick = () => {
    navigate("/sign-up");
  };

  const handlePassword = () => {
    navigate("/forgot-password");
  };

  return (
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
          <Typography component="h1" variant="h5">
            Tizimga kirish
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Parol"
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Yuklanmoqda..." : "Tizimga kirish"}
                </Button>
                <div className="flex justify-between">
                  <p
                    onClick={handleClick}
                    className="hover:cursor-pointer hover:underline text-[20px]"
                  >
                    Register
                  </p>
                  <p
                    className="text-end text-[crimson] hover:cursor-pointer hover:underline text-[20px]"
                    onClick={handlePassword}
                  >
                    Forgot password?
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
