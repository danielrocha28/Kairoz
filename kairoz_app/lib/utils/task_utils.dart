import '../models/task.dart';
import 'package:flutter/material.dart';

String getPriorityName(TaskPriority priority) {
  switch (priority) {
    case TaskPriority.low:
      return 'Baixa';
    case TaskPriority.medium:
      return 'Média';
    case TaskPriority.high:
      return 'Alta';
  }
}

Color getPriorityColor(TaskPriority priority) {
  switch (priority) {
    case TaskPriority.low:
      return Colors.grey;
    case TaskPriority.medium:
      return Colors.orange;
    case TaskPriority.high:
      return Colors.red;
  }
}

String getRecurrenceName(TaskRecurrence recurrence) {
  switch (recurrence) {
    case TaskRecurrence.none:
      return 'Não se repete';
    case TaskRecurrence.daily:
      return 'Diariamente';
    case TaskRecurrence.weekly:
      return 'Semanalmente';
    case TaskRecurrence.monthly:
      return 'Mensalmente';
    case TaskRecurrence.yearly:
      return 'Anualmente';
  }
}

getType(String value) {
  switch (value) {
    case 'study':
      return TaskCategory.study;
    case 'health':
      return TaskCategory.health;
    case 'work':
      return TaskCategory.work;
    case 'leisure':
      return TaskCategory.leisure;
    default:
      return TaskCategory.study;
  }
}

getRecurrence(String value) {
  switch (value) {
    case 'daily':
      return TaskRecurrence.daily;
    case 'weekly':
      return TaskRecurrence.weekly;
    case 'monthly':
      return TaskRecurrence.monthly;
    case 'yearly':
      return TaskRecurrence.yearly;
    default:
      return TaskRecurrence.none;
  }
}

getPriority(String value) {
  switch (value) {
    case 'low':
      return TaskPriority.low;
    case 'medium':
      return TaskPriority.medium;
    case 'high':
      return TaskPriority.high;
    default:
      return TaskPriority.low;
  }
}
