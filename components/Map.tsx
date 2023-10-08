export default function Map() {
  return (
    <iframe
      loading="lazy"
      className="rounded-xl w-full h-full "
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GAPI_KEY}&q=Andover+Central+Club`}
    />
  );
}
