import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "New note created successfully !" });
  } catch (error) {
    console.error("Error creating notes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Note not found." });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found." });

    res.status(200).json({ message: "your Note updated successfully!" });
  } catch (error) {
    console.error("error updating notes: ", error);
    res.status(500).json({ message: "internal server error." });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Note not found!" });
    }
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote)
      return res.status(404).json({ message: " Note not found!" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error detecting note: ", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "note not found!" });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }
    res.json(note);
  } catch (error) {
    console.error("Error fetching note: ", error);
    res.status(500).json({ message: "internal Server Error!" });
  }
};
