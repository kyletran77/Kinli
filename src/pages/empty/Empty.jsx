import error from "assets/Kinli.png";

export default function Empty() {
  return (
    <div className="flex h-[85vh] w-full flex-col items-center justify-center gap-10  md:h-[80vh] lg:h-[90vh] ">
      <img
        src={error}
        alt="error-404"
        className="max-h-[10rem] sm:max-h-[15rem] xl:max-h-[17rem]"
      />
      <div className="flex flex-col items-center gap-2">
        <p to="/" className="text-md sm:text-xl lg:text-2xl xl:text-2xl">
          Nothing to find here. Go add some posts!
        </p>
      </div>
    </div>
  );
}
