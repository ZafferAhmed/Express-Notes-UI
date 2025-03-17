import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Base_Url } from "../Constants/Global-constants";

const NotesForm = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${Base_Url}notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch notes");

      const data = await response.json();
      setNotes(data);
      toast.success("Notes fetched successfully");
    } catch (error) {
      toast.error("Error fetching notes or Please Login Again");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description are required");
      return;
    }

    const noteData = { title, description };

    try {
      if (editingId) {
        const response = await fetch(`${Base_Url}notes/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
          body: JSON.stringify(noteData),
        });

        if (!response.ok) throw new Error("Failed to update note");

        toast.success("Note updated successfully");
        setEditingId(null);
      } else {
        const response = await fetch(`${Base_Url}notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
          body: JSON.stringify(noteData),
        });

        if (!response.ok) throw new Error("Failed to add note");
        toast.success("Note added successfully");
      }

      setTitle("");
      setDescription("");
      fetchNotes();
    } catch (error) {
      toast.error("Error saving note");
      console.error(error);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`${Base_Url}notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete note");
      toast.success("Note deleted successfully");
      fetchNotes();
    } catch (error) {
      toast.error("Error deleting note");
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Notes Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-400 transition duration-300 ease-in-out"
        >
          {editingId ? <Edit size={16} /> : <Plus size={16} />}
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Notes List</h3>
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">S.No</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Updated At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note._id} className="border">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{note.title}</td>
                <td className="p-2 border">{note.description}</td>
                <td className="p-2 border">{formatDate(note.createdAt)}</td>
                <td className="p-2 border">{formatDate(note.updatedAt)}</td>
                <td className="p-2 flex justify-around">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-blue-500"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </div>
  );
};

export default NotesForm;
