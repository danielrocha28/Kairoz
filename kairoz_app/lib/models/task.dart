import 'package:flutter/material.dart';

enum TaskCategory { study, health, work, leisure }

extension TaskCategoryExtension on TaskCategory {
  String get name {
    switch (this) {
      case TaskCategory.study:
        return 'Estudo';
      case TaskCategory.health:
        return 'Saúde';
      case TaskCategory.work:
        return 'Trabalho';
      case TaskCategory.leisure:
        return 'Lazer';
    }
  }

  Color get color {
    switch (this) {
      case TaskCategory.study:
        return Colors.blue;
      case TaskCategory.health:
        return Colors.green;
      case TaskCategory.work:
        return Colors.orange;
      case TaskCategory.leisure:
        return Colors.purple;
    }
  }
}

class Task {
  final String title;
  final DateTime dueDate;
  final TaskCategory category;

  Task({
    required this.title,
    required this.dueDate,
    required this.category,
  });

  DateTime getEndOfDay(DateTime date) {
    return DateTime(date.year, date.month, date.day, 23, 59, 59, 999);
  }

  int get daysRemaining {
    final now = getEndOfDay(DateTime.now());
    return getEndOfDay(dueDate).difference(now).inDays;
  }
}
