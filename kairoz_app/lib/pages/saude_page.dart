import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/pages/detalhes_page.dart';
import 'package:kairoz/widgets/habitos_widget.dart';
import 'package:kairoz/widgets/task_list.dart';

class SaudePage extends StatelessWidget {
  final List<Task> tasks;
  const SaudePage({super.key, required this.tasks});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 10),
      children: [
        const HabitosWidget(
          text:
              'Praticar exercícios físicos regularmente traz inúmeros benefícios para o corpo e a mente...',
          imageUrl: 'assets/estudos.png',
          title: 'Praticar Exercicios',
          destinationPage: DetalhesPage(
            titulo: 'Praticar Exercicios',
            detalhesId: 'saude',
          ),
        ),
        const SizedBox(height: 20),
        TaskList(tasks: tasks),
      ],
    );
  }
}
