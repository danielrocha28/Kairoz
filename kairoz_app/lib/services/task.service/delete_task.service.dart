import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class getTaskId {
        final int id;

    const getTaskId({
        required this.id;
    });

Future<http.Response> getTaskById() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      return await http.delete(
        Uri.parse('$baseUrl/tasks/$id'),);
        
    if (response.statusCode == 200) {
      return 'Tarefa deletada com sucesso', 200;
    } else {
        // Em caso de erro, retorna a mensagem de erro com o código de status
        return 'Erro ao deletar a tarefa: ${response.statusCode}';
    }
    
    } catch (_) {
      return http.Response(
        '{"error": "Ocorreu um erro ao deletar a tarefa, tente novamente!"}',
        400,
      );
    }
  }
  }
