import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Box, Card, CardContent, } from "@mui/material";
import { addTodo, updateTodo, deleteTodo } from '../features/todos/todoSlice'

const Todos = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.todos);
  
  return (
    <Box p={3}>
      <Typography variant="h4">
        Todos ({list.length})
      </Typography>

      <Box mt={2} display="flex" gap={2}>
        <TextField
          fullWidth
          label="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
  variant="contained"
  onClick={() => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updateTodo({ id: editId, text }));
      setEditId(null);
    } else {
      dispatch(addTodo(text));
    }

    setText("");
  }}
>
  {editId ? "Update" : "Add"}
</Button>
      </Box>

      <Box mt={3}>
        {list.map((t) => (
          <Card key={t.id} sx={{ mb: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>{t.text}</Typography>

              <Box>
                <Button onClick={() => {
                  setText(t.text);
                  setEditId(t.id);
                }}>
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() => dispatch(deleteTodo(t.id))}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Todos;