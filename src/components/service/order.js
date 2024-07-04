import htpp from "./config";

const order={
    create:(data)=>htpp.post("/order", data),
    get:()=>htpp.get("/order/all", {params:{page:1, limit:10}}),
    delete:(id)=>htpp.delete("/order", {params:{id}}),
    update: (data) => htpp.put(`/order`, data), 

}

export  {order}