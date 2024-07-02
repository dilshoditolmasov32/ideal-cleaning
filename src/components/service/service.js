import htpp from "./config";

const service={
    create:(data)=>htpp.post("/service", data),
    get:()=>htpp.get("/service/all", {params:{page:1, limit:10}}),
}

export default service