import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class TimerStartedService {
  final String idTask; // Alterei para idTask
  final String title;

  const TimerStartedService({
    required this.idTask, // Alterei para idTask
    required this.title,
  });

  Future<String> start() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/timer/start'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "id_task": idTask, // Alterei para idtask
          "title": title,
        }),
      );

      if (response.statusCode == 201) {
        try{
          final getResponse = await http.get(Uri.parse('$baseUrl/timer/start'),)

          if (getResponse.statusCode == 200){
            return response.body;
          } else {
            return 'Erro ao buscar o timer: ${getResponse.statusCode}';
          }
        }
      } else {
        return 'Erro ao iniciar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Ocorreu um erro ao iniciar o temporizador. Tente novamente!';
    }
  }

  Future<String> resume() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.put(
        Uri.parse('$baseUrl/timer/resume'),
      );

      if (response.statusCode == 200) {
        try {
          final getResponse = await http.get(Uri.parse('$baseUrl/timer/resume'),)

          if (getResponse == 200){
            return getResponse.body
          } else {
            return'Erro ao buscar o timer: ${getResponse.statusCode}';
          }
        }
      } else {
        return 'Erro ao retomar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Ocorreu um erro ao retomar o timer. Tente novamente!';
    }
  }

  Future<String> pause() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.put(Uri.parse('$baseUrl/timer/pause'),);
      if (response.statusCode == 200) {
        try {
          final getResponse = await http.get(Uri.parse('$baseUrl/timer/pause'),);

          if (getResponse.statusCode == 200){
            return getResponse.body;
          } else {
              return'Erro ao buscar o timer: ${getResponse.statusCode}';
          }
        }  
      } else {
        return 'Erro ao pausar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Ocorreu um erro ao pausar o timer. Tente novamente!';
    }
  }

  Future<String> delete() async {
    final baseUrl = dotenv.env['BASE_URL'];

    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/timer/delete'),
      );
      if (response.statusCode == 200) {
        return 'Timer foi deletado com sucesso';
      } else {
        return 'Erro ao deletar o timer: ${response.statusCode}';
      }
    } catch (error) {
      return 'Ocorreu um erro ao deletar o timer. Tente novamente!';
    }
  }
}
