import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchMenuById, updateMenu } from "../api";

function UpdatePage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState(null);

  const [changeCount, setChangeCount] = useState(0);

  const nameRef = useRef(null);
  const DiffRef = useRef(null);
  const CountRef = useRef(null);
  const SpiceRef = useRef(null);
  const TimeRef = useRef(null);
  const MealRef = useRef(null);
  const MethodRef = useRef(null);


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

    const updated = { ...item, [field]: value };


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
            value={item.Name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Difficulty</label>
          <input
            ref={DiffRef}
            type="text"
            className="form-control"
            value={item.Difficulty}
            onChange={(e) => handleFieldChange("difficulty", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            ref={CountRef} 
            type="text"
            className="form-control"
            value={item.Country}
            onChange={(e) => handleFieldChange("Country", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Spicy Level</label>
          <input
            ref={SpiceRef} 
            type="text"
            className="form-control"
            value={item.SpicyLevel}
            onChange={(e) => handleFieldChange("SpicyLevel", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cooking Time</label>
          <input
            ref={TimeRef} 
            type="text"
            className="form-control"
            value={item.CookingTime}
            onChange={(e) => handleFieldChange("CookingTime", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Meal or Dessert</label>
          <input
            ref={MealRef} 
            type="text"
            className="form-control"
            value={item.MealorDessert}
            onChange={(e) => handleFieldChange("MealorDessert", e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredient</label>
          <input
            ref={MethodRef} 
            type="text"
            className="form-control"
            value={item.CookingMethod}
            onChange={(e) => handleFieldChange("CookingMethod", e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;