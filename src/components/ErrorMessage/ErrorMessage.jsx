import toast, { Toaster } from "react-hot-toast";

export default function ErrorMessage({ query }) {
  toast.error(`An error occurred while searching for the word "${query}"`);
  return (
    <div>
      <Toaster position="top-center" />
    </div>
  );
}
