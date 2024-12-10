import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/pages/detalhes_page.dart';
import 'package:kairoz/pages/study_topics_page.dart';
import 'package:kairoz/widgets/task_list.dart';
import 'package:kairoz/widgets/tecnicas_estudo.dart';
import 'package:kairoz/widgets/week_display.dart';
import 'package:flutter/cupertino.dart';

class EstudosPage extends StatefulWidget {
  final List<Task> tasks;

  EstudosPage({super.key, required this.tasks});

  @override
  State<EstudosPage> createState() => _EstudosPageState();
}

class _EstudosPageState extends State<EstudosPage> {
  DateTime selectedDate = DateTime.now();

  void goToStudyTopicsPage() {
    Navigator.pop(context);
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const StudyTopicsPage(),
      ),
    );
  }

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
        const Text(
          'Minhas Tarefas',
          style: TextStyle(
              color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 24),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: WeekDisplay(
            activeDate: selectedDate,
            onDateSelected: handleDateSelected,
          ),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 0),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(6),
            color: const Color(0xffE4E1F3),
          ),
          child: ListTile(
            onTap: () {
              Navigator.push(
                context,
                CupertinoPageRoute(
                  builder: (context) => const DetalhesPage(
                    titulo: 'Foco nos Estudos',
                    detalhesId: 'foco',
                  ),
                ),
              );
            },
            title: const Text(
              'Foco nos Estudos',
              style: TextStyle(
                color: Color.fromARGB(255, 55, 5, 141),
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            subtitle: const Text(
              'Organize sua rotina de estudos de forma eficiente e alcance seus objetivos',
              style: TextStyle(
                color: Color.fromARGB(255, 82, 22, 185),
                fontSize: 14,
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
            onPressed: goToStudyTopicsPage, child: Text('Tópicos de Estudo')),
        const SizedBox(height: 16),
        TaskList(tasks: filteredTasks),
        const SizedBox(height: 16),
        const TecnicasEstudo(),
      ],
    );
  }
}
