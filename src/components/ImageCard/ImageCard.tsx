type Props = {
  data: {
    urls: { [key: string]: string }
    alt_description: string;
  }
}

export default function ImageCard({ data: { urls, alt_description } }: Props) {
  return (
    <div>
      <img src={urls.small} alt={alt_description} />
    </div>
  );
}
