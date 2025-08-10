// import { fetchNotes } from "@/lib/api";

// const Notes = async () => {
//   const notes = await fetchNotes({ page: 1, perPage: 10 });
//   console.log("notes", notes);
//   return <div>Notes</div>;
// };

// export default Notes;

// import css from "./App.module.css";
// import NoteList from "@/components/NoteList/NoteList";
// // import SearchBox from "@/components/SearchBox/SearchBox";
// import { fetchNotes } from "@/lib/api";
// const Notes = async () => {
//   const response = await fetchNotes({ page: 1, perPage: 10 });

//   return (
//     <section>
//       <h1>Notes List</h1>
//       {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
//     </section>
//   );
// };

// export default Notes;

import Notes from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";
// import { Note } from "@/types/note";
export default async function NotesPage() {
  // const notes = await fetchNotes();
  const { notes, totalPages } = await fetchNotes({
    page: 1,
    perPage: 12,
    search: "",
  });
  return (
    <div>
      <Notes initialNotes={notes} initialTotalPages={totalPages} />
    </div>
  );
}
