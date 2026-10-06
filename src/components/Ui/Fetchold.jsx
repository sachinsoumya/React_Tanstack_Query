import React, { useState, useEffect } from "react";

import { fetchData } from "../../API/api";

export const Fetchold = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetchData();

      response.status === 200 && setData(response.data);

      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    data && (
      <div>
        {data?.posts?.map((item) => (
          <div className="card w-96 bg-base-100 card-md shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Medium Card</h2>
              <p>{item.title}</p>
              <div className="justify-end card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};
