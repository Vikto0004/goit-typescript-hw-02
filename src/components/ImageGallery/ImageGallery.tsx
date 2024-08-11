import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";
import { DataImage } from "../../types";

type Ptops = {
  images: DataImage[];
  handleOpenModel: (id:string) => void
}

export default function ImageGallery({ images, handleOpenModel }: Ptops) {
  return (
    <ul className={css.list}>
      {images.map((data: DataImage) => (
        <li onClick={() => handleOpenModel(data.id)} key={data.id}>
          <ImageCard data={data} />
        </li>
      ))}
    </ul>
  );
}
