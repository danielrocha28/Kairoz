import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/widgets/task_list.dart';

class TrabalhoPage extends StatelessWidget {
  final List<Task> tasks;

  const TrabalhoPage({super.key, required this.tasks});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 10),
      children: [
        const Text(
          'Tarefas do Trabalho',
          textAlign: TextAlign.start,
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        TaskList(tasks: tasks),
      ],
    );
  }
}
