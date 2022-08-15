import Todo from './Todo';

export default function Todos({ todos, onClickDeleteButton }) {
  return (
    <ol>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onClickDeleteButton={onClickDeleteButton}
        />
      ))}
    </ol>
  );
}
