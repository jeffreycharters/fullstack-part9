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

  const Content: React.FC<CoursePart> = ({ name, exerciseCount }) => {
    return <p>{name} {exerciseCount}</p>
  }

  const Total: React.FC<{ total: number }> = ({ total }) => {
    return (
      <p>
        Number of exercises{" "}{total}
      </p>
    )
  }

  return (
    <div>
      <Header name={courseName}></Header>
      <Content name={courseParts[0].name} exerciseCount={courseParts[0].exerciseCount} />
      <Content name={courseParts[1].name} exerciseCount={courseParts[1].exerciseCount} />
      <Content name={courseParts[2].name} exerciseCount={courseParts[2].exerciseCount} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));