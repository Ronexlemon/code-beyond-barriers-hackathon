import { ourPromiseSource } from "../helpers/promiseSource";

const OurPromise = () => {
  return (
    <main className="md:h-[70vh] lg:h-[80vh] flex items-center">
      <section className="container mx-auto">
        <article className="text-center">
          <h1 className="font-bold text-3xl lg:text-5xl  p-5">
            Our Promise To You
          </h1>
        </article>
        <article className="p-5 md:0 flex gap-4 md:gap-10 justify-evenly md:justify-between flex-wrap">
          {ourPromiseSource.map((data) => (
            <article key={data.id} className="md:w-[45%] flex">
              <div className="w-2/12">
                <img src={data.image} alt="promise" />
              </div>
              <div className="w-10/12">
                <h1 className="font-bold text-3xl pb-2">{data.title}</h1>
                <p className=" text-base py-2">{data.content}</p>
              </div>
            </article>
          ))}
        </article>
      </section>
    </main>
  );
};

export default OurPromise;
