import { useState } from "react";
import { useReducer } from "react";

function productsReducer(products, action) {
  switch (action.type) {
    case "added": {
      return [
        ...products,
        {
          id: action.id,
          name: "Kemeja",
          price: 120000,
        },
      ];
    }
    case "edited": {
      return products.map((product) => {
        if (product.id === action.id) {
          return {
            ...product,
            price: 35000,
          };
        } else {
          return product;
        }
      });
    }
    case "firstDeleted": {
      return products.slice(1);
    }
    case "lastDeleted": {
      return products.slice(0, -1);
    }
    case "deleted": {
      return products.filter((product) => product.id !== action.id);
    }
  }
}

export default function App() {
  const [products, dispatch] = useReducer(productsReducer, [
    {
      id: 1,
      name: "Kaos",
      price: 40000,
    },
    {
      id: 2,
      name: "Celana",
      price: 150000,
    },
  ]);
  const [id, setId] = useState(products.length + 1);

  return (
    <main>
      <button
        onClick={() => (document.querySelector("html").className = "dark")}
      >
        Ubah tema ke gelap
      </button>
      <button onClick={() => (document.querySelector("html").className = "")}>
        Ubah tema ke terang
      </button>
      <button
        onClick={() => {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.querySelector("html").className = "dark";
          } else {
            document.querySelector("html").className = "";
          }
        }}
      >
        Ubah tema ke sistem
      </button>
      {products.map((product) => (
        <div key={product.id}>
          <h3>
            ({product.id}) {product.name}
          </h3>
          <p>{product.price}</p>
          <button onClick={() => dispatch({ type: "deleted", id: product.id })}>
            Hapus
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          dispatch({ type: "added", id });
          setId(id + 1);
        }}
      >
        Tambah
      </button>
      <input id="edit-id" type="number" />
      <button
        onClick={() =>
          dispatch({
            type: "edited",
            id: parseInt(document.querySelector("#edit-id").value),
          })
        }
      >
        Edit
      </button>
      <button onClick={() => dispatch({ type: "firstDeleted" })}>
        Hapus depan
      </button>
      <button onClick={() => dispatch({ type: "lastDeleted" })}>
        Hapus belakang
      </button>
    </main>
  );
}
