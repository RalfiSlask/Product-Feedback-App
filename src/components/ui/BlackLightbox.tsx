const BlackLightbox: React.FC<{ marginTop?: string }> = ({ marginTop }) => {
  return (
    <div
      className={`fixed w-full h-full bg-black z-20 opacity-50 top-[${marginTop}]`}
    ></div>
  );
};

export default BlackLightbox;
