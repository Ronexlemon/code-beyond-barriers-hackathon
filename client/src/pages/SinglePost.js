import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import erc20 from "../components/contractJsonFiles/ierc20.json";
import NoImage from "../assets/images/noImage.png";
import { AppContext } from "../contexts/AppContext";

const BigNumber = require("bignumber.js");

const SinglePost = () => {
  const {
    userAccount,
    contract,
    cUSDContract,
    connectWallet,
    kit,
    notification,
    inuasautiContract,
  } = useContext(AppContext);

  const { id } = useParams();
  const [post, setPost] = useState({});
  const [singlePost, setsinglePost] = useState({});
  const [votesapproved, setApprovedVotes] = useState(null);
  const [votesdecline, setdeclineVotes] = useState(null);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const data = await contract.methods
          .getInformationForOneMessage(id)
          .call({ from: kit.defaultAccount });
        setsinglePost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [id]);

  const declineVotes = async (ids) => {
    try {
      const votesdecline = await contract.methods
        .getdeclineVotes(ids)
        .call({ from: kit.defaultAccount });
      setdeclineVotes(votesdecline);
    } catch (error) {
      console.log("votes decline", error);
    }
  };

  const ApprovedVotes = async (ids) => {
    try {
      const votesapproved = await contract.methods
        .getApprovedVotes(ids)
        .call({ from: kit.defaultAccount });
      setApprovedVotes(votesapproved);
    } catch (error) {
      console.log("votes decline", error);
    }
  };

  const confirmInformation = async () => {
    const balance = new BigNumber(2).times(new BigNumber(10).pow(18));
    const cusdContract = new kit.web3.eth.Contract(erc20, cUSDContract);

    await cusdContract.methods
      .approve(inuasautiContract, balance.toString())
      .send({ from: kit.defaultAccount });
    try {
      await contract.methods
        .determineTheTruthOfInformation(0)
        .send({ from: kit.defaultAccount });
    } catch (error) {
      alert("approve infor", error);
    }
  };

  //Todo

  const approveorDeclineInformation = async (decision, id) => {
    try {
      await contract.methods
        .voteForInformationShared(decision, id)
        .send({ from: kit.defaultAccount });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        `https://api-2022.uchaguzi.or.ke/api/v3/posts/${id}`
      );
      setPost(data);
    };
    getPost();
    declineVotes(id);
    ApprovedVotes(id);
  }, [id]);

  return (
    <main className="min-h-screen bg-section py-20">
      <section className="container mx-auto bg-white">
        <section className="flex flex-col-reverse md:flex-row">
          <article className="w-full md:w-5/12 p-2 md:p-5">
            <img
              className="w-full h-[30vh] md:h-[70vh] object-cover "
              src={singlePost._imageUrl ? singlePost._imageUrl : NoImage}
              alt="data"
            />
          </article>
          <article className="w-full md:w-7/12 p-2 md:p-5">
            <h1 className="text-xl md:text-3xl font-bold text-gray-400 text-center md:text-left  md:pb-5">
              {singlePost._title}
            </h1>
            <article className="w-full md:w-8/12 py-3 flex justify-between">
              <div>
                <span
                  style={{
                    color: `${singlePost._status == 1 ? `green` : `red`}`,
                  }}
                  className="text-[14px] font-semibold   rounded-3xl py-1 px-2 w-fit"
                >
                  {singlePost._status == 1 ? "Approved" : "Declined"}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">Date</span>
              </div>
              <div className="font-medium text-gray-500 text-sm">
                via {singlePost._source}
              </div>
            </article>
            <p className=" text-gray-700 py-5 text-center md:text-left text-base md:w-[90%]">
              {singlePost._message}
            </p>
            <hr />
            <article className="py-5">
              <h3 className="font-semibold text-gray-700 text-sm">
                Incident date
              </h3>
              <div>
                <span className="text-sm text-gray-500 font-medium">Date</span>
              </div>
            </article>
            <hr />
            <article className="py-5">
              <h3 className="font-semibold text-gray-700 text-sm">
                Source link
              </h3>
              <div>
                <span className="text-sm text-gray-500 font-medium">
                  {post?.contact?.url}
                </span>
              </div>
            </article>
            <hr />
            <hr />
            <article className="py-5">
              <h3 className="font-semibold text-gray-700 text-sm">
                Location of the incident
              </h3>
              <div>
                <span className="text-sm text-gray-500 font-medium">
                  location
                </span>
              </div>
            </article>
            <hr />
          </article>
        </section>
        <article className="p-2 md:p-5 ">
          <h1 className=" text-gray-500 mb-4 font-bold text-xl">Your vote</h1>
          <div className="flex flex-col md:flex-row bg-section ">
            <div className="w-full md:w-5/12 p-5 ">
              <div className="flex  justify-between">
                <div>
                  {/* to change the id and pass dynamic */}

                  <button
                    onClick={() =>
                      approveorDeclineInformation(true, singlePost._messageId)
                    }
                    className="bg-button text-white font-medium px-5 py-2 w-fit"
                  >
                    Vote for
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      approveorDeclineInformation(false, singlePost._messageId)
                    }
                    className=" bg-red-500 text-white font-medium px-3 py-2 w-fit"
                  >
                    Vote against
                  </button>
                </div>
              </div>
              <div className="flex mt-5 py-5 justify-between">
                <div className="flex flex-col">
                  <h3 className="font-semibold mb-2">Votes For:</h3>
                  <span className="self-center px-10 py-2 bg-white font-medium">
                    {votesapproved}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold mb-2">Votes Against:</h3>
                  <span className="self-center px-10 py-2 bg-white font-medium">
                    {votesdecline}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-7/12 p-5 ">
              <form className="flex flex-col">
                <h3 className=" text-gray-400 mb-4 font-bold">
                  Leave comment(Optional)
                </h3>
                <textarea
                  className="bg-white outline-none p-2"
                  type="text"
                  rows={4}
                ></textarea>
                <div className="mt-3 self-end">
                  <button className="bg-button text-white font-medium px-3 py-2 w-fit">
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SinglePost;
