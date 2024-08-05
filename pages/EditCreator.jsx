import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCreator.css';

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator: ', error);
            } else {
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL);
            }
        };

        fetchCreator();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', id);

        if (error) {
            console.error('Error updating creator: ', error);
        } else {
            console.log('Creator updated: ', data);
            navigate('/');
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting creator: ', error);
        } else {
            navigate('/');
        }
    };

    return (
        <div>
            <h1>Edit Content Creator</h1>
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
                <button type="submit">Update Creator</button>
                <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    );
};

export default EditCreator;

