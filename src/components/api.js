export const API_URL = "https://690c2aa16ad3beba00f780e7.mockapi.io/mydata/RestaurantMenu";

export async function fetchMenus() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("목록 불러오기 실패");
  return res.json();
}

export async function fetchMenuById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("상세 불러오기 실패");
  return res.json();
}

export async function createMenu(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("생성 실패");
  return res.json();
}

export async function updateMenu(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("수정 실패");
  return res.json();
}

export async function deleteMenu(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("삭제 실패");
  return true;
}