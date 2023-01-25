import { Link } from "react-router-dom";
import moment from "moment/moment";

import NoImage from "../assets/images/noImage.png";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import erc20 from "../components/contractJsonFiles/ierc20.json";
const BigNumber = require("bignumber.js");

const Post = ({ post }) => {
  const {
    userAccount,
    contract,
    cUSDContract,
    connectWallet,
    kit,
    notification,
    inuasautiContract,
  } = useContext(AppContext);

  const reward = async (id) => {
    const getAmount = await contract.methods
      .getFixedAmount()
      .call({ from: kit.defaultAccount });

    const cusdContract = new kit.web3.eth.Contract(erc20, cUSDContract);

    await cusdContract.methods
      .approve(inuasautiContract, getAmount)
      .send({ from: kit.defaultAccount });

    console.log("get amounts", getAmount);

    try {
      await contract.methods
        .incentiveForTheFirstPersonToConfirm(id)
        .send({ from: kit.defaultAccount });
    } catch (error) {
      console.log("the erros for amount", error);
    }
  };

  return (
    <main className="shadow-xl h-[25h] rounded-md bg-white">
      <section className="flex items-center justify-between p-2">
        <article className="w-8/12 flex justify-between">
          <div>
            <span className="text-sm font-medium">
              {post._status === 1 ? "Approved" : "Declined"}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium">
              {moment(post._postDate).fromNow()}
            </span>
          </div>
          <div className="font-bold text-gray-600 text-sm">
            via {post._source}
          </div>
        </article>
        <article className="w-4/12 flex items-center gap-4 justify-end">
          <Link to={`/posts/${post._messageId}`}>
            <span className="px-3 py-1 w-fit bg-button rounded-md text-green-100 font-medium">
              View
            </span>
          </Link>
          <span
            onClick={() => reward(0)}
            className="px-3 py-1 w-fit cursor-pointer bg-[#213139] rounded-md text-white font-medium"
          >
            Reward
          </span>
        </article>
      </section>
      <section className="flex flex-col md:flex-row p-2">
        <article className="w-full md:w-4/12 flex items-center justify-center">
          <img
            className="w-full md:w-3/4 object-cover "
            src={post._imageUrl ? post._imageUrl : NoImage}
            alt="data"
          />
        </article>
        <article className="w-full md:w-8/12">
          <h1 className="text-2xl font-medium py-2 md:pb-2">{post._title}</h1>
          <p className=" text-gray-700 font-medium text-sm">{post._message}</p>
        </article>
      </section>
    </main>
  );
};

export default Post;
