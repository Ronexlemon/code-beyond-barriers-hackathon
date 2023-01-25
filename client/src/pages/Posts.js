import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";
import Post from "../components/Post";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [info, setInfo] = useState([]);

  const { contract, kit, useAccount, notification, connectWallet } =
    useContext(AppContext);

  //Todo get all information
  const getInformationToApprove = useCallback(async () => {
    try {
      let allinfo = [];

      const infor = await contract?.methods
        .getAllInformation()
        .call({ from: kit.defaultAccount });

      infor?.forEach((element) => {
        allinfo.push(element);
      });
      setInfo(allinfo);
    } catch (error) {
      console.log(error);
    }
  }, [contract]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://inuasauti.api.ushahidi.io/api/v3/posts"
      );
      setPosts(data);
    };
    fetchPosts();

    connectWallet();
    getInformationToApprove();
  }, []);

  return (
    <main className="bg-section min-h-screen pb-10">
      <section className="bg-button text-white md:h-[20vh]">
        <article className="container mx-auto h-full flex flex-col gap-5 p-2 md:flex-row">
          <div className="w-full md:w-8/12 flex justify-center flex-col">
            <h1 className="font-bold text-2xl md:text-4xl md:w-[80%] py-2">
              Reports
            </h1>
            <p className="py-2 md:w-[80%]">
              Get access to accurate, factual reports from the people at the
              ground using a decentralised autonomous organisation that
              encourages the community to contribute through various
              initiatives.
            </p>
          </div>
          <div className="w-full md:w-4/12 flex mt-5 ">
           <Link to={"/compose"}>
           <span className="flex items-center self-center bg-red-400 text-white rounded-3xl font-bold text-md py-2 px-4 w-fit">Add Report</span>
           </Link>
          </div>
        </article>
      </section>
      <section className="container py-5 mx-auto">
        <article className="flex flex-col gap-5 p-2">
          {info?.map((post) => (
            <Post key={post._messageId} post={post} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default Posts;
