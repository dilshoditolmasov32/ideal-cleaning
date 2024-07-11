import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TextField from '@mui/material/TextField';
import ServiceTable from "../../components/service-table";
import AddServiceModal from "../../components/service-modal";
import { service } from "../../components/service/service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 3,
    page: 1,
    name:""
  });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const response = await service.get(params);
      if ((response.status===200  && response?.data?.services)||response.status===201  && response?.data?.services) {
        setData(response?.data?.services);
        let count = Math.ceil(response?.data?.total / params.limit);
        setTotal(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);



  const handleChange = (event, value) => {
    setParams({
     ...params,
     page:value
    })
   };
  return (
    <>
      <AddServiceModal open={open} setOpen={setOpen} />
      <div className="flex justify-between mb-3">
      <TextField  label="Search..." id="fullWidth"  />
        <Button
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Buyurtma qo'shish
        </Button>
      </div>
      <ServiceTable data={data} /> 
      <Pagination
        count={total}
        page={params.page}
        onChange={handleChange}
        sx={{ marginTop: "25px" }}
      />
    </>
  );
};

export default Index;
