import CustomButton from "./form/Button";

type NoDataFoundComponentProps = {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isFromVendor?: boolean;
};

export default function NoDataFoundComponent({ image, title, description, buttonText, onButtonClick, isFromVendor }: NoDataFoundComponentProps) {
  return (
    <div className={`${isFromVendor ? "nodata-center" : ""}`}>
      <div className="no-data-block">
        <figure className="no-data-img">
          <img src={image} alt="" />
        </figure>
        <h2>{title}</h2>
        <p>{description}</p>
        {buttonText && (
          <div className="btn-block" onClick={onButtonClick}>
            <CustomButton type="button" className="btn primary-btn-lg">{buttonText}</CustomButton>
          </div>
        )}
      </div>
    </div>

  )
}
