export const getAllNotes = (rer, res) => {
  res.status(200).json({ message: "All notes fetched successfully!" });
};

export const createNote = (req, res) => {
  res.status(201).json({ message: "New Note created successfully!" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "Your Note updated successfully!" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "Your Note deleted successfully!" });
};
