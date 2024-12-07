import '../models/task.dart';
import 'package:flutter/material.dart';

String getCategoryName(TaskCategory category) {
  switch (category) {
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

Color getCategoryColor(TaskCategory category) {
  switch (category) {
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