import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ id, name, url, description, imageURL }) => {
    return (
        <div className="card">
            <div className="card-content">
                <img src={imageURL} alt={name} className="card-image" />
                <h2 className="card-title">{name}</h2>
                <p className="card-description">{description}</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-button"
                >
                    Visit Channel
                </a>
                <Link to={`/creator/${id}`} className="card-button">
                    Details
                </Link>
                <Link to={`/edit/${id}`} className="card-button">
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default Card;
