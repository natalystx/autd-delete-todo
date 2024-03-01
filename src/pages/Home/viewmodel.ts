import { useEffect, useRef, useState } from "react";
import todos from "../../mock/todos.json";
import Queue from "../../utils/queue";

export type Todo = {
  type: string;
  name: string;
};

type UpdateTodoParams = {
  type: string;
  data: Todo;
  action: "add" | "remove";
};

const queue = new Queue(5000);
let todoInTypeRef: Record<string, Todo[]> = { Fruit: [], Vegetable: [] };
let todoListRef: Todo[] = todos;

export const useViewModel = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todoListRef);
  const todoTypes = useRef(Array.from(new Set(todos.map((todo) => todo.type))));
  const [todosInType, setTodoInType] =
    useState<Record<string, Todo[]>>(todoInTypeRef);

  const updateType = ({ action, data, type }: UpdateTodoParams) => {
    setTodoInType((prev) => {
      const temp = prev;

      if (action === "add") {
        if (!temp[type].map((item) => item.name).includes(data.name)) {
          temp[type].push(data);
        }
      } else {
        temp[type] =
          temp[type]?.filter((item) => item.name !== data.name) || [];
      }
      todoInTypeRef = temp;
      return temp;
    });
  };

  const onRemove = (todo: Todo) => {
    setTodoList((prev) => {
      let temp = [...prev];
      if (prev.map((item) => item.name).includes(todo.name)) {
        return temp;
      }
      temp = [...prev, todo];

      todoListRef = temp;
      return temp;
    });
  };

  useEffect(() => {
    const { unsubscribe } = queue.subscribe<Todo>(({ type, data }) => {
      if (type === "remove") {
        updateType({ action: "remove", data, type: data.type });
        onRemove(data);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveTo = (todo: Todo, action: "add" | "remove") => {
    if (action === "add") {
      updateType({ action: "add", data: todo, type: todo.type });
      setTodoList((prev) => {
        const temp = prev.filter((item) => item.name !== todo.name);
        todoListRef = temp;

        return temp;
      });
      queue.add(todo.name, { type: "remove", data: todo });
    } else {
      queue.pop(todo.name);
    }
  };

  return {
    todoTypes,
    todoList,
    setTodoList,
    todosInType,
    moveTo,
  };
};
