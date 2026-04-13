import React from "react";
import { Link } from "react-router-dom";

function NoteCard({$id, title, content}){

    return(
        <Link to={`/note/${$id}`} className="block h-full w-full">
            <div className="h-full w-full bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition flex flex-col">

                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {title}
                </h2>
                <p className="text-gray-700 text-sm flex-1 overflow-hidden">
                    {(content?.slice(0, 100) || "") + "..."}
                </p>

            </div>
        </Link>
    )
}

export default NoteCard