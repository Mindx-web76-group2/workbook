import http from "http";

import url from "url";
const users = [
  {
    id: 1,
    name: "Amily",
    email: "amily@gmail.com",
    address: "Ha Noi",
    age: 21,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@gmail.com",
    address: "Phu Quoc",
    age: 33,
  },
  {
    id: 4,
    name: "Danny",
    email: "danny@gmail.com",
    address: "Da Lat",
    age: 59,
  },
  {
    id: 5,
    name: "Elizabeth",
    email: "elizabeth@gmail.com",
    address: "Hue",
    age: 50,
  },
  {
    id: 6,
    name: "Frank",
    email: "frank@gmail.com",
    address: "Kon Tum",
    age: 50,
  },
  {
    id: 7,
    name: "George",
    email: "george@gmail.com",
    address: "HCM",
    age: 70,
  },
  {
    id: 8,
    name: "Hawk",
    email: "hawk@gmail.com",
    address: "Ca Mau",
    age: 90,
  },
  {
    id: 9,
    name: "Insta",
    email: "insta@gmail.com",
    address: "Yen Bai",
    age: 49,
  },
  {
    id: 10,
    name: "John",
    email: "john@gmail.com",
    address: "Joker",
    age: 52,
  },
  {
    id: 11,
    name: "Kelly",
    email: "kelly@gmail.com",
    address: "Quang Tri",
    age: 47,
  },
  {
    id: 12,
    name: "Liam",
    email: "liam@gmail.com",
    address: "Tuyen Quang",
    age: 41,
  },
];

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const method = req.method;

  if (pathname === "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else if (pathname === "/users/old" && method === "GET") {
    const oldUsers = users.filter((user) => user.age >= 50);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(oldUsers));
  } else if (pathname === "/users/add-random" && method === "GET") {
    const newUser = generateRandomUser();
    users.push(newUser);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } else if (pathname === "/users/add" && method === "GET") {
    // Lấy thông tin từ tham số truy vấn
    const { userName, email, address, age } = query;

    // Tạo người dùng mới
    const newUser = {
      id: Math.floor(Math.random() * 10000) + 1, // ID ngẫu nhiên
      name: userName,
      email,
      address,
      age: parseInt(age),
    };

    // Thêm người dùng mới vào danh sách người dùng
    users.push(newUser);

    // Trả về người dùng mới đã được thêm
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } else if (pathname.startsWith("/users/update") && method === "GET") {
    const id = pathname.split('/').slice(-1);
    const existedUser = users.find(u => u.id === parseInt(id));
    if (existedUser) {
    
        for (const paramKey in query) {
            console.log(paramKey, query[paramKey])
            existedUser[paramKey] = query[paramKey];
        }
            // Lấy thông tin từ tham số truy vấn
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateRandomUser() {
  const names = ["Alice", "Bob", "Charlie", "David", "Emily", "Frank"];
  const addresses = [
    "Ha Noi",
    "Da Nang",
    "HCM",
    "Phu Quoc",
    "Yen Bai",
    "Ca Mau",
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
  return {
    id: users.length + 1,
    name: randomName,
    email: `${randomName.toLowerCase()}@example.com`,
    address: randomAddress,
    age: Math.floor(Math.random() * 50) + 20, // Tuổi từ 20 đến 69
  };
}
