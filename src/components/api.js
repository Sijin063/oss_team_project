// =====================
// mockapi (CRUD 전용)
// =====================
export const API_URL = "https://692d24dde5f67cd80a4a3fea.mockapi.io/Recipies";

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


// =====================
// TheMealDB (검색/조회 전용)
// =====================
export const MEAL_API = "https://www.themealdb.com/api/json/v1/1";

// 요리명 검색
export async function searchMeals(keyword) {
  const res = await fetch(`${MEAL_API}/search.php?s=${keyword}`);
  if (!res.ok) throw new Error("TheMealDB 검색 실패");
  const data = await res.json();
  return data.meals || [];
}

// ID로 상세 조회
export async function fetchMealById(mealId) {
  const res = await fetch(`${MEAL_API}/lookup.php?i=${mealId}`);
  if (!res.ok) throw new Error("TheMealDB 상세조회 실패");
  const data = await res.json();
  return data.meals[0];
}

// 나라별 필터
export async function filterByArea(area) {
  const res = await fetch(`${MEAL_API}/filter.php?a=${area}`);
  if (!res.ok) throw new Error("나라 필터 실패");
  const data = await res.json();
  return data.meals || [];
}

// 재료별 필터
export async function filterByIngredient(ingredient) {
  const res = await fetch(`${MEAL_API}/filter.php?i=${ingredient}`);
  if (!res.ok) throw new Error("재료 필터 실패");
  const data = await res.json();
  return data.meals || [];
}
