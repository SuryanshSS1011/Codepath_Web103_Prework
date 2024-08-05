import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { supabase } from "../components/client";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import "./App.css"

const App = () => {
  const [creators, setCreators] = useState([]);

  const fetchCreators = async () => {
    const { data, error } = await supabase.from("creators").select("*");

    if (error) {
      console.error("Error fetching creators: ", error);
    } else {
      setCreators(data);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ShowCreators creators={creators} fetchCreators={fetchCreators} />
      ),
    },
    {
      path: "/creator/:id",
      element: (
        <ViewCreator creators={creators} fetchCreators={fetchCreators} />
      ),
    },
    {
      path: "/edit/:id",
      element: <EditCreator fetchCreators={fetchCreators} />,
    },
    { path: "/add", element: <AddCreator fetchCreators={fetchCreators} /> },
  ]);

  return <div>{routes}</div>;
};

export default App;
