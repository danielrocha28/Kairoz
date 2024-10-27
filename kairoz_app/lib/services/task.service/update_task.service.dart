import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

  Future<http.Response> updateTask() async {
    final baseUrl = dotenv.env['BASE_URL'];

    class upTaskService {
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
        final Int id;


    const upTaskService({
        required this.title;
        required this.category;
    });

    try {
      return await http.put(
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
          "notes": notes
        }),);
        
    if (response.statusCode == 200) {
      return response.body;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao atualizar a tarefa: ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao atualizar a tarefa, tente novamente!"}',
        400,
      );
    }
  }
  }