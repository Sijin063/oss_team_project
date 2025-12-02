import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../api";

function CreatePage() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Menu Name을 입력하세요.");
      nameRef.current?.focus();
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("Price는 0보다 큰 값이어야 합니다.");
      priceRef.current?.focus();
      return;
    }

    const newItem = {
        MenuName: name,
        Category: category,
        Price: Number(price),
        Status: status
    };

    
    try {
      await createMenu(newItem);
      alert("메뉴가 추가되었습니다.");
      navigate("/list");
    } catch (e) {
      alert("추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>Add Menu</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Menu Name</label>
          <input
            ref={nameRef} 
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)} // useState
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            ref={priceRef} 
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreatePage;