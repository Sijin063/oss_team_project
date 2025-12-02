import React from "react";
import ItemRow from "./ItemRow";

function ItemTable({ items, onEdit, onDelete, onDetail }) {
  return (
    <table className="table table-bordered text-center bg-white shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Menu Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetail={onDetail}   
          />
        ))}
      </tbody>
    </table>
  );
}

export default ItemTable;