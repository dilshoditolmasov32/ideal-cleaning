import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import OrderTable from '../../components/order-modal'
import AddModal from "../../components/order-modal";
import { order } from "../../components/service/order";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await order.get();
      if ((response.status===200  && response?.data?.order)||response.status===201  && response?.data?.order) {
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
      <AddModal open={open} setOpen={setOpen} />
      <div className="flex justify-end mb-3">
        <Button
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Buyurtma qo'shish
        </Button>
      </div>
      <OrderTable data={data} /> 
    </>
  );
};

export default Index;
