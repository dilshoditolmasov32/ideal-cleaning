import * as React from "react";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "../../components/cleints-table";
import { cleint } from "../../components/service/cleint";

const Index = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 3,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cleint.get(params);
      if (response.status === 200 && response?.data?.clients_list) {
        setData(response?.data?.clients_list);
        let count = Math.ceil(response?.data?.total / params.limit);
        setTotal(count);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table data={data} />
      )}

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
