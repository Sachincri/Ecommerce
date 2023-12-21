import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProducts } from "../../../Redux/action/admin";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import Sidebar from "../Sidebar";
// import Loader from "../../layout/Loader";
import {
  MdAccountTree,
  MdDescription,
  MdStorage,
  MdAttachMoney,
  MdOutlineClose,
} from "react-icons/md";
import { BsSpellcheck } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiFillHighlight } from "react-icons/ai";
import { getDiscount } from "../../product/ProductDetails";
export const categories = [
  "Mobiles",
  "Fashion",
  "Laptop",
  "Shoes",
  "Electronics",
  "Bags",
  "Toys",
  "Camera",
];
const CreateNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [cuttedPrice, setCuttedPrice] = useState("");
  const [price, setPrice] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offersInput, setOffersInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPrev, setImagesPrev] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [discount, setDiscount] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setDisableBtn();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("cuttedPrice", cuttedPrice);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("discount", discount);
    myForm.append("stock", stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    offers.forEach((off) => {
      myForm.append("offers", off);
    });
    highlights.forEach((h) => {
      myForm.append("highlights", h);
    });
    dispatch(createProducts(myForm));
  };
  const changeImageHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPrev([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPrev((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const addOffers = () => {
    const trimmedOffers = offersInput.trim();
    if (!trimmedOffers) return;
    setOffers((prevOffers) => [...prevOffers, trimmedOffers]);
    setOffersInput("");
  };
  const addHighlight = () => {
    const trimmedInput = highlightInput.trim();
    if (!trimmedInput) return;
    setHighlights((prevHighlights) => [...prevHighlights, trimmedInput]);
    setHighlightInput("");
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };
  const removeOffers = (index) => {
    setOffers(offers.filter((h, i) => i !== index));
  }; 

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/dashbord");
    }
    setImagesPrev([...images]);
  }, [dispatch, error, message, navigate, images]);

  return (
    <>
      <main className="main">
        <Sidebar />
        <div className="product">
          <h1>Create Product</h1>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div>
              <BsSpellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div>
                <MdAttachMoney />
                <input
                  required
                  type="number"
                  value={cuttedPrice}
                  placeholder="Crunt Price"
                  onChange={(e) => setCuttedPrice(e.target.value)}
                />
              </div>
              <div>
                <MdAttachMoney />
                <input
                  required
                  value={price}
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <input
                  required
                  value={discount}
                  type="number"
                  placeholder="Discount"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div>
                <MdAccountTree />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <MdStorage />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>
            </div>

            <div>
              <FaImages />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={changeImageHandler}
                multiple
              />
            </div>

            <div>
              {imagesPrev.map((image, i) => (
                <div key={i}>
                  <span>
                    <MdOutlineClose />
                  </span>
                  <img src={image} alt="Product Preview" />
                </div>
              ))}
            </div>
            <div>
              <AiFillHighlight />
              <input
                value={highlightInput}
                type="text"
                placeholder="Highlight"
                onChange={(e) => setHighlightInput(e.target.value)}
              />
              <button onClick={() => addHighlight()}>Add</button>
            </div>
            <div>
              {highlights.map((h, i) => (
                <div key={i}>
                  <span onClick={() => removeHighlight(i)}>
                    <MdOutlineClose />
                  </span>
                  <p>{h}</p>
                </div>
              ))}
            </div>
            <div>
              <AiFillHighlight />
              <input
                value={offersInput}
                type="text"
                placeholder="Offers"
                onChange={(e) => setOffersInput(e.target.value)}
              />
              <button onClick={() => addOffers()}>Add</button>
            </div>

            <div>
              {offers.map((off, i) => (
                <div key={i}>
                  <span onClick={() => removeOffers(i)}>
                    <MdOutlineClose />
                  </span>
                  <p>{off}</p>
                </div>
              ))}
            </div>
            <div>
              <MdDescription />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <Button disabled={disableBtn} type="submit">
              Create
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateNewProduct;
