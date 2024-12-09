import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/pages/agenda_page.dart';
import 'package:kairoz/widgets/task_list.dart';
import 'package:kairoz/widgets/week_display.dart';
import 'package:kairoz/widgets/banner.dart';
import 'package:flutter/cupertino.dart';

class TrabalhoPage extends StatefulWidget {
  final List<Task> tasks;

  TrabalhoPage({super.key, required this.tasks});

  @override
  State<TrabalhoPage> createState() => _TrabalhoPageState();
}

class _TrabalhoPageState extends State<TrabalhoPage> {
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
        const SizedBox(height: 20),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: WeekDisplay(
            activeDate: selectedDate,
            onDateSelected: handleDateSelected,
          ),
        ),
        const SizedBox(height: 20),
        BannerWidget(
          title: 'Compromissos',
          imageUrl: 'assets/feynman.png',
          onTap: () {
            Navigator.push(
              context,
              CupertinoPageRoute(
                builder: (context) => const AgendaPage(),
              ),
            );
          },
        ),
        const SizedBox(height: 20),
        Center(
          child: const Text(
            'Tarefas de trabalho',
            textAlign: TextAlign.start,
            style: TextStyle(
              color: Colors.black,
              fontSize: 24,
              fontWeight: FontWeight.normal,
            ),
          ),
        ),
        const SizedBox(height: 16),
        TaskList(tasks: filteredTasks),
      ],
    );
  }
}
