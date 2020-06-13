import React from "react";
import "../App.css";
import { useAllIssues } from "../hooks/use-all-issues.js";

const AllTechnicalIssues = () => {
  const { isLoading, issues } = useAllIssues();
  console.log("Issues" + issues);
  return (
    <div class="container">
      {!isLoading ? (
        <ul class="list-group">
         {issues.map((it) => (
            <li class="list-group-item">{it}</li>
          ))}
        </ul>
      ) : (
        <div />
      )}
    </div>
  );
};

export default AllTechnicalIssues;
