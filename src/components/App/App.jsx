import { useState } from "react";
import fetchImages from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [totalPages, setToralPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [modalImg, setModalImg] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = async (query) => {
    try {
      setImages([]);
      setError(false);
      setToralPages(0);
      setPage(1);

      const { data } = await fetchImages(query);
      setImages(data.results);
      setToralPages(data.total_pages);
    } catch (error) {
      setError(true);
    }
  };

  const openCloseModal = () => setOpenModal(!openModal);

  const handleOpenModel = (currentId) => {
    const [currentImg] = images.filter(({ id }) => id === currentId);
    setModalImg(currentImg);
    openCloseModal();
    console.log(modalImg);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} handleOpenModel={handleOpenModel} />
      <ImageModal
        openCloseModal={openCloseModal}
        openModal={openModal}
        modalImg={modalImg}
      />
    </>
  );
}

export default App;
