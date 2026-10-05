import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../API/api";
export const FetchRQ = () => {
  const getData = async () => {
    try {
      const response = await fetchData();

      return response.status === 200 ? response.data : [];

      //   console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
    // gcTime: 1000*60*5
    staleTime : 1000 *10
  });

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error || "something went wrong"}</h1>;

  return (
    data && (
      <div>
        {data.map((item) => (
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
