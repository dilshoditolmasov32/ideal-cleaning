import htpp from "./config";

const order={
    create:(data)=>htpp.post("/order", data),
    get:(params)=>htpp.get("/order/all",{params}),
    delete:(id)=>htpp.delete("/order", {params:{id}}),
    update: (data) => htpp.put(`/order`, data), 

}

export  {order}