function PageLoader({ className }) {
  const allItemStyle = `absolute top-[40%] w-[13px] h-[13px] rounded-full bg-main-blue`;
  return (
    <div className="absolute inset-0 bg-white flex">
      <div
        className={`lds-ellipsis my-auto mx-auto relative w-[80px] ${
          className ? className : "h-[100px]"
        }`}
      >
        <div className={`${allItemStyle} left-[8px]`}></div>
        <div className={`${allItemStyle} left-[8px]`}></div>
        <div className={`${allItemStyle} left-[32px]`}></div>
        <div className={`${allItemStyle} left-[56px]`}></div>
      </div>
    </div>
  );
}

export default PageLoader;
