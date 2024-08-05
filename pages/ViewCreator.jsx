import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../components/client";
import "./ViewCreator.css";

const ViewCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from("creators")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error fetching creator: ", error);
            } else {
                setCreator(data);
            }
        };

        fetchCreator();
    }, [id]);

    const handleDelete = async () => {
        const { error } = await supabase.from("creators").delete().eq("id", id);

        if (error) {
            console.error("Error deleting creator: ", error);
        } else {
            navigate("/");
        }
    };

    if (!creator) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="card">
                <h1>{creator.name}</h1>
                <img
                    src={creator.imageURL}
                    alt={creator.name}
                    className="card-image"
                />
                <div className="card-content">
                    <p>{creator.description}</p>
                    <a
                        href={creator.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="visit-button">Visit Channel</button>
                    </a>
                    <Link to={`/edit/${id}`}>
                        <button className="edit-button">Edit</button>
                    </Link>
                    <button className="delete-button" onClick={handleDelete}>
                        Delete
                    </button>
                    <p></p>
                    <Link to="/" className="card-button">
                        Back to All Creators
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewCreator;
