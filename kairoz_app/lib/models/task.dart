import 'package:flutter/material.dart';

enum TaskCategory { study, health, work, leisure }

enum TaskPriority { low, medium, high }

enum TaskRecurrence { none, daily, weekly, monthly, yearly }

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
  final String? description;
  final TimeOfDay? dueTime;
  final TaskCategory category;
  final TaskPriority? priority;
  final TaskRecurrence? recurrence;

  Task({
    required this.title,
    required this.dueDate,
    required this.category,
    this.description,
    this.dueTime,
    this.priority,
    this.recurrence,
  });

  DateTime getEndOfDay(DateTime date) {
    return DateTime(date.year, date.month, date.day, 23, 59, 59, 999);
  }

  int get daysRemaining {
    final now = getEndOfDay(DateTime.now());
    return getEndOfDay(dueDate).difference(now).inDays;
  }

  Task copyWith({
    String? title,
    String? description,
    DateTime? dueDate,
    TimeOfDay? dueTime,
    TaskCategory? category,
    TaskPriority? priority,
    TaskRecurrence? recurrence,
  }) {
    return Task(
      title: title ?? this.title,
      description: description ?? this.description,
      dueDate: dueDate ?? this.dueDate,
      dueTime: dueTime ?? this.dueTime,
      category: category ?? this.category,
      priority: priority ?? this.priority,
      recurrence: recurrence ?? this.recurrence,
    );
  }
}
