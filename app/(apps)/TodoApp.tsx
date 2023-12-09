import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  useColorScheme,
} from "react-native";
import { useTodoStore } from "../../utils/store";

export default function App() {
  const colorScheme = useColorScheme();
  const [newTodo, setNewTodo] = useState("");
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Todolist App
      </Text>
      <TextInput
        value={newTodo}
        onChangeText={setNewTodo}
        style={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          marginBottom: 20,
          paddingVertical: 5,
          height: 42,
          fontSize: 24,
          color: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textDecorationLine: item.done ? "line-through" : "none",
                color: colorScheme === "dark" ? "#fff" : "#000",
              }}
              onPress={() => toggleTodo(item.id)}
            >
              {item.text}
            </Text>
            <Button title="Remove" onPress={() => removeTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
