import React from "react";

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(allDogs / dogsPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((n) => {
            return (
              <li key={n}>
                <button onClick={() => paginated(n)}>{n}</button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
