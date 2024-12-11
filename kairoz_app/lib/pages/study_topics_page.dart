import 'package:flutter/material.dart';
import 'package:kairoz/app_colors/app_colors.dart';
import 'package:kairoz/widgets/my_stopwatch.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/services/task_create.service.dart';

class StudyTopicsPage extends StatefulWidget {
  final Task task;

  StudyTopicsPage({
    super.key,
    required this.task,
  });

  @override
  State<StudyTopicsPage> createState() => _StudyTopicsPageState();
}

class _StudyTopicsPageState extends State<StudyTopicsPage> {
  void _deleteTask(Task task) async {
    final service = TaskDeleteService(
      id: task.id ?? 0,
    );
    print('Deletando tarefa com ID: ${task.title}');

    try {
      await service.deleteTask();

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Tarefa deletada com sucesso!'),
          backgroundColor: Colors.green,
        ),
      );

      print(task.id);

      Navigator.pop(context, task);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro ao deletar tarefa!'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kairozWhite,
      appBar: AppBar(
        title: Text(
          'Estudar ${widget.task.title}',
          style: const TextStyle(
            color: Colors.white,
          ),
        ),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 50),
          Text(
            'Temporizador',
            style: TextStyle(
              color: Colors.black,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          MyStopwatch(),
          const SizedBox(height: 30),
          ElevatedButton(
            onPressed: () => _deleteTask(widget.task),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color.fromARGB(255, 82, 22, 185),
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 50),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(32),
              ),
            ),
            child: const Text(
              'Deletar Tarefa',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
