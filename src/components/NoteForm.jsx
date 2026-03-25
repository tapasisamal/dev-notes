import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import noteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NoteForm({note}) {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            title: note?.title || "",
            content: note?.content || ""
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
        if(note) {
            const dbNote = await noteService.updateNote(note.$id, data)
            if(dbNote){
                navigate(`/note/${dbNote.$id}`)
            }
        }else{
            const dbNote = await noteService.createNote({
                ...data,
                userId: userData.$id
            })
            if(dbNote) {
                navigate(`/note/${dbNote.$id}`)
            }
        }
    }

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <Input
            label= "Title :"
            placeholder= "Title"
            className= "mb-4"
            {...register("title", {required: true})}
            />

            <textarea
            placeholder= "Content"
            className="w-full mb-4 border p-2 rounded"
            {...register("content", {required: true})}
            />

            <Button type="submit" bgColor={note ? "bg-green-500" : undefined} className="w-full">
                {note ? "update" : "submit"}
            </Button>
        </form>
    )
}

export default NoteForm