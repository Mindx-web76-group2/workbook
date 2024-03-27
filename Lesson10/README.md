db.messages
  .find({})
  .skip(0)
  .limit(100); // 1 - returns messages from 0 to 100

db.messages
  .find({})
  .skip(100)
  .limit(100); // 2 - returns messages from 100 to 200

db.messages
  .find({})
  .skip(200)
  .limit(100); // 3 - returns messages from 200 to 300

cursor, cloudinary
  page=? size=?

  skip? ( page - 1 ) * size

#*Lesson 7*

1. Tạo branch lesson-07 và làm bài tập 
2. Clone lại các API auth của bài trước để xác thực
3. Thêm hash cho password bằng bcrypt
4. Tạo middleware validation cho các api
5. Tạo RESTFull API cho đối tượng Post (Model - Service - Controller - Route)
GET /post -> find (có phân trang dùng skip, limit)
GET /post/:id -> findOne
POST /post -> insertOne
PUT /post/:id (update post with id) -> updateOne
DELETE /post/:id (delete post with id) -> deleteOne



validation 

khóa 2 -> validation frontend (formik + yup cho form) -> 
khóa 3 -> 
. validation db (schema mongoose)
. validation api (yup, joi)