import landingImg from "../assets/images/landingImg.svg";
const MonitorAnalytics = () => {
  return (
    <main className="py-10 md:h-[60vh] flex items-center">
      <section className="container mx-auto flex flex-col md:flex-row items-center">
        <article className="w-full flex items-center flex-col p-5 md:w-6/12 text-center md:text-left md:block">
          <h1 className="font-extrabold text-2xl md:text-4xl lg:text-5xl p-2 md:p-0 md:pb-3">
            Monitor <span className="text-red-400">analytics</span>  in real time with <span className="text-red-400">blockchain</span> 
          </h1>
          <p className="font-medium  md:py-5 md:text-base xl:text-lg">
            Get access to accurate, factual reports from the people at the
            ground using a decentralised autonomous organisation that encourages
            the community to contribute through various initiatives.
          </p>
        </article>
        <article className="w-full p-5 md:w-6/12">
          <img src={landingImg} alt="landing" />
        </article>
      </section>
    </main>
  );
};

export default MonitorAnalytics;
