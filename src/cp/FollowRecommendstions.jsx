import "../StyleApp/Buttons.css"

import axios from "axios";
import { useEffect, useState } from "react";

const FollowRecommendstions = (props) => {
    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = () => {
        axios.post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then((res) => {
                setRecommendations(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getRecommendations()
    }, [props.posts])

    const follow = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/follow", {
            leader_id: id,
        })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log(recommendations);
    return <div className="followRecommendations">
        {recommendations.map(recommendation => {
            return (
                <div className="followRecommendation" key={recommendation.id}>
                    <button className="btn follow" onClick={() => follow(recommendation.id)}>Follow</button>
                </div>
            )
        })}
    </div>;
};

export default FollowRecommendstions;