import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/widgets/task_list.dart';
import 'package:kairoz/widgets/week_display.dart';
import 'package:kairoz/widgets/meta_lazer.dart';
import 'package:kairoz/widgets/banner.dart';

class LazerPage extends StatefulWidget {
  final List<Task> tasks;

  LazerPage({super.key, required this.tasks});

  @override
  State<LazerPage> createState() => _LazerPageState();
}

class _LazerPageState extends State<LazerPage> {
  DateTime selectedDate = DateTime.now();
  bool _isPersonalGoalVisible = false;

  void _togglePersonalGoalVisibility() {
    setState(() {
      _isPersonalGoalVisible = !_isPersonalGoalVisible;
    });
  }

  void handleDateSelected(DateTime date) {
    setState(() {
      selectedDate = date;
    });
  }

  void _showPersonalGoalPopup() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 5,
          child: PersonalGoalSetter(),
        );
      },
    );
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
        const SizedBox(height: 24),
        BannerWidget(
          title: 'Hobbies',
          imageUrl: 'assets/lazer1.webp',
          onTap: () {
            _showPersonalGoalPopup();
          },
        ),
        const SizedBox(height: 16),
        const Text(
          'Minhas Tarefas',
          style: TextStyle(
              color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),
        TaskList(tasks: filteredTasks),
      ],
    );
  }
}
