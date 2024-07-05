import toast, { Toaster } from "react-hot-toast";

export default function ErrorMessage({ message }) {
  toast.error(message);
  return (
    <div>
      <Toaster position="top-center" />
    </div>
  );
}
