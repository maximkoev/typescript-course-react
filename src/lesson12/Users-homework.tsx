import React, { useCallback } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
  data: {
    id: number;
    firstName: string;
    lastName: string;
  };
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  isLiked: boolean;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

const User = (props: IUserProps) => {
  const { data, onDelete, onLike, isLiked, onMoveDown, onMoveUp } = props;
  // TODO: add delete button to each of the user
  // TODO: implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)

  return (
    <li>
      <button onClick={() => onDelete(data.id)}>Delete</button>
      <span>
        {data.firstName} {data.lastName}
      </span>
      <button onClick={() => onLike(data.id)}>Like!</button>
      <button onClick={() => onMoveUp(data.id)}>Up</button>
      <button onClick={() => onMoveDown(data.id)}>Down</button>
      {isLiked && <i>💝</i>}
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);
  const [likedUsers, setLikedUser] = React.useState<number[]>([]);

  const handleDelete = (userId: number) => {
    // TODO: implement function to delete user
    // TODO: create new list of users without deleted user
    // TODO: call setUsers with new list of users
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleLike = (id: number) => {
    const likes: number[] = [];
    const index = likedUsers.indexOf(id);
    if (index === -1) {
      likes.push(id);
      likes.push(...likedUsers);
    } else {
      likes.push(...likedUsers.filter((uid) => uid !== id));
    }
    setLikedUser(likes);
  };

  // TODO: pass handleDelete to User component

  // TODO: Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: Implement functions to move user up/down the list
  // TODO: Make sure you create new list of users, do not mutate existing list
  // TODO: Call setUsers with new list of users
  // TODO: Pass handleMoveUp and handleMoveDown to User component as props
  function handleMoveUp(id: number) {
    const index = users.findIndex((u) => u.id === id);
    setUsers(move(index, index - 1));
  }

  function handleMoveDown(id: number) {
    const index = users.findIndex((u) => u.id === id);
    setUsers(move(index, index + 1));
  }

  function move(fromIndex: number, targetIndex: number): TUser[] {
    const arr = [...users];

    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < arr.length) {
      let endIndex = targetIndex < 0 ? arr.length + targetIndex : targetIndex;
      endIndex = endIndex >= arr.length ? endIndex - arr.length : endIndex;
      const [item] = arr.splice(fromIndex, 1);
      arr.splice(endIndex, 0, item);
      return arr;
    } else throw new Error(`Incorrect start index: ${startIndex}`);
  }

  return (
    <ul>
      {users.map((user) => (
        <User
          data={user}
          key={user.id}
          onDelete={handleDelete}
          onLike={handleLike}
          isLiked={likedUsers.indexOf(user.id) > -1}
          onMoveDown={handleMoveDown}
          onMoveUp={handleMoveUp}
        />
      ))}
    </ul>
  );
}

export default Users;
