import Button from "../../components/Button";
import DataColumn from "../../components/DataColumn";
import FetchUserData from "../../components/FetchUserData";
import { useViewModel } from "./viewmodel";

const HomePage = () => {
  const { todoList, todoTypes, todosInType, moveTo } = useViewModel();
  return (
    <div>
      <div className="w-screen min-h-[inherit] h-full overflow-x-hidden flex justify-between p-12">
        <DataColumn className="border-none shadow-none w-[300px]">
          {todoList.map((todo) => (
            <Button
              key={`todo-${todo.name}`}
              onClick={() => moveTo(todo, "add")}
            >
              {todo.name}
            </Button>
          ))}
        </DataColumn>
        {todoTypes.current.map((type) => (
          <DataColumn
            className="w-[300px] h-auto"
            key={`table-${type}`}
            title={type}
          >
            {todosInType?.[type]?.map((item) => (
              <Button
                key={`todoInType-${item.name}`}
                onClick={() => moveTo(item, "remove")}
              >
                {item.name}
              </Button>
            ))}
          </DataColumn>
        ))}
      </div>
      <FetchUserData />
    </div>
  );
};

export default HomePage;
