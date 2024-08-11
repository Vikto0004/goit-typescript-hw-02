import { useEffect, useState } from "react";
import fetchImages from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { DataImage } from "../../types";



function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<DataImage[]>([]);
  const [totalPages, setToralPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [modalImg, setModalImg] = useState<DataImage | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;
    setLoader(true);
    fetchImages(query, page)
      .then(( data ) => {
        
        setImages((prevImages) => [...prevImages, ...data.results]);
        setToralPages(data.total_pages);
        if (!data.results.length) {
          toast.error(`Nothing was found for the word "${query}"`);
        }
      })
      .catch(() => {
        toast.error("Oops, something went wrong, try reloading the page");
      })
      .finally(() => setLoader(false));
  }, [query, page]);

  const onSearch = (query: string) => {
    if (!query) toast.error("Enter the word");
    setQuery(query);
    setImages([]);
    setToralPages(0);
    setPage(1);
  };

  const openCloseModal = () => {
    setOpenModal(!openModal);
    if (openModal) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
  };

  const handleOpenModel = (currentId:string) => {
    const [currentImg] = images.filter(({ id }) => id === currentId);
    
    setModalImg(currentImg);
    openCloseModal();
  };

  const onLoadMore = () => setPage((prevPage) => prevPage + 1);
  const visibleBtnMore = () => images.length !== 0 && page < totalPages;

  return (
    <>
      <SearchBar handleSearch={onSearch} />
      <Toaster position="top-right" />
      {images.length > 0 && <ImageGallery images={images} handleOpenModel={handleOpenModel} />}
      {loader && <Loader />}
      {visibleBtnMore() && <LoadMoreBtn onLoadMore={onLoadMore} />}
      {openModal && (
        <ImageModal openCloseModal={openCloseModal} modalImg={modalImg} />
      )}
    </>
  );
}

export default App;
