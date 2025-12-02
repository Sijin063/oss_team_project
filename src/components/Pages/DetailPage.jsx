import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchMenuById } from "../api";

function DetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await fetchMenuById(id);
        setItem(data);
      } catch (e) {
        alert("상세 정보를 가져오는 데 실패했습니다.");
      }
    };
    load();
  }, [id]);

  if (!id) return <p>잘못된 접근입니다. ID가 없습니다.</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>Menu Detail</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
            <p><strong>Name:</strong> {item.MenuName}</p>
            <p><strong>Category:</strong> {item.Category}</p>
            <p><strong>Price:</strong> ${item.Price}</p>
            <p><strong>Status:</strong> {item.Status}</p>

        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default DetailPage;