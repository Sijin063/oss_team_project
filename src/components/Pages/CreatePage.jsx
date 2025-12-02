import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../api";

function CreatePage() {
  const [keyword, setKeyword] = useState("");
  const [meals, setMeals] = useState([]);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  // ✅ TheMealDB 검색
  const searchMeal = async () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요.");

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
    );
    const data = await res.json();

    if (!data.meals) {
      alert("검색 결과가 없습니다.");
      setMeals([]);
      return;
    }

    setMeals(data.meals);
  };

  // ✅ 선택한 음식 → 자동 입력
  const selectMeal = (meal) => {
    setSelected({
      Name: meal.strMeal,
      Country: meal.strArea,
      CookingMethod: meal.strCategory,
      Difficulty: "Normal",
      CookingTime: "Unknown",
      MealorDessert: "Meal",
      SpicyLevel: "Normal",
    });
  };

  // ✅ 저장 (MockAPI)
  const handleSave = async () => {
    if (!selected) {
      alert("음식을 선택하세요.");
      return;
    }

    try {
      await createMenu(selected);
      alert("내 리스트에 저장되었습니다.");
      navigate("/mylist");
    } catch {
      alert("저장 실패");
    }
  };

  return (
    <div>
      <h2>TheMealDB 레시피 검색</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="예: chicken, pasta"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchMeal}>
          Search
        </button>
      </div>

      {/* ✅ 검색 결과 */}
      <ul className="list-group mb-3">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="list-group-item list-group-item-action"
            onClick={() => selectMeal(meal)}
            style={{ cursor: "pointer" }}
          >
            {meal.strMeal} ({meal.strArea})
          </li>
        ))}
      </ul>

      {/* ✅ 선택된 음식 정보 */}
      {selected && (
        <div className="card p-3">
          <h5>선택한 메뉴</h5>
          <p>🍽 Name: {selected.Name}</p>
          <p>🌍 Country: {selected.Country}</p>
          <p>🍳 Method: {selected.CookingMethod}</p>
          <p>🔥 Spicy: {selected.SpicyLevel}</p>
          <p>⏱ Time: {selected.CookingTime}</p>
          <p>📌 Type: {selected.MealorDessert}</p>

          <button className="btn btn-success" onClick={handleSave}>
            Save to My List
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePage;
