import 'package:flutter/material.dart';
import '../models/task.dart';
import 'task_card.dart';

class TaskList extends StatelessWidget {
  final List<Task> tasks;

  const TaskList({
    super.key,
    required this.tasks,
  });

  @override
  Widget build(BuildContext context) {
    if (tasks.isEmpty) {
      return const Center(
        child: Text('Nenhuma tarefa adicionada'),
      );
    }

    return Column(
      children: tasks.map((task) {
        return TaskCard(task: task);
      }).toList(),
    );
  }
}
