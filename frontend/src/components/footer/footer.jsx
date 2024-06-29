import { Footer } from "flowbite-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <Footer container>
      <div className="w-full text-center bg-gray-800 text-white py-8">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-4 sm:space-y-0">
          <Footer.Brand
            href=""
            src=""
            alt=""
            name="LinkWiz"
            className="text-2xl font-bold"
          />
        </div>
        <Footer.Divider className="my-4" />
        <Footer.Copyright
          href="https://github.com/srijonashraf"
          by="LinkWiz"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
};

export default FooterComponent;
