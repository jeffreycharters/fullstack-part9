import React from "react";
import ReactDOM from "react-dom";
import { assert } from 'console';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface BasePlusDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartOne extends BasePlusDescription {
    name: "Fundamentals";
  }

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends BasePlusDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends BasePlusDescription {
    samplingPlan: string;
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

  interface CourseParts {
    courseParts: CoursePart[];
  }

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Eating Booger for Fun",
      exerciseCount: 1,
      samplingPlan: "No plan",
      description: "Going faster orr not"
    }
  ];

  const Header: React.FC<{ name: string }> = ({ name }) => {
    return <h1>{name}</h1>
  }

  const Part: React.FC<{
    name: string, exerciseCount: number, description?: string,
    groupProjectCount?: number, exerciseSubmissionLink?: string, samplingPlan?: string
  }> = ({ name, exerciseCount, description, groupProjectCount, exerciseSubmissionLink, samplingPlan }) => {
    switch (name) {
      case "Fundamentals":
        return (
          <div>
            <div>Name: {name}</div>
            <div>Description: {description}</div>
            <div>Exercise Count:{exerciseCount}</div><br />
          </div>)
      case "Using props to pass data":
        return (
          <div>
            <div>Name: {name}</div>
            <div>Exercise Count:{exerciseCount}</div>
            <div>Group Project Count: {groupProjectCount}</div><br />
          </div>
        )
      case "Deeper type usage":
        return (
          <div>
            <div>Name: {name}</div>
            <div>Exercise Count:{exerciseCount}</div>
            <div>Description: {description}</div>
            <div>Exercise Submission Link: {exerciseSubmissionLink}</div><br />
          </div>
        )
      case "Eating Booger for Fun":
        return (
          <div>
            <div>Name: {name}</div>
            <div>Exercise Count:{exerciseCount}</div>
            <div>Description: {description}</div>
            <div>Sampling plan: {samplingPlan}</div><br />
          </div>
        )
      default:
        return null
    }
  }


  const Content: React.FC<CourseParts> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map(part => {
          return (
            <div key={part.name}>
              <Part {...part} />
            </div>
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

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courseParts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));