import React from "react";
import noteService from "../appwrite/config";
import { useState, useEffect } from "react";
import Container from "../components/Container";
import NoteCard from "../components/NoteCard";
import { useSelector } from "react-redux";

function Home() {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState("");

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            noteService.getNotes(userData.$id).then((notes) => {
                setNotes(notes?.documents || []);
            });
        }
    }, [userData]);

    if (!userData) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">
                    Login to see your notes
                </h1>
            </div>
        );
    }

    // 🔍 Filter notes based on search
    const filteredNotes = notes.filter((note) =>
        (note.content + " " + (note.title || ""))
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );

    if (notes.length === 0) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">
                    No notes yet
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>

                {/* 🔍 SEARCH BAR */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full max-w-md p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* NOTES */}
                <div className="flex flex-wrap -m-2">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <div
                                key={note.$id}
                                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex"
                            >
                                <NoteCard {...note} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full mt-10">
                            <h1 className="text-xl font-semibold">
                                No matching notes found
                            </h1>
                        </div>
                    )}
                </div>

            </Container>
        </div>
    );
}

export default Home;