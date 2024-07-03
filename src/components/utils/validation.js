import * as Yup from "yup"


//==============   AUTH   =================

export const signInValidationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid required").required("Email is required"),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password mus be at least 6 characters").required("Password is requerid")
})


export const signUpValidationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid required").required("Email is required"),
    full_name:Yup.string().required("Email is required"),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password mus be at least 6 characters").required("Password is requerid"),
    phone_number:Yup.string().min(19,"Invalid phone number").required("Phone is required")
})


//==============   SERVICE   ================

export const serviceValidationSchema = Yup.object({
    name: Yup.string().required('Xizmat nomi talab qilinadi'),
    price: Yup.number()
      .required('Xizmat narxi talab qilinadi')  // Majburiy to'ldirilishi kerak
      .positive('Narx musbat bo\'lishi kerak')  // Musbat qiymat bo'lishi kerak
      .integer('Narx butun son bo\'lishi kerak') // Butun son bo'lishi kerak
  });