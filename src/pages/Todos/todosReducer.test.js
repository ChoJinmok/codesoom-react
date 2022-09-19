import todosReducer from './todosReducer';

import {
  updateTodoTitle,
  addTodo,
  deleteTodo,
} from './todosActions';

describe('todostodosReducer', () => {
  describe('updateTodoTitle', () => {
    it('changes todo title', () => {
      const state = todosReducer({
        todoTitle: '',
      }, updateTodoTitle('New Title'));

      expect(state.todoTitle).toBe('New Title');
    });
  });

  describe('addTodo', () => {
    function reduceAddTodo(todoTitle) {
      return (todosReducer({
        todoTitle,
        todos: [],
      }, addTodo()));
    }

    context('with todo title', () => {
      it('appends a new todo into todos', () => {
        const state = reduceAddTodo('New Title');

        expect(state.todos).toHaveLength(1);
        expect(state.todos[0].id).not.toBeUndefined();
        expect(state.todos[0].title).toBe('New Title');
      });

      it('clears todo title', () => {
        const state = reduceAddTodo('New Title');

        expect(state.todoTitle).toBe('');
      });
    });

    context('without todo title', () => {
      it("doesn't work", () => {
        const state = reduceAddTodo('');

        expect(state.todos).toHaveLength(0);
      });
    });
  });

  describe('deleteTodo', () => {
    context('with exist todo ID', () => {
      it('removes the todo from todos', () => {
        const state = todosReducer({
          todos: [
            { id: 1, title: 'Task' },
          ],
        }, deleteTodo(1));

        expect(state.todos).toHaveLength(0);
      });
    });

    context('without exist todo ID', () => {
      it("doesn't work", () => {
        const state = todosReducer({
          todos: [
            { id: 1, title: 'Task' },
          ],
        }, deleteTodo(100));

        expect(state.todos).toHaveLength(1);
      });
    });
  });
});
