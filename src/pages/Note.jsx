import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import noteService from "../appwrite/config"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import Button from "../components/Button";

function Note() {
    const [note, setNote] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const {id} = useParams()
 
    const isAuthor = note && userData ? note.userId === userData.$id : false

    useEffect(() => {
        if (id) {
            noteService.getNote(id).then((note) => {
                setNote(note);
            });
        }
    }, [id]);

    const deleteNote = async () => {
        const result = await noteService.deleteNote(note.$id)
        if(result) {
            navigate("/home")
        }
    }

    if (!note) {
        return <div>Loading...</div>;
    }

    console.log("note.userId:", note?.userId);
    console.log("userData.$id:", userData?.$id);
    console.log("isAuthor:", isAuthor);

        return (
        <div className="py-8">
            <Container>
                <div className="relative">
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-note/${note.$id}`}>
                                <Button
                                    bgColor="bg-green-500"
                                    className="mr-3"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-500"
                                onClick={deleteNote}
                            >
                                Delete
                            </Button>
                        </div>
                    )}

                    <h1 className="text-2xl font-bold mb-4">
                        {note.title}
                    </h1>

                    <p>{note.content}</p>
                </div>
            </Container>
        </div>
    );

}

export default Note