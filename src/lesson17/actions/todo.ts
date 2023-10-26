import { Todo } from "../types";

export const addTodo = (data: Todo) => {
  return {
    type: "ADD",
    payload: data,
  };
};

export const deleteTodo = (data: string | number) => {
  return {
    type: "DELETE",
    payload: { id: data },
  };
};

export const setTodo = (data: string) => {
  return {
    type: "SET",
    payload: data,
  };
};

export const toggleTodo = (data: string | number) => {
  return {
    type: "TOGGLE",
    payload: data,
  };
};

export const editTodo = (data: Todo) => {
  return {
    type: "EDIT",
    payload: data,
  };
};

// export const fetchTotsAction = () => async (dispatch, getState) => {
//   const selectedUser = getState().users.selectedUser;

//   const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')

//   const json = await data.json();
//   // process transformed data

//   dispatch({
//     type: "ADD",
//     payload: json
//   })
// }
