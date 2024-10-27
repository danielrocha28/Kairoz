import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class TaskService {
  final String title;
  final String description;
  final int parentId;
  final String repeat;
  final String category;
  final String priority;
  final String status;
  final DateTime? dueDate;
  final DateTime? reminder;
  final String notes;


  const TaskService({
    required this.title;
    required this.category;
  });

  Future<http.Response> newTask() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.post(
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
          "notes": notes
        }),
        
    if (response.statusCode == 201) {
      return response.body;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao criar a tarefa: ${response.statusCode}';
    }
      );
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao criar a tarefa, tente novamente!"}',
        400,
      );
    }
  }
}
