import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/pages/detalhes_page.dart';
import 'package:kairoz/widgets/habitos_widget.dart';
import 'package:kairoz/widgets/task_list.dart';
import 'package:kairoz/widgets/week_display.dart';
import 'package:kairoz/widgets/banner.dart';
import 'package:flutter/cupertino.dart';
import 'package:kairoz/pages/sleeping_page.dart';

class SaudePage extends StatefulWidget {
  final List<Task> tasks;

  SaudePage({super.key, required this.tasks});

  @override
  State<SaudePage> createState() => _SaudePageState();
}

class _SaudePageState extends State<SaudePage> {
  DateTime selectedDate = DateTime.now();
  void handleDateSelected(DateTime date) {
    print('selectedDate $selectedDate');

    setState(() {
      selectedDate = date;
    });
  }

  @override
  Widget build(BuildContext context) {
    final filteredTasks = widget.tasks.where((task) {
      return task.dueDate.year == selectedDate.year &&
          task.dueDate.month == selectedDate.month &&
          task.dueDate.day == selectedDate.day;
    }).toList();
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 10),
      children: [
        const SizedBox(height: 24),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: WeekDisplay(
            activeDate: selectedDate,
            onDateSelected: handleDateSelected,
          ),
        ),
        const SizedBox(height: 20),
        BannerWidget(
            imageUrl: 'assets/Sono.jpg',
            onTap: () {
              Navigator.push(
                context,
                CupertinoPageRoute(
                  builder: (context) => const SleepingPage(),
                ),
              );
            },
            title: 'Sono'),
        const SizedBox(height: 20),
        const Text(
          'Minhas Tarefas',
          style: TextStyle(
              color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        TaskList(tasks: filteredTasks),
        const SizedBox(height: 20),
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
      ],
    );
  }
}
