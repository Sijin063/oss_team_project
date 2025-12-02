import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../api";

function CreatePage() {

  const [name, setName] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [Country, setCountry] = useState("");
  const [SpicyLevel, setSpicyLevel] = useState("");
  const [CookingTime, setCookingTime] = useState("");
  const [MealorDessert, setMealorDessert] = useState("");
  const [CookingMethod, setCookingMethod] = useState("");

  const nameRef = useRef(null);
  const DiffRef = useRef(null);
  const CountRef = useRef(null);
  const SpiceRef = useRef(null);
  const TimeRef = useRef(null);
  const MealRef = useRef(null);
  const MethodRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Menu Name을 입력하세요.");
      nameRef.current?.focus();
      return;
    }

    if (!Difficulty.trim()) {
      alert("요리 난이도를 입력하세요.");
      DiffRef.current?.focus();
      return;
    }

    if (!Country.trim()) {
      alert("요리 난이도를 입력하세요.");
      CountRef.current?.focus();
      return;
    }

    if (!SpicyLevel.trim()) {
      alert("매운맛 정도를 입력하세요.");
      SpiceRef.current?.focus();
      return;
    }

    if (!CookingTime.trim()) {
      alert("요리 시간을 입력하세요.");
      TimeRef.current?.focus();
      return;
    }

    if (!MealorDessert.trim()) {
      alert("식사 또는 디저트를 입력하세요.");
      MealRef.current?.focus();
      return;
    }

    if (!CookingMethod.trim()) {
      alert("조리 방법을 입력하세요.");
      MethodRef.current?.focus();
      return;
    }

    const newItem = {
        Name: name,
        Difficulty: Difficulty,
        Country: Country,
        SpicyLevel: SpicyLevel,
        CookingTime: CookingTime,
        MealorDessert: MealorDessert,
        CookingMethod: CookingMethod,
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
          <label className="form-label">Difficulty</label>
          <input
            ref={DiffRef} 
            type="text"
            className="form-control"
            value={Difficulty}
            onChange={(e) => setDifficulty(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            ref={CountRef} 
            type="text"
            className="form-control"
            value={Country}
            onChange={(e) => setCountry(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Spicy Level</label>
          <input
            ref={SpiceRef} 
            type="text"
            className="form-control"
            value={SpicyLevel}
            onChange={(e) => setSpicyLevel(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cooking Time</label>
          <input
            ref={TimeRef} 
            type="text"
            className="form-control"
            value={CookingTime}
            onChange={(e) => setCookingTime(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Meal or Dessert</label>
          <input
            ref={MealRef} 
            type="text"
            className="form-control"
            value={MealorDessert}
            onChange={(e) => setMealorDessert(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cooking Method</label>
          <input
            ref={MethodRef} 
            type="text"
            className="form-control"
            value={CookingMethod}
            onChange={(e) => setCookingMethod(e.target.value)} 
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