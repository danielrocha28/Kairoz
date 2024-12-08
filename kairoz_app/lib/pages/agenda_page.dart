import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/pages/add_task_page.dart';
import 'package:kairoz/services/task_create.service.dart';
import 'package:kairoz/utils/category_utils.dart';
import 'package:kairoz/utils/task_utils.dart';
import 'package:kairoz/widgets/appbar.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class AgendaPage extends StatefulWidget {
  const AgendaPage({super.key});

  @override
  State<AgendaPage> createState() => _AgendaPageState();
}

class _AgendaPageState extends State<AgendaPage> {
  late CalendarController _calendarController;
  List<Appointment> _appointments = [];

  @override
  void initState() {
    super.initState();
    _calendarController = CalendarController();
    _fetchTasks();
  }

  void _fetchTasks() async {
    try {
      final service = TaskFetchService();
      final taskData = await service.fetchTasks();

      final newTasks = taskData
          .map((taskRes) => Task(
                title: taskRes.title ?? '',
                category: getType(taskRes.category ?? ''),
                dueDate: DateTime.parse(taskRes.dueDate ?? ''),
                description: taskRes.description ?? '',
                recurrence: getRecurrence(taskRes.repeat ?? ''),
                priority: getPriority(taskRes.priority ?? ''),
              ))
          .toList();

      final appointments = newTasks
          .map((task) => Appointment(
                startTime: task.dueDate,
                endTime: task.dueDate.add(const Duration(hours: 1)),
                subject: task.title,
                color: getCategoryColor(task.category),
                notes: task.description ?? '',
              ))
          .toList();

      setState(() {
        _appointments = appointments;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro ao buscar tarefas!'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  void _showAddTaskModal() async {
    final task = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddTaskScreen()),
    );

    if (task != null) {
      final appointments = Appointment(
        startTime: task.dueDate,
        endTime: task.dueDate.add(const Duration(hours: 1)),
        subject: task.title,
        color: getCategoryColor(task.category),
        notes: task.description ?? '',
      );

      setState(() {
        _appointments.add(appointments);
      });
    }
  }

  @override
  void dispose() {
    _calendarController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(
        title: "Agenda",
        iconTheme: IconThemeData(color: Colors.white),
      ),
      body: Column(
        children: [
          Expanded(
            child: SfCalendar(
              controller: _calendarController,
              view: CalendarView.month,
              monthViewSettings: const MonthViewSettings(showAgenda: true),
              dataSource: TaskDataSource(_appointments),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddTaskModal,
        child: const Icon(Icons.add),
      ),
    );
  }

  // Método para criar o evento
  Future<String> _createEvent(String eventName, DateTime eventDateTime) {
    return Future.value('Evento Criado: $eventName em $eventDateTime');
  }

  void _showCreateEventDialog(BuildContext context) {
    final TextEditingController eventNameController = TextEditingController();
    DateTime selectedDate = DateTime.now();
    TimeOfDay selectedTime = TimeOfDay.now();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Criar Novo Evento'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: eventNameController,
                decoration: const InputDecoration(
                  labelText: 'Nome do Evento',
                ),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () async {
                  final DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: selectedDate,
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2101),
                  );
                  if (pickedDate != null && pickedDate != selectedDate) {
                    setState(() {
                      selectedDate = pickedDate;
                    });
                  }
                },
                style: _buttonStyle,
                child: const Text('Selecionar Data'),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () async {
                  final TimeOfDay? pickedTime = await showTimePicker(
                    context: context,
                    initialTime: selectedTime,
                  );
                  if (pickedTime != null && pickedTime != selectedTime) {
                    setState(() {
                      selectedTime = pickedTime;
                    });
                  }
                },
                style: _buttonStyle,
                child: const Text('Selecionar Hora'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                final eventName = eventNameController.text;
                final eventDateTime = DateTime(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day,
                  selectedTime.hour,
                  selectedTime.minute,
                );

                setState(() {
                  _appointments.add(Appointment(
                    startTime: eventDateTime,
                    endTime: eventDateTime.add(Duration(hours: 1)),
                    subject: eventName,
                    color: Colors.orange,
                    notes: 'Novo Evento',
                  ));
                });

                Navigator.pop(context);
              },
              child: const Text('Salvar Evento'),
            ),
          ],
        );
      },
    );
  }

  ButtonStyle get _buttonStyle => ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFD1C4E9),
        foregroundColor: const Color.fromARGB(255, 15, 11, 76),
        minimumSize: const Size(double.infinity, 50),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      );
}

class TaskDataSource extends CalendarDataSource {
  TaskDataSource(List<Appointment> appointments) {
    this.appointments = appointments;
  }
}
