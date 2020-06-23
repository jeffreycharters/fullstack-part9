import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header: React.FC<{ name: string }> = ({ name }) => {
    return <h1>{name}</h1>
  }

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  interface CourseParts {
    courseParts: CoursePart[];
  }

  const Content: React.FC<CourseParts> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map(part => {
          return (
            <p>
              {part.name} {part.exerciseCount}
            </p>
          )
        })}
      </div>
    )
  }

  const Total: React.FC<{ total: number }> = ({ total }) => {
    return <p>
      <strong>Number of exercises{" "}{total}</strong>
    </p>
  }

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courseParts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));