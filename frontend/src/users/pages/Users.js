import React from "react";
import UsersList from "./../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      image:
        "https://www.wattpic.com/wp-content/uploads/2019/03/29930848436_c03b45fdf8_b.jpg",
      name: "Tom Hanks",
      placeCount: "3",
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
