import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import './ShowCreators.css';

const ShowCreators = () => {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            const { data } = await supabase.from('creators').select();
            setCreators(data);
        };
        fetchCreators();
    }, []);

    const handleAddCreator = (newCreator) => {
        setCreators([...creators, newCreator]);
    };

    const handleDeleteCreator = (id) => {
        setCreators(creators.filter((creator) => creator.id !== id));
    };

    return (
        <div className="container">
            <h1>Content Creators</h1>
            <Link to="/add">
                <button className="add-button">Add Creator</button>
            </Link>
            <div className="card-grid">
                {creators.length > 0 ? (
                    creators.map((creator) => (
                        <Card
                            key={creator.id}
                            id={creator.id}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                            onDelete={handleDeleteCreator}
                        />
                    ))
                ) : (
                    <p>No content creators found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowCreators;

