import React from "react";
import Button from "../../components/Button";
import DataColumn from "../../components/DataColumn";
import { useViewModel } from "./viewmodel";

const HomePage: React.FC = () => {
  const { todoList, todoTypes, todosInType, moveTo } = useViewModel();

  return (
    <div>
      <div className="w-screen min-h-[inherit] h-full overflow-x-hidden flex justify-between p-12">
        <DataColumn className="border-none shadow-none w-[300px]" id="og-list">
          {todoList.map((todo, index) => (
            <Button
              key={index}
              data-testid={`${todo.name}-og-list`}
              onClick={() => moveTo(todo, "add")}
            >
              {todo.name}
            </Button>
          ))}
        </DataColumn>
        {todoTypes.current.map((type, index) => (
          <DataColumn className="w-[300px] h-auto" key={index} title={type}>
            {todosInType?.[type]?.map((item, index) => (
              <Button
                key={index}
                data-testid={`${item.name}-${type}-list`}
                onClick={() => moveTo(item, "remove")}
              >
                {item.name}
              </Button>
            ))}
          </DataColumn>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
