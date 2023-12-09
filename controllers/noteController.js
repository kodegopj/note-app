import Note from "../models/Note.js";

async function getNotesInfo(_, res, next) {
  try {
    const notes = await Note.find({});
    const notesCount = await notes.length;
    return res.send(`<p>Notes App have ${notesCount} notes</p>`);
  } catch (error) {
    next(error);
  }
}

async function getNotes(req, res, next) {
  try {
    const notes = await Note.find({});
    return res.json(notes);
  } catch (error) {
    next(error);
  }
}

async function getNote(req, res, next) {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    return res.json(note);
  } catch (error) {
    next(error);
  }
}

async function deleteNote(req, res, next) {
  const id = req.params.id;

  try {
    await Note.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function createNote(req, res, next) {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
    });

    const savedNote = await note.save().then((result) => result);

    return res.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
}

async function updateNote(req, res, next) {
  const id = req.params.id;
  const { content, important } = req.body;

  try {
    const note = {
      content,
      important,
    };

    const updatedNote = await Note.findByIdAndUpdate(id, note, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updatedNote) return res.status(404).send({ error: "Note not found!" });

    return res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
}

export default {
  getNotesInfo,
  getNotes,
  getNote,
  deleteNote,
  createNote,
  updateNote,
};
