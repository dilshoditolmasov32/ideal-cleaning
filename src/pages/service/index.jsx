import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ServiceTable from "../../components/service-table";
import AddServiceModal from "../../components/service-modal";
import { service } from "../../components/service/service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await service.get();
      if ((response.status===200  && response?.data?.services)||response.status===201  && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AddServiceModal open={open} setOpen={setOpen} />
      <div className="flex justify-end mb-3">
        <Button
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Buyurtma qo'shish
        </Button>
      </div>
      <ServiceTable data={data} /> 
    </>
  );
};

export default Index;
