import React from "react";
import { useState, useEffect } from "react";
import Container from "../components/Container";
import NoteForm from "../components/NoteForm";
import noteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
    const [note, setNote] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(id) {
            noteService.getNote(id).then((note) => {
                if(note) {
                    setNote(note)
                }else{
                    navigate("/")
                }
            })
        }
    }, [id, navigate])

    if (!note) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return(
        <div className="py-8">
            <Container>
                <NoteForm note={note}/>
            </Container>
        </div>
    ) 
}

export default EditNote