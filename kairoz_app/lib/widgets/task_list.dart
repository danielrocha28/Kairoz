import '../models/task.dart';
import 'task_card.dart';
import 'package:kairoz/pages/study_topics_page.dart';
import 'package:flutter/cupertino.dart';

class TaskList extends StatelessWidget {
  final List<Task> tasks;
  final Function(Task task) onDeleteTask;

  const TaskList({
    super.key,
    required this.tasks,
    required this.onDeleteTask,
  });

  @override
  Widget build(BuildContext context) {
    if (tasks.isEmpty) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.only(top: 50, bottom: 40),
          child: Text('Nenhuma tarefa adicionada'),
        ),
      );
    }

    return Column(
      children: tasks.map((task) {
        return TaskCard(
          task: task,
          onTap: () async {
            final deletedTask = await Navigator.push(
              context,
              CupertinoPageRoute(
                builder: (context) => StudyTopicsPage(
                  task: task,
                ),
              ),
            );

            if (deletedTask != null) {
              onDeleteTask(deletedTask);
            }
          },
        );
      }).toList(),
    );
  }
}
