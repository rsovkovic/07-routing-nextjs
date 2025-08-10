"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import EmptyMessage from "../Empty/EmptyMessage";
interface NotesProps {
  initialNotes: Note[];
  initialTotalPages: number;
}

export default function Notes({ initialNotes, initialTotalPages }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () =>
      fetchNotes({ page: currentPage, perPage: 12, search: searchQuery }),
    enabled: true,
    placeholderData: keepPreviousData,
    initialData: {
      notes: initialNotes,
      totalPages: initialTotalPages,
    },
  });
  const updateSearchQuery = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    300
  );
  const handleSearchChange = (value: string) => {
    setCurrentPage(1);
    updateSearchQuery(value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleOpen}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={handleClose}>
            <NoteForm onClose={handleClose} />
          </Modal>
        )}
      </header>
      {/* {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.notes.length === 0 && <EmptyMessage />} */}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
