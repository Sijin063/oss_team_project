import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { searchMeals, filterByArea, createMenu } from "../api";

function ListPage() {
  const [meals, setMeals] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadMeals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await searchMeals(keyword);
      setMeals(data);
    } catch (e) {
      alert("TheMealDB 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const handleSearch = () => loadMeals();

  const handleFilter = async () => {
    if (!area) return alert("나라를 입력하세요");
    const data = await filterByArea(area);
    setMeals(data);
  };

  // ✅ ADD 버튼 기능
  const handleAdd = async (meal) => {
    const newItem = {
      Name: meal.strMeal,
      Country: meal.strArea || "Unknown",
      Difficulty: "Unknown",
      CookingTime: "Unknown",
      SpicyLevel: "Medium",
      MealorDessert: "Meal",
      CookingMethod: meal.strCategory || "Other"
    };

    try {
      await createMenu(newItem);
      alert("My Recipe List에 저장했습니다!");
      navigate("/mylist");
    } catch (e) {
      alert("저장 실패");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/mylist")}
      >
        Go to My Recipe List
      </button>

      <h1 className="mb-3">Recipe Search</h1>

      {/* 검색 */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search recipe name (ex: pasta)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 나라 필터 */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Filter by country (ex: Korean)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <button className="btn btn-secondary mt-2" onClick={handleFilter}>
          Filter by Country
        </button>
      </div>

      {/* 리스트 */}
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Recipe Name</th>
            <th>Country</th>
            <th>Category</th>
            <th>Action</th> {/* ✅ 변경 */}
          </tr>
        </thead>
        <tbody>
          {meals.map((m) => (
            <tr key={m.idMeal}>
              <td>
                <img src={m.strMealThumb} width="80" alt={m.strMeal} />
              </td>
              <td>{m.strMeal}</td>
              <td>{m.strArea || "-"}</td>
              <td>{m.strCategory || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleAdd(m)}
                >
                  ADD
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;
