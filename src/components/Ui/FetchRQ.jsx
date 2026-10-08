import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchData,
  deleteIndividualPost,
  updateIndividualPost,
} from "../../API/api";
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

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", skip],
    queryFn: () => getData(skip),
    // gcTime: 1000*60*5
    // staleTime : 1000 *10,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteIndividualPost(id),
    onSuccess: (data, id) => {
      const filteredData = queryClient.setQueryData(
        ["posts", skip],
        (currentData) => {
          return (currentData.posts ?? currentData)?.filter(
            (item) => item.id !== id,
          );
        },
      );
      console.log(filteredData);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updateIndividualPost(id),

    onSuccess: (data, id) => {
      const upDatedData = queryClient.setQueryData(
        ["posts", skip],
        (postsData) => {
          return (postsData.posts ?? postsData)?.map((item) => {
            return item.id === id ? { ...item, title: data.title } : item;
          });
        },
      );
      console.log(upDatedData);
    },
  });

  // const deleteData = async (id)=>{

  // }

  // console.log(data);

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error || "something went wrong"}</h1>;

  return (
    data && (
      <div>
        {(data.posts ?? data).map((item) => (
          <div className="card w-96 bg-base-100 card-md shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Medium Card</h2>
              <NavLink to={`/post/${item.id}`}>
                <p>
                  {item.title}- {item.id}
                </p>
              </NavLink>
              <div className="justify-end card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => deleteMutation.mutate(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => updateMutation.mutate(item.id)}
                >
                  Update
                </button>
              </div>
            </div>
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
