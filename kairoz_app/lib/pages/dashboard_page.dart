import 'package:flutter/material.dart';
import '../models/task.dart';
import '../widgets/task_list.dart';
import '../widgets/add_task_modal.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  final List<Task> _tasks = [];

  void _addTask(Task task) {
    setState(() {
      _tasks.add(task);
    });
  }

  void _showAddTaskModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => AddTaskModal(onTaskAdded: _addTask),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Minhas Tarefas'),
      ),
      body: TaskList(tasks: _tasks),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddTaskModal,
        child: const Icon(Icons.add),
      ),
    );
  }
}
