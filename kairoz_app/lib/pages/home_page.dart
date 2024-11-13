import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:kairoz/models/task_model.dart';
import 'package:kairoz/widgets/drawer.dart';
import 'package:kairoz/widgets/my_appbar.dart';
import 'profile_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<TaskModel> tasks = [];

  void addTask(String description) {
    setState(() {
      tasks.add(TaskModel(description: description));
    });
  }

  void goToHomePage() {
    Navigator.pushNamed(context, '/home');
  }

  void goToProfilePage() {
    Navigator.pop(context);

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ProfilePage(),
      ),
    );
  }

  void signOut() {
    Navigator.pushNamedAndRemoveUntil(
        context, '/login', ModalRoute.withName('/'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(
        title: "Kairoz",
        iconTheme: IconThemeData(color: Colors.white),
      ),
      drawer: MyDrawer(
        foregroundColor: Colors.white,
        onHomeTap: goToHomePage,
        onProfileTap: goToProfilePage,
        onSignOut: signOut,
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
