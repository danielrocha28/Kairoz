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