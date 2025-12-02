import React from "react";

function ItemRow({ item, onEdit, onDelete, onDetail }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.MenuName}</td>
      <td>{item.Category}</td>
      <td>${item.Price}</td>
      <td>{item.Status}</td>
      <td>
        <button
          className="btn btn-sm btn-info me-2"
          onClick={() => onDetail(item.id)}
        >
          Detail
        </button>

        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => onEdit(item.id)}
        >
          Edit
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ItemRow;