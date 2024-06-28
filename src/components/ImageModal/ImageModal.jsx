// import css from "./ImageModal.module.css";
import Modal from "react-modal";

export default function ImageModal({ openCloseModal, openModal, modalImg }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  console.log(modalImg);

  return (
    <Modal isOpen={openModal} style={customStyles} contentLabel="Example Modal">
      <h1 onClick={() => openCloseModal()}>Hello</h1>
      <img src={modalImg.urls.small} alt={modalImg.alt_description} />
      <div>
        <p>Likes: {modalImg.likes}</p>
        <p>{modalImg.created_at}</p>
        {/* <p>{modalImg.description && modalImg.description}</p> */}
      </div>
    </Modal>
  );
}
