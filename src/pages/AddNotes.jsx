import React from "react";
import Container from "../components/Container";
import NoteForm from "../components/NoteForm";

function AddNote() {
    return (
        <div className="py-8">
            <Container>
                <NoteForm />
            </Container>
        </div>
    );
}

export default AddNote;