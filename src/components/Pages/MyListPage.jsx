import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMenus, deleteMenu } from "../api";

function MyListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMenus();
        setItems(data);
      } catch (e) {
        alert("나의 요리 목록을 불러오는 데 실패했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteMenu(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="mb-3">My Favorite Recipes</h1>

      <button
        className="btn btn-success mb-3 me-2"
        onClick={() => navigate("/list")}
      >
        Go to Recipe Search
      </button>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/create")}
      >
        Add New Recipe
      </button>

      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Difficulty</th>
            <th>Cooking Time</th>
            <th>Spicy</th>
            <th>Type</th>
            <th>Ingredient</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.Name}</td>
              <td>{r.Country}</td>
              <td>{r.Difficulty}</td>
              <td>{r.CookingTime}</td>
              <td>{r.SpicyLevel}</td>
              <td>{r.MealorDessert}</td>
              <td>{r.CookingMethod}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => navigate(`/detail?id=${r.id}`)}
                >
                  Detail
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/update?id=${r.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyListPage;
