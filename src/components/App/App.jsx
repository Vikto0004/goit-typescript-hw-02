import { useEffect, useState } from "react";
import fetchImages from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [totalPages, setToralPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [modalImg, setModalImg] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!query) {
      setMessage("Enter the word");
      setError(true);
      return;
    }
    setLoader(true);
    fetchImages(query, page)
      .then(({ data }) => {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setToralPages(data.total_pages);
        if (!data.results.length) {
          setMessage(`Nothing was found for the word "${query}"`);
          setError(true);
        }
      })
      .catch(() => {
        setMessage("Oops, something went wrong, try reloading the page");
        setError(true);
      })
      .finally(() => setLoader(false));
  }, [query, page]);

  const onSearch = (query) => {
    setQuery(query);
    setImages([]);
    setError(false);
    setToralPages(0);
    setPage(1);
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

  const onLoadMore = () => setPage((prevPage) => prevPage + 1);
  const visibleBtnMore = () => images.length !== 0 && page < totalPages;

  return (
    <>
      <SearchBar handleSearch={onSearch} setError={setError} />
      {error && <ErrorMessage message={message} />}
      <ImageGallery images={images} handleOpenModel={handleOpenModel} />
      {loader && <Loader />}
      {visibleBtnMore() && <LoadMoreBtn onLoadMore={onLoadMore} />}
      {openModal && (
        <ImageModal openCloseModal={openCloseModal} modalImg={modalImg} />
      )}
    </>
  );
}

export default App;
