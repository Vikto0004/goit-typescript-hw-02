// import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onLoadMore }) {
  return (
    <button onClick={() => onLoadMore()} type="button">
      Load more
    </button>
  );
}
