import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

  Future<http.Response> getTask() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.get(
        Uri.parse('$baseUrl/tasks'),);
        
    if (response.statusCode == 200) {
      return response.body;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao encontrar a tarefa: ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao encontrar a tarefa, tente novamente!"}',
        400,
      );
    }
  }

class getTaskId {
        final int id;

    const getTaskId({
        required this.id;
    });
    
  Future<http.Response> getTaskById() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.get(
        Uri.parse('$baseUrl/tasks/$id'),);
        
    if (response.statusCode == 200) {
      return response.body;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao encontrar a tarefa: ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao encontrar a tarefa, tente novamente!"}',
        400,
      );
    }
  }
  }
