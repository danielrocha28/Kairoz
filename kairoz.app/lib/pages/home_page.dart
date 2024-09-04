import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<String> tasks = [];

  addTask(String item) {
    setState(() {
      tasks.add(item);
    });
  }

  removeTask(String item) {
    setState(() {
      tasks.remove(item);
    });
  }

  void _showAddPopup(BuildContext context) {
    final TextEditingController _controller = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Adicionar"),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(
              labelText: "Tarefa",
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
                addTask(_controller.text);
                Navigator.of(context).pop();
              },
              child: const Text("Adicionar"),
            ),
          ],
        );
      },
    );
  }

  void _showRemovePopup(BuildContext context) {
    final TextEditingController _controller = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Remover"),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(
              labelText: "Tarefa",
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
                final String taskToRemove = _controller.text;
                removeTask(taskToRemove);
                Navigator.of(context).pop();
              },
              child: const Text("Remover"),
            ),
          ],
        );
      },
    );
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
      backgroundColor: const Color.fromARGB(255, 151, 63, 192),
      foregroundColor: foregroundColor,
      label: label,
      labelStyle: TextStyle(color: Colors.white),
      labelBackgroundColor: const Color.fromARGB(255, 151, 63, 192),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Kaizer',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: tasks
              .map(
                (item) => CheckboxListTile(
                  title: Text(item),
                  value: false,
                  onChanged: (bool? value) {},
                ),
              )
              .toList(),
        ),
      ),
      floatingActionButton: SpeedDial(
        icon: Icons.add,
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
        overlayColor: Colors.black,
        overlayOpacity: 0.5,
        animatedIcon: AnimatedIcons.menu_close,
        children: [
          speedDialButton(
            () => _showRemovePopup(context),
            Icons.remove,
            'Remover',
            Colors.white,
          ),
          speedDialButton(
            () => _showAddPopup(context),
            Icons.add,
            'Adicionar',
            Colors.white,
          ),
        ],
      ),
    );
  }
}
