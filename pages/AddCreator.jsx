import React, { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import "./AddCreator.css";

const AddCreator = () => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from("creators")
            .insert([{ name, url, description, imageURL }]);

        if (error) {
            console.error("Error adding creator: ", error);
        } else {
            console.log("Creator added: ", data);
            navigate("/");
        }
    };

    return (
        <div>
            <h1>Add New Content Creator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Image URL (optional):</label>
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;
