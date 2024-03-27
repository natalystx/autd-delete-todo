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

const queue = new Queue<Todo>(5000);
let todoInTypeRef: Record<string, Todo[]> = { Fruit: [], Vegetable: [] };
const todoListRef: Todo[] = todos;

export const useViewModel = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todoListRef);
  const todoTypes = useRef(Array.from(new Set(todos.map((todo) => todo.type))));
  const [todosInType, setTodoInType] =
    useState<Record<string, Todo[]>>(todoInTypeRef);

  const updateType = ({ action, data, type }: UpdateTodoParams) => {
    setTodoInType((prev) => {
      const temp = { ...prev };
      if (action === "add") {
        temp[type] = [...(prev[type] || []), data];
      } else {
        temp[type] = (prev[type] || []).filter(
          (item) => item.name !== data.name
        );
      }
      todoInTypeRef = temp;
      return temp;
    });
  };

  const onRemove = (todo: Todo) => {
    setTodoList((prev) => {
      return [...prev, todo];
    });
  };

  useEffect(() => {
    const { unsubscribe } = queue.subscribe(({ type, data }) => {
      if (type === "remove") {
        updateType({ action: "remove", data, type: data.type });
        onRemove(data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const moveTo = (todo: Todo, action: "add" | "remove") => {
    if (action === "add") {
      queue.add(todo.name, { data: todo });
      updateType({ action: "add", data: todo, type: todo.type });
      setTodoList((prev) => {
        return prev.filter((item) => item.name !== todo.name);
      });
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
