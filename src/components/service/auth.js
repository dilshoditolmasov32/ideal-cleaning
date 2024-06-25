import htpp from "./config";

const auth={
    sign_up:(data)=>htpp.post("/auth/register",data),
    verify:(data)=>htpp.post("/auth/verify",data),
    sign_in:(data)=>htpp.post("/auth/login",data),
}

export  default auth