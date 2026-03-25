import React from "react";
import noteService from "../appwrite/config"
import { useState, useEffect } from "react";
import Container from "../components/Container";
import NoteCard from "../components/NoteCard";
import { useSelector } from "react-redux";

function Home() {
    const [notes, setNotes] = useState([])
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (userData) {
            noteService.getNotes(userData.$id).then((notes) => {
                setNotes(notes?.documents || [])
            })
        }
    }, [userData])

    if (!userData) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">
                    Login to see your notes
                </h1>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">
                    No notes yet
                </h1>
            </div>
        );
    }

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap -m-2">
                    {notes.map((note) => (
                        <div key={note.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <NoteCard {...note}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home