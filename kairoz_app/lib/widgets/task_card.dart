import 'package:flutter/material.dart';
import '../models/task.dart';
import '../utils/date_formatter.dart';

class TaskCard extends StatelessWidget {
  final Task task;

  const TaskCard({
    super.key,
    required this.task,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    task.title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: task.category.color.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    task.category.name,
                    style: TextStyle(
                      color: task.category.color,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              DateFormatter.formatDateAndHour(task.dueDate),
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              (task.description == null || task.description!.isEmpty)
                  ? 'Sem Descrição.'
                  : task.description!,
              style: TextStyle(
                fontSize: 16,
                fontStyle:
                    (task.description == null || task.description!.isEmpty)
                        ? FontStyle.italic
                        : FontStyle.normal,
                color: (task.description == null || task.description!.isEmpty)
                    ? Colors.grey
                    : Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
