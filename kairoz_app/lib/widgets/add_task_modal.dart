import 'package:flutter/material.dart';
import '../models/task.dart';
import '../utils/date_formatter.dart';

class AddTaskModal extends StatefulWidget {
  final Function(Task) onTaskAdded;

  const AddTaskModal({
    super.key,
    required this.onTaskAdded,
  });

  @override
  State<AddTaskModal> createState() => _AddTaskModalState();
}

class _AddTaskModalState extends State<AddTaskModal> {
  final _titleController = TextEditingController();
  DateTime? _selectedDate;
  TaskCategory _selectedCategory = TaskCategory.study;

  Future<void> _selectDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
      locale: const Locale('pt', 'BR'),
    );

    if (picked != null) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  void _submitTask() {
    if (_titleController.text.isEmpty || _selectedDate == null) {
      return;
    }

    final task = Task(
      title: _titleController.text,
      dueDate: _selectedDate!,
      category: _selectedCategory,
    );

    widget.onTaskAdded(task);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
        left: 16,
        right: 16,
        top: 16,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Nova Tarefa',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _titleController,
            decoration: const InputDecoration(
              labelText: 'Título',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16),
          OutlinedButton(
            onPressed: _selectDate,
            child: Text(
              _selectedDate == null
                  ? 'Selecionar Data'
                  : 'Data: ${DateFormatter.formatDate(_selectedDate!)}',
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
                child: Text(category.name),
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
          ElevatedButton(
            onPressed: _submitTask,
            child: const Text('Salvar'),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _titleController.dispose();
    super.dispose();
  }
}
