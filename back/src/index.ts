import {app} from "./app";
import _UserController from "../src/controller/userController";
import _todoController from "../src/controller/todoController";
import authenticateUser from "./middleware/authenticateUser";


const userController = new _UserController();
const todoController = new _todoController();


app.post('/signup', userController.signUp)
app.post('/singin', userController.signIn)
app.post("/user/todo", todoController.createTodo)
app.put("/todo", todoController.updateTodo)
app.get("/", todoController.getTodoByUser)
app.get("/adminTodos", todoController.getTodoByAdmin)
app.use("/todo", authenticateUser);


