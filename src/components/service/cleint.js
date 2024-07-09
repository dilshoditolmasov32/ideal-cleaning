import htpp from "./config";

const cleint={
    get:(params)=>htpp.get("/cleint/all",{params}),
    delete:(id)=>htpp.delete("/cleint", {params:{id}}),

}

export  {cleint}