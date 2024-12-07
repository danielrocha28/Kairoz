import 'package:flutter/material.dart';
import 'package:kairoz/services/task_create.service.dart';
import 'package:kairoz/widgets/appbar.dart';
import '../models/task.dart';
import '../utils/category_utils.dart';
import '../utils/task_utils.dart';
import '../widgets/task_form_field.dart';

class AddTaskScreen extends StatefulWidget {
  const AddTaskScreen({super.key});

  @override
  State<AddTaskScreen> createState() => _AddTaskScreenState();
}

class _AddTaskScreenState extends State<AddTaskScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;
  TaskCategory _selectedCategory = TaskCategory.study;
  TaskPriority _selectedPriority = TaskPriority.medium;
  TaskRecurrence _selectedRecurrence = TaskRecurrence.none;

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _selectDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );

    if (picked != null) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  String getPriorityValue(TaskPriority value) {
    switch (value) {
      case TaskPriority.low:
        return 'low';
      case TaskPriority.medium:
        return 'medium';
      case TaskPriority.high:
        return 'high';
      default:
        return 'medium';
    }
  }

  String getRecurrenceValue(TaskRecurrence value) {
    switch (value) {
      case TaskRecurrence.none:
        return 'none';
      case TaskRecurrence.daily:
        return 'daily';
      case TaskRecurrence.weekly:
        return 'weekly';
      case TaskRecurrence.monthly:
        return 'monthly';
      default:
        return 'none';
    }
  }

  getFromEnum(TaskCategory value) {
    switch (value) {
      case TaskCategory.study:
        return 'study';
      case TaskCategory.health:
        return 'health';
      case TaskCategory.work:
        return 'work';
      case TaskCategory.leisure:
        return 'leisure';
      default:
        'study';
    }
  }

  DateTime _combineDateAndTime(DateTime date, TimeOfDay time) {
    return DateTime(
      date.year,
      date.month,
      date.day,
      time.hour,
      time.minute,
    );
  }

  void _addTask(Task task) async {
    final service = TaskCreateService(
      title: task.title,
      category: getFromEnum(task.category),
      date: task.dueTime != null
          ? _combineDateAndTime(task.dueDate, task.dueTime!)
          : task.dueDate,
      description: task.description,
      priority: task.priority != null ? getPriorityValue(task.priority!) : null,
      recurrence:
          task.recurrence != null ? getRecurrenceValue(task.recurrence!) : null,
    );

    try {
      await service.execute();

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Tarefa adicionada com sucesso!'),
          backgroundColor: Colors.green,
        ),
      );

      Navigator.pop(context, task);
    } catch (e) {
      print('Erro ao adicionar tarefa: $e');
    }
  }

  Future<void> _selectTime() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );

    if (picked != null) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  void _submitForm() {
    if (_formKey.currentState!.validate() &&
        _selectedDate != null &&
        _selectedTime != null) {
      final task = Task(
        title: _titleController.text,
        description: _descriptionController.text,
        dueDate: _selectedDate!,
        dueTime: _selectedTime,
        category: _selectedCategory,
        priority: _selectedPriority,
        recurrence: _selectedRecurrence,
      );

      _addTask(task);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(
        title: "Kairoz",
        iconTheme: IconThemeData(color: Colors.white),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Adicionar Tarefa',
                textAlign: TextAlign.start,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<TaskCategory>(
                value: _selectedCategory,
                decoration: const InputDecoration(
                  labelText: 'Categoria',
                  border: OutlineInputBorder(),
                ),
                items: TaskCategory.values.map((category) {
                  return DropdownMenuItem(
                    value: category,
                    child: Text(getCategoryName(category)),
                  );
                }).toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _selectedCategory = value;
                    });
                  }
                },
              ),
              const SizedBox(height: 16),
              TaskFormField(
                controller: _titleController,
                label: 'Título',
                validator: (value) {
                  if (value?.isEmpty ?? true) {
                    return 'Por favor, insira um título';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TaskFormField(
                controller: _descriptionController,
                label: 'Descrição',
                maxLines: 3,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _selectDate,
                      icon: const Icon(Icons.calendar_today),
                      label: Text(_selectedDate == null
                          ? 'Selecionar Data'
                          : 'Data: ${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}'),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _selectTime,
                      icon: const Icon(Icons.access_time),
                      label: Text(_selectedTime == null
                          ? 'Selecionar Hora'
                          : 'Hora: ${_selectedTime!.format(context)}'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<TaskPriority>(
                value: _selectedPriority,
                decoration: const InputDecoration(
                  labelText: 'Prioridade',
                  border: OutlineInputBorder(),
                ),
                items: TaskPriority.values.map((priority) {
                  return DropdownMenuItem(
                    value: priority,
                    child: Text(getPriorityName(priority)),
                  );
                }).toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _selectedPriority = value;
                    });
                  }
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<TaskRecurrence>(
                value: _selectedRecurrence,
                decoration: const InputDecoration(
                  labelText: 'Recorrência',
                  border: OutlineInputBorder(),
                ),
                items: TaskRecurrence.values.map((recurrence) {
                  return DropdownMenuItem(
                    value: recurrence,
                    child: Text(getRecurrenceName(recurrence)),
                  );
                }).toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _selectedRecurrence = value;
                    });
                  }
                },
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(255, 82, 22, 185),
                  padding: const EdgeInsets.symmetric(
                    vertical: 24,
                    horizontal: 16,
                  ),
                ),
                onPressed: _submitForm,
                child: const Text(
                  'Salvar',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
