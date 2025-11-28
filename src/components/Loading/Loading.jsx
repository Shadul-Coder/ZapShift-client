const Loading = () => {
  return (
    <div className="h-[350px] flex justify-center items-center sm:h-[400px] lg:h-[500px]">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;
