import toast, { Toaster } from "react-hot-toast";

export default function ErrorMessage({ message }) {
  console.log(message);
  toast.error(message);
  return (
    <div>
      <Toaster position="top-right" />
    </div>
  );
}
