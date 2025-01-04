import React, { useState } from "react";
import PostCreator from "../PostCreator/postCreator"; // Make sure to adjust the import path
import CreateEvent from "../Event/CreateEvent"; // Adjust the import path
import "./Create.css"
function Create() {
    const [visibleComponent, setVisibleComponent] = useState("post");

    return (
        <div  className="create">
            <nav >
                <button
                  
                    onClick={() => setVisibleComponent("post")}
                >
                    Create Post
                </button>
                <button
                    
                    onClick={() => setVisibleComponent("event")}
                >
                    Create Event
                </button>
            </nav>
            
                {visibleComponent === "post" && <PostCreator />}
                {visibleComponent === "event" && <CreateEvent />}
            </div>
        
    );
}

export default Create;
