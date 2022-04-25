import { InputLeftElement } from '@chakra-ui/react'
import React from 'react'

export default function About({ notes }) {
    return (
        <div>
            <h1>About</h1>
            <div>
                {notes.map(note => {
                    return (
                        <div key={note.id}>
                            <h3>{note.title}</h3>
                            <p1>{note.description}</p1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 

About.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();

    return { notes: data };
}