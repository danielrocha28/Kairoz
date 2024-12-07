import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:kairoz/models/task_response.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TaskCreateService {
  final String title;
  final String category;
  final DateTime date;

  const TaskCreateService({
    required this.title,
    required this.category,
    required this.date,
  });

  Future<http.Response> execute() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final mockedMode = dotenv.env['MOCKED_MODE'];
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');

    if (mockedMode == 'true') {
      return http.Response('Usuário Cadastrado', 201);
    }

    try {
      return await http.post(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          "title": title,
          "category": category,
          "dueDate": date.toString(),
        }),
      );
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao criar tarefa. Tente novamente!"}',
        400,
      );
    }
  }
}

class TaskFetchService {
  Future<List<TaskResponse>> fetchTasks() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final mockedMode = dotenv.env['MOCKED_MODE'];
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');

    if (mockedMode == 'true') {
      return [];
    }

    try {
      final response = await http.get(
        Uri.parse('$baseUrl/tasks'),
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        List<dynamic> resp = json.decode(response.body);
        List<TaskResponse> tasks =
            resp.map((json) => TaskResponse.fromJson(json)).toList();

        return tasks;
      } else {
        throw Exception(
          'Falha ao carregar as tarefas. Código: ${response.statusCode}',
        );
      }
    } catch (error) {
      throw Exception('Erro ao buscar tarefas: $error');
    }
  }
}
