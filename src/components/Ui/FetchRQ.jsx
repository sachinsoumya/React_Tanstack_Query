import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";
export const FetchRQ = () => {
  const [skip, setSkip] = useState(0);

  const getData = async (skip) => {
    try {
      const response = await fetchData(skip);

      return response.status === 200 ? response.data : [];

      //   console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", skip],
    queryFn: () => getData(skip),
    // gcTime: 1000*60*5
    // staleTime : 1000 *10,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData
  });

  console.log(data);

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error || "something went wrong"}</h1>;

  return (
    data && (
      <div>
        {data?.posts?.map((item) => (
          <div className="card w-96 bg-base-100 card-md shadow-sm">
            <NavLink to={`/post/${item.id}`}>
              <div className="card-body">
                <h2 className="card-title">Medium Card</h2>
                <p>
                  {item.title}- {item.id}
                </p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
        <div className="flex justify-between w-1/6 m-auto mt-5">
          <button
            className="btn btn-soft"
            onClick={() => setSkip((prev) => prev - 3)}
          >
            Previous
          </button>
          <button
            className="btn btn-soft"
            onClick={() => setSkip((prev) => prev + 3)}
          >
            Next {skip}
          </button>
        </div>
      </div>
    )
  );
};
