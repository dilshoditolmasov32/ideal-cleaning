import htpp from "./config";

const service={
    create:(data)=>htpp.post("/service", data),
    get:()=>htpp.get("/service/all", {params:{page:1, limit:10}}),
    delete:(id)=>htpp.delete("/service", {params:{id}}),
    update: (data) => htpp.put(`/service`, data), // id va data parametrlarini ajratib olish

}

export  {service}