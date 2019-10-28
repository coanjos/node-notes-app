const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatedNotes = notes.filter((note) => {
        return note.title === title
    })

    if(duplicatedNotes.length === 0){
        notes.push({
            title,
            body
        })
    
        saveNotes(notes)

        console.log('New note added')
    } else {
        console.log('Note title taken')
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => {
        note.title !== title
    })

    if(notes.length > filteredNotes.length){
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse(`Removing note ${title}`))
    } else {
        console.log(chalk.red.inverse('No notes found'))
    }    
}

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()

    const noteFound = notes.find((note) => {
        return note.title === title
    })
    
    if(noteFound) {
        console.log(noteFound.body)
    } else {
        console.log('No note found')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()        
        return parsedData = JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {    
    addNote,
    removeNote,
    listNotes,
    readNote
}