import PublicLayout from "../../layouts/PublicLayout";
import ContactUsComponent from "../../components/contactUs/ContactUsComponent";

const ContactUsPage = () => {
  return (
    <PublicLayout>
      <div className="pt-6 h-auto px-5 md:px-0">
        <ContactUsComponent />
      </div>
    </PublicLayout>
  );
};

export default ContactUsPage;
