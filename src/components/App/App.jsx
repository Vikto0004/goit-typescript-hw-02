import { useState } from "react";
import fetchImages from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

function App() {
  const [images, setImages] = useState([]);
  const [totalPages, setToralPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [modalImg, setModalImg] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = async (query) => {
    try {
      setImages([]);
      setError(false);
      setToralPages(0);
      setPage(1);
      setSearchWord(query);

      const { data } = await fetchImages(query);
      setImages(data.results);
      setToralPages(data.total_pages);
      console.log(totalPages);
    } catch (error) {
      setError(true);
    }
  };

  const openCloseModal = () => {
    setOpenModal(!openModal);
    if (openModal) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
  };

  const handleOpenModel = (currentId) => {
    const [currentImg] = images.filter(({ id }) => id === currentId);
    setModalImg(currentImg);
    openCloseModal();
  };

  const onLoadMore = async () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      if (totalPages === newPage) return;
      fetchImagesWithPage(newPage);
      return newPage;
    });
  };

  const fetchImagesWithPage = async (page) => {
    try {
      const { data } = await fetchImages(searchWord, page);
      setImages((prevRes) => [...prevRes, ...data.results]);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} handleOpenModel={handleOpenModel} />
      {<LoadMoreBtn onLoadMore={onLoadMore} />}
      {openModal && (
        <ImageModal openCloseModal={openCloseModal} modalImg={modalImg} />
      )}
    </>
  );
}

export default App;
