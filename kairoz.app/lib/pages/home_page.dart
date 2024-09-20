import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:kairoz/models/task_model.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<TaskModel> tasks = [];

  // Adiciona uma nova tarefa à lista
  void addTask(String description) {
    setState(() {
      tasks.add(TaskModel(description: description));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Kairoz',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      ),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: tasks.map((task) {
            return Dismissible(
              key: Key(task.description),
              background: Container(
                color: const Color.fromARGB(255, 76, 37, 143),
                child: const Align(
                  alignment: Alignment.centerRight,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20.0),
                    child: Icon(
                      Icons.delete,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              onDismissed: (direction) {
                removeTask(task);
              },
              child: CheckboxListTile(
                title: Text(task.description),
                value: task.isCompleted,
                onChanged: (bool? value) {
                  toggleTaskCompletion(task);
                },
              ),
            );
          }).toList(),
        ),
      ),
      floatingActionButton: SpeedDial(
        icon: Icons.add,
        backgroundColor: const Color.fromARGB(255, 82, 22, 185),
        foregroundColor: Colors.white,
        overlayColor: Colors.black,
        overlayOpacity: 0.5,
        animatedIcon: AnimatedIcons.menu_close,
        children: [
          speedDialButton(
            () => _showSprintPopup(context),
            Icons.add,
            'Sprint',
            Colors.white,
          ),
          speedDialButton(
            () => _showTaskPopup(context),
            Icons.add,
            'Task',
            Colors.white,
          ),
        ],
      ),
    );
  }

  // Remove uma tarefa da lista
  void removeTask(TaskModel task) {
    setState(() {
      tasks.remove(task);
    });
  }

  SpeedDialChild speedDialButton(
    Function() onTap,
    IconData icon,
    String label,
    Color foregroundColor,
  ) {
    return SpeedDialChild(
      onTap: onTap,
      child: Icon(icon),
      backgroundColor: const Color.fromARGB(255, 76, 37, 143),
      foregroundColor: foregroundColor,
      label: label,
      labelStyle: const TextStyle(color: Colors.white),
      labelBackgroundColor: const Color.fromARGB(255, 76, 37, 143),
    );
  }

  // Alterna o estado de conclusão de uma tarefa
  void toggleTaskCompletion(TaskModel task) {
    setState(() {
      task.isCompleted = !task.isCompleted;
    });
  }

  void _showSprintPopup(BuildContext context) {
    final TextEditingController controller = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Adicionar"),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(
              labelText: "Sprint",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Cancelar"),
            ),
            TextButton(
              onPressed: () {
                addTask(controller.text);
                Navigator.of(context).pop();
              },
              child: const Text("Adicionar"),
            ),
          ],
        );
      },
    );
  }

  void _showTaskPopup(BuildContext context) {
    final TextEditingController controller = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Adicionar"),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(
              labelText: "Task",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Cancelar"),
            ),
            TextButton(
              onPressed: () {
                addTask(controller.text);
                Navigator.of(context).pop();
              },
              child: const Text("Adicionar"),
            ),
          ],
        );
      },
    );
  }
}
