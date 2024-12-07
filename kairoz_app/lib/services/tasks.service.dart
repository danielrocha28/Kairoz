import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class TaskService {
  final String title;
  final String description;
  final String parentId;
  final String repeat;
  final String category;
  final String priority;
  final String status;
  final String dueDate;
  final String reminder;
  final String notes;
  final int id;

  const TaskService({
    required this.title,
    required this.description,
    required this.parentId,
    required this.repeat,
    required this.category,
    required this.priority,
    required this.status,
    required this.dueDate,
    required this.reminder,
    required this.notes,
    required this.id,
  });

  Future<http.Response> getTask() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.get(Uri.parse('$baseUrl/tasks'));

      if (response.statusCode == 200) {
        return http.Response(response.body, 200);
      } else {
        return http.Response(
          jsonEncode({
            'error': 'Erro ao encontrar as tarefas: ${response.statusCode}'
          }),
          response.statusCode,
        );
      }
    } catch (_) {
      return http.Response(
        jsonEncode({
          'error': 'Ocorreu um erro ao encontrar as tarefas, tente novamente!'
        }),
        400,
      );
    }
  }

  Future<http.Response> getTaskById(int id) async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.get(Uri.parse('$baseUrl/tasks/$id'));

      if (response.statusCode == 200) {
        return http.Response(response.body, 200);
      } else {
        return http.Response(
          jsonEncode(
              {'error': 'Erro ao encontrar a tarefa: ${response.statusCode}'}),
          response.statusCode,
        );
      }
    } catch (_) {
      return http.Response(
        jsonEncode({
          'error': 'Ocorreu um erro ao encontrar a tarefa, tente novamente!'
        }),
        400,
      );
    }
  }

  Future<http.Response> newTask() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "title": title,
          "description": description,
          "parentId": parentId,
          "repeat": repeat,
          "category": category,
          "priority": priority,
          "status": status,
          "dueDate": dueDate,
          "reminder": reminder,
          "notes": notes,
        }),
      );

      if (response.statusCode == 201) {
        return http.Response(response.body, 201);
      } else {
        return http.Response(
          jsonEncode(
              {'error': 'Erro ao criar a tarefa: ${response.statusCode}'}),
          response.statusCode,
        );
      }
    } catch (_) {
      return http.Response(
        jsonEncode(
            {'error': 'Ocorreu um erro ao criar a tarefa, tente novamente!'}),
        400,
      );
    }
  }

  Future<http.Response> updateTask() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.put(
        Uri.parse('$baseUrl/tasks/$id'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "title": title,
          "description": description,
          "parentId": parentId,
          "repeat": repeat,
          "category": category,
          "priority": priority,
          "status": status,
          "dueDate": dueDate,
          "reminder": reminder,
          "notes": notes,
        }),
      );

      if (response.statusCode == 200) {
        return http.Response(response.body, 200);
      } else {
        return http.Response(
          jsonEncode(
              {'error': 'Erro ao atualizar a tarefa: ${response.statusCode}'}),
          response.statusCode,
        );
      }
    } catch (_) {
      return http.Response(
        jsonEncode({
          'error': 'Ocorreu um erro ao atualizar a tarefa, tente novamente!'
        }),
        400,
      );
    }
  }
}
