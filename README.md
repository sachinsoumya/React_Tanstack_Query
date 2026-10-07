- Installed and set up Vite + React app .
- Installed react-router-dom
- Installed and configured Tailwind CSS and DaisyUI
- Installed and configured Axios.
- Created components folder inside src folder.
  src

  # components/Layout/Ui

  # Layout/Footer.jsx , Header.jsx, MainLayout.jsx

  #Ui/Fetchold.jsx , FetchRQ.jsx , Home.jsx

- Imported and used CreateBrowseRouter , RouterProvider, Outlet , NavLink from react-router-dom for client routing and Navigation.
- See traditional way data fetching , managing and rendering in Fetchold component.
- See React query data fetching , managing and rendering in FetchRQ component using hook like useQuery( key: ["abc"],queryFun: function (){});
- Created the queryClient instance (new QueryClient()) and Wrap the whole React app within <QueryClientProvider client={new QueryClient()}></QueryClientProvider>
- gcTime - The time duration in which the data will be there in cache. staleTime - The time duration in which the fetched data will remain fresh in cache and not calling the api again.
- Api Polling , refetchInterval:1000 and refetchIntervalInBackground:true
- Configured router path of <IndividualPost /> component and in root component like App.jsx
- Used useParams() hook to get the dynamic id value in router params.
- Created <IndividualPost /> component to get the details of single post . Passed "id" as query keys like const { data, isPending, isError, error } = useQuery({
  queryKey: ["posts", id],
  queryFn: () => fetchIndividualPost(id),
  }); . Whenever the value of id changes the fetchIndividualPost(id) will be called with new id value.
- Added pagination used limit and skip on api . 
- used placeholderData: keepPreviousData within useQuery() hook.
- used useMutation , and .mutate() hook from Tanstack query for delete api call and used queryClient instance methods for updating cache data.
- Used nullish coalescing operator for mapping and conditional rendering into jsx.




