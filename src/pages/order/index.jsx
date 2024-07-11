import * as React from "react";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import OrderTable from "../../components/order-table";
import AddModal from "../../components/order-modal";
import { order } from "../../components/service/order";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 3,
    page: 1,
    name: ""
  });
  const [total, setTotal] = useState(0);

  const getData = async () => {
    try {
      const response = await order.get(params);

      if (response.status === 200 && response?.data?.orders_list) {
        setData(response?.data?.orders_list);
        let count = Math.ceil(response?.data?.total / params.limit);
        setTotal(count);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleInputChange = (e) => {
    setParams({
      ...params,
      name: e.target.value
    });
  };

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value
    });
  };

  return (
    <>
      <AddModal open={open} setOpen={setOpen} />
      <div className="flex justify-between mb-3">
        <TextField label="Search..." id="fullWidth" onChange={handleInputChange} />
        <Button
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Buyurtma qo'shish
        </Button>
      </div>
      <OrderTable data={data} />
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
