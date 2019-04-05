import React from 'react';

const Header = ({ course }) =>
  <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce( (acc, curr) => (acc + curr.exercises), 0)
  return <p>yhteensä {total} tehtävää</p>
}
  
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <div>
      {parts.map(part => <Part key={part.id} part={part} />)}     
  </div>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course;
