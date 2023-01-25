const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-button text-white">
      <footer className="p-6 ">
        <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <h2 className="font-semibold">Services</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <li>Services</li>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-semibold">Pricing</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <li>Pricing</li>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-semibold">Contact</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <li>Contact</li>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-semibold">Community</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <li>GitHub</li>
              <li>Discord</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 pt-12 text-sm">
          <span className="">© Copyright {year}. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
