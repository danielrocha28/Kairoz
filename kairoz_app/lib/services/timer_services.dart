import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class TimerService {
  final String baseUrl;

  TimerService({
    required this.baseUrl,
  });

  Future<String> startTimer(String idTask, String title) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/timer/start'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "id_task": idTask,
          "title": title,
        }),
      );

      if (response.statusCode == 201) {
        return response.body;
      } else {
        return 'Erro ao iniciar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Erro ao iniciar o temporizador. Tente novamente! Erro: $error';
    }
  }

  Future<String> resumeTimer() async {
    try {
      final response = await http.put(Uri.parse('$baseUrl/timer/resume'));

      if (response.statusCode == 200) {
        return response.body;
      } else {
        return 'Erro ao retomar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Erro ao retomar o timer. Tente novamente! Erro: $error';
    }
  }

  Future<String> pauseTimer() async {
    try {
      final response = await http.put(Uri.parse('$baseUrl/timer/pause'));

      if (response.statusCode == 200) {
        return response.body;
      } else {
        return 'Erro ao pausar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Erro ao pausar o timer. Tente novamente! Erro: $error';
    }
  }

  Future<String> deleteTimer() async {
    try {
      final response = await http.delete(Uri.parse('$baseUrl/timer/delete'));

      if (response.statusCode == 200) {
        return 'Timer foi deletado com sucesso';
      } else {
        return 'Erro ao deletar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Erro ao deletar o timer. Tente novamente! Erro: $error';
    }
  }
}
