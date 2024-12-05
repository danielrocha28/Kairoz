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

  int get daysRemaining {
    final now = DateTime.now();
    return dueDate.difference(now).inDays;
  }
}
