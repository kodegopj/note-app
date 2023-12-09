import Note from "../models/Note.js";

async function getNotesInfo(_, res) {
  const notes = await Note.find({});
  const notesCount = await notes.length;

  return res.send(`<p>Notes App have ${notesCount} notes</p>`);
}

async function getNotes(req, res) {
  const notes = await Note.find({});

  return res.json(notes);
}

async function getNote(req, res) {
  const id = req.params.id;
  const note = await Note.findById(id);

  return res.json(note);
}

async function deleteNote(req, res) {
  const id = req.params.id;

  await Note.findByIdAndDelete(id);

  return res.status(204).end();
}

async function createNote(req, res) {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save().then((result) => result);

  return res.status(201).json(savedNote);
}

async function updateNote(req, res) {
  const id = req.params.id;
  const { content, important } = req.body;

  const note = {
    content,
    important,
  };

  const updatedNote = await Note.findByIdAndUpdate(id, note, {
    new: true,
  });

  return res.status(200).json(updatedNote);
}

export default {
  getNotesInfo,
  getNotes,
  getNote,
  deleteNote,
  createNote,
  updateNote,
};
