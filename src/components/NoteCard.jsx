import React from "react";
import { Link } from "react-router-dom";

function NoteCard({$id, title, content}){

    return(
        <Link to={`/note/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition">

                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p>
                    {(content?.slice(0, 100) || "") + "..."}
                </p>

            </div>
        </Link>
    )
}

export default NoteCard