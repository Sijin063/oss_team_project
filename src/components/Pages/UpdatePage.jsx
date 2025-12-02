import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchMenuById, updateMenu } from "../api";

function UpdatePage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState(null);

  const [changeCount, setChangeCount] = useState(0);

  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await fetchMenuById(id);
        setItem(data);
      } catch (e) {
        alert("수정할 메뉴를 불러오는 데 실패했습니다.");
      }
    };
    load();
  }, [id]);

  const handleFieldChange = async (field, value) => {
    if (!item) return;

    if (field === "price" && (value === "" || Number(value) <= 0)) {
      alert("Price는 0보다 큰 값이어야 합니다.");
      priceRef.current?.focus();
      return;
    }

    const updated = { ...item, [field]: field === "price" ? Number(value) : value };


    setItem(updated);
    setChangeCount((prev) => prev + 1); 

    try {
      
      await updateMenu(id, updated);
    } catch (e) {
      alert("수정 저장 중 오류가 발생했습니다.");
      console.error(e);
    }
  };

  if (!id) return <p>잘못된 접근입니다. ID가 없습니다.</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Menu (ID: {id})</h2>

      <p className="text-muted">
        이 페이지가 로드된 이후 <strong>{changeCount}</strong>회 변경되었습니다.
      </p>

      <form className="mt-3">
        <div className="mb-3">
          <label className="form-label">Menu Name</label>
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            value={item.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={item.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            ref={priceRef}
            type="number"
            className="form-control"
            value={item.price}
            onChange={(e) => handleFieldChange("price", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            value={item.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;