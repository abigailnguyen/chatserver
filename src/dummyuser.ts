interface User {
  id: string;
  username: string;
  room: string;
}
const list_of_users: User[] = [];

// Join the new user using a particular Id
function join_User(id: string, username: string, room: string): User {
  const p_user: User = { id, username, room };

  list_of_users.push();
  console.log(list_of_users, "users");
  return p_user;
}

console.log("user out", list_of_users);

// Get the user using a particular Id
function get_Current_User(id: string): User | undefined {
  return list_of_users.find((user) => user.id === id);
}

// When the user leaves the chat room
function user_Disconnect(id: string): User | undefined {
  const index = list_of_users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return list_of_users.splice(index, 1)[0];
  }
}

export { join_User, get_Current_User, user_Disconnect };
