import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Compose = () => {
  const { contract, kit, useAccount, notification, connectWallet } =
    useContext(AppContext);

  const [title, setTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [image, setImageUrl] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");

  const writePost = async (event) => {
    event.preventDefault();

    const params = [image, title, source, postDate, message];
    try {
      await contract.methods
        .getMessagefromUshahidiApi(...params)
        .send({ from: kit.defaultAccount });
      notification("was post successful");
      alert(useAccount);
    } catch (error) {
      notification("the error is", error);
      console.log("post error", error);
      notification("userAccount is", useAccount);
    }
  };
  return (
    <main className="bg-section  min-h-screen">
      <section className="container pt-10 flex items-center justify-center  m-auto">
        <form
          onSubmit={writePost}
          className="relative p-5 rounded-md bg-white w-[50vw] "
        >
          <div className=" box-border flex gap-5 flex-col ">
            <input
              className="w-full p-2 ring-1 ring-gray-300 rounded-sm outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              className="w-full p-2 border-none ring-1 ring-gray-300 rounded-sm outline-none outline-none"
              type="text"
              placeholder="Content"
              name="content"
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
            <input
              className="w-full ring-1 ring-gray-300 rounded-sm outline-none p-2"
              type="text"
              placeholder="Image URL"
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <input
              className="w-full ring-1 ring-gray-300 rounded-sm outline-none p-2"
              type="text"
              placeholder="Source"
              name="source"
              onChange={(event) => setSource(event.target.value)}
            />
            <input
              className="w-full ring-1 ring-gray-300 rounded-sm outline-none p-2"
              type="date"
              placeholder="Date"
              name="postDate"
              onChange={(event) => setPostDate(event.target.value)}
            />
          </div>
          <button className="bg-button mt-5 text-white font-medium px-5 py-2 w-fit">
            Publish
          </button>
        </form>
      </section>
    </main>
  );
};

export default Compose;
